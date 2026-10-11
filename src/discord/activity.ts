/* The editor as a Discord Activity (dist/activity.js – loaded by the raster or vector app only inside Discord).
   It signs the user in, opens the image they picked in the chat ("Edit image"), and posts the edited
   picture back to the chat, as an answer to the user's command. The backend is the Worker in discord/
   (its API under /api). The app is reached through window.RZ (raster) or window.MZ
   (vector), so this bundle stays small (no second copy of the editor or its texts). */
import { DiscordSDK, RPCCloseCodes } from '@discord/embedded-app-sdk';

/** What the app offers the Activity (raster/main.ts, features/discord-host.ts). */
interface Editor {
  ready: boolean;
  openImage(blob: Blob, name: string): Promise<void>;
  png(): Promise<Blob>;
  toast(msg: string): void;
  t(s: string, vars?: Record<string, string | number>): string;
}
/** The parts of the SDK used here (tests put a stand-in at window.__discordSdk). */
type Sdk = Pick<DiscordSDK, 'ready' | 'commands' | 'channelId' | 'close'>;

// inside Discord every request goes through its proxy: /.proxy/… is this Activity's own address
const API = (location.hostname.endsWith('discordsays.com') ? '/.proxy' : '') + '/api';

async function call(path: string, init: RequestInit = {}): Promise<Response> {
  return fetch(API + path, init);
}

/**
 * The app switch inside Discord: the Worker serves the raster editor as the start page (index.html) and the
 * vector app as vector.html; Discord's connection details (in the address) go along, so the other app
 * connects again.
 */
function appSwitch(): void {
  for (const a of document.querySelectorAll<HTMLAnchorElement>('.app-switch a')) {
    a.href = (a.getAttribute('href') === 'raster.html' ? 'index.html' : 'vector.html') + location.search;
  }
}

async function start(app: Editor): Promise<void> {
  const t = app.t;
  appSwitch();
  const { clientId } = await (await call('/config')).json() as { clientId: string };
  const sdk: Sdk = (window as any).__discordSdk || new DiscordSDK(clientId);
  await sdk.ready();
  // sign in: Discord gives a one-time code, the Worker turns it into a token (it knows the app's secret)
  const { code } = await sdk.commands.authorize({ client_id: clientId, response_type: 'code', state: '', prompt: 'none', scope: ['identify'] });
  const signedIn = await call('/token', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ code }) });
  if (!signedIn.ok) {
    // Discord's reason, as it said it (e.g. invalid_client), to help setting the app up
    const { reason } = await signedIn.json().catch(() => ({})) as { reason?: string };
    app.toast(t('Could not sign in to Discord.') + (reason ? ` (${reason})` : ''));
    return;
  }
  const { access_token } = await signedIn.json() as { access_token: string };
  await sdk.commands.authenticate({ access_token });
  const auth = { authorization: `Bearer ${access_token}` };

  // in Discord: a button to post the picture; things that don't fit inside Discord are hidden (style.css)
  document.body.classList.add('in-discord');
  const post = document.createElement('button');
  post.id = 'btn-post-discord';
  post.className = 'primary';
  post.textContent = t('Post to the channel');
  post.title = t('Post the picture in this channel, as a reply to the message it came from');
  document.querySelector('#btn-new').before(post);

  // the image picked in the chat, if any
  const r = await call(`/pending?channel=${encodeURIComponent(sdk.channelId || '')}`, { headers: auth });
  if (r.status === 200) await app.openImage(await r.blob(), decodeURIComponent(r.headers.get('x-filename') || 'image.png'));
  else if (r.status === 410) app.toast(t('That image is no longer available in Discord.'));
  else app.toast(t('Right-click an image in the chat › Apps › Edit image to edit it here – or open or paste one.'));

  post.onclick = async () => {
    post.disabled = true;
    try {
      const sent = await call(`/post?channel=${encodeURIComponent(sdk.channelId || '')}`, {
        method: 'POST', headers: { ...auth, 'content-type': 'image/png' }, body: await app.png(),
      });
      if (sent.ok) {
        app.toast(t('Posted to the channel.'));
        setTimeout(() => sdk.close(RPCCloseCodes.CLOSE_NORMAL, 'posted'), 1200);
        return;
      }
      // the picture is posted as an answer to the user's command, which Discord allows for 15 minutes
      app.toast(sent.status === 413 ? t('The picture is too big for Discord – make it smaller (Image › Resize image).')
        : sent.status === 403 ? t('Open the editor with “Edit image” (or the app’s launch button) in this chat to post here – or use Copy and paste the picture.')
        : sent.status === 409 ? t('More than 15 minutes have passed, and Discord no longer lets the app post. Use Copy and paste the picture into the chat.')
        : t('Discord did not take the picture. Use Copy and paste it into the chat.'));
    } catch {
      app.toast(t('Could not reach the server.'));
    }
    post.disabled = false;
  };
}

// the editor finishes starting up first (it restores the last image)
const editor = ((window as any).RZ || (window as any).MZ) as Editor;
const t = (s: string) => editor.t(s);
const wait = () => (editor?.ready ? start(editor).catch(() => editor.toast(t('Could not connect to Discord.'))) : setTimeout(wait, 50));
wait();
