// Registers the app's commands with Discord: "Edit image" (right-click a message › Apps › Edit image) and the
// Activity's own launch command, both usable in servers, DMs and group DMs, by servers or people that
// installed the app. The launch command is handled by the Worker (so a picture edited after opening the
// editor from the App Launcher can be posted too).
// Needs DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET in the environment or in ./.env. Run again after changes.
import fs from 'node:fs';

if (fs.existsSync('.env')) {
  for (const line of fs.readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const { DISCORD_CLIENT_ID: app, DISCORD_CLIENT_SECRET: secret } = process.env;
if (!app || !secret) { console.error('Set DISCORD_CLIENT_ID and DISCORD_CLIENT_SECRET (environment or .env).'); process.exit(1); }

// the app signs in as itself (no bot needed) to change its commands
const auth = await fetch('https://discord.com/api/v10/oauth2/token', {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded', authorization: 'Basic ' + Buffer.from(`${app}:${secret}`).toString('base64') },
  body: new URLSearchParams({ grant_type: 'client_credentials', scope: 'applications.commands.update' }),
});
const login = await auth.json();
if (!auth.ok) { console.error('Could not sign in as the app:', login); process.exit(1); }
const url = `https://discord.com/api/v10/applications/${app}/commands`, headers = { authorization: `Bearer ${login.access_token}`, 'content-type': 'application/json' };

// installed by servers (0) or people (1); used in servers (0), DMs with the app (1), DMs and group DMs (2)
const everywhere = { integration_types: [0, 1], contexts: [0, 1, 2] };
const existing = await (await fetch(url, { headers })).json();
if (!Array.isArray(existing)) { console.error('Discord said:', existing); process.exit(1); }
// the Activity's launch command (type 4, made by Discord when Activities are turned on): handled by the Worker (1)
const entry = existing.find(c => c.type === 4);
const commands = [
  { ...(entry ? { id: entry.id, name: entry.name, description: entry.description } : { name: 'launch', description: 'Open the editor' }), type: 4, handler: 1, ...everywhere },
  // type 3: a message command
  { name: 'Edit image', type: 3, ...everywhere },
];
const r = await fetch(url, { method: 'PUT', headers, body: JSON.stringify(commands) });
const out = await r.json();
if (!r.ok) { console.error('Discord said:', JSON.stringify(out, null, 1)); process.exit(1); }
console.log('Registered:', out.map(c => `${c.name} (type ${c.type})`).join(', '));
