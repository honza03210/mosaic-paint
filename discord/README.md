# Mosaic Paint for Discord

Edit an image from a Discord chat and post it back – without leaving Discord.

**Right-click a message with an image › Apps › Edit image.** The Mosaic Paint raster editor opens inside
Discord (an *Activity*) with that image loaded. Draw on it with any of the tools, then **Post to the
channel**: the bot posts the picture as a reply to the original message ("Edited by @you").

Opened from Discord's App Launcher instead, the editor starts empty: open or paste an image there.

## How it works

```
Discord ──"Edit image"──▶ Worker /interactions ── notes the image (Durable Object) ──▶ "launch the Activity"
Activity (editor) ──sign in──▶ /api/token ──▶ /api/pending (the image) … edit … ──▶ /api/post ──▶ bot posts it
```

- `src/worker.ts` (entry) and `src/app.ts`: the Cloudflare Worker. It checks Discord's signatures, keeps
  each user's pending edit for 15 minutes (only the image's address – the picture itself is fetched from
  Discord when the editor asks), signs users in, and posts the result after checking with Discord that the
  user really is in that channel's Activity.
- The editor is the raster app (`raster.html`), served by the same Worker; inside Discord it loads
  `dist/activity.js` (`src/discord/activity.ts` in the main project), which talks to the Discord client.
- Everything runs on Cloudflare's **free plan** (Workers, static assets, SQLite Durable Objects).

## Setting it up

You need a Discord account with a server where you can add apps, a Cloudflare account (free), and Node 20+.

### 1. Create the Discord app

On <https://discord.com/developers/applications> › **New Application**. Then note:

- **General Information:** *Application ID* and *Public Key*
- **OAuth2:** *Client Secret* (Reset Secret); under *Redirects* add `https://127.0.0.1` (Discord wants one
  for the sign-in, it is never visited)
- **Bot:** *Token* (Reset Token)
- **Activities › Settings:** turn **Enable Activities** on (choose the platforms: desktop, web, mobile)

### 2. Put the Worker on Cloudflare

From the main project folder:

```bash
npm install
npm run build
cd discord
npm install
npx wrangler login
npx wrangler secret put DISCORD_PUBLIC_KEY
npx wrangler secret put DISCORD_CLIENT_ID
npx wrangler secret put DISCORD_CLIENT_SECRET
npx wrangler secret put DISCORD_BOT_TOKEN
npm run deploy
```

(each `secret put` asks for the value – paste it there, not into a file you commit.) `npm run deploy`
prints the Worker's address, like `https://mosaic-paint-discord.<you>.workers.dev`.

### 3. Point Discord at the Worker

In the Developer Portal:

- **General Information › Interactions Endpoint URL:** `https://mosaic-paint-discord.<you>.workers.dev/interactions`
  (Discord tests it when you save – it must say it is saved)
- **Activities › URL Mappings:** prefix `/` → target `mosaic-paint-discord.<you>.workers.dev` (without https://)

### 4. Register the "Edit image" command

Make `discord/.env` (it is ignored by git):

```
DISCORD_CLIENT_ID=your application id
DISCORD_BOT_TOKEN=your bot token
```

then `npm run register`.

### 5. Add the bot to your server

**OAuth2 › URL Generator:** scopes `bot` and `applications.commands`; bot permissions *View Channels*,
*Send Messages*, *Attach Files* and *Read Message History* (to reply to the picked message). Open the
generated link and pick your server.

Now right-click an image in that server › **Apps › Edit image**.

## Updating

After changing the editor: `npm run build` in the main folder, then `npm run deploy` here.

## Testing

`npm test` in the main project covers it: the Worker against a pretend Discord
(`tests/unit/discord-worker.test.mjs`) and the editor's Activity side with a stand-in for the Discord SDK
(`tests/e2e/activity.spec.js`). `npm run dev` here runs the Worker locally (`wrangler dev`, with the
values in `.dev.vars`); inside Discord it can only be tried once it is deployed (or through a tunnel).

## Limits and notes

- Pictures up to 10 MB can be posted (Discord's limit in servers without boosts); bigger ones: Image ›
  Resize image first.
- The bot must be in the server and allowed to post in the channel. In DMs there is no channel to post
  to – use Copy and paste the picture instead.
- The free plan allows 100 000 requests a day; one edit takes about five.
