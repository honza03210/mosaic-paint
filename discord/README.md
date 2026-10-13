# Mosaic Paint for Discord

Edit an image from a Discord chat and post it back – without leaving Discord. Works in servers, DMs and
group DMs, and needs no bot in the server.

**Right-click a message with an image › Apps › Edit image.** The Mosaic Paint raster editor opens inside
Discord (an *Activity*) with that image loaded. Draw on it with any of the tools, then **Post to the
channel**: the app posts the picture in the chat as an answer to your "Edit image" ("Edited by @you ·
original", with a link to the message the image came from) – the way Wordle posts its results.

Opened with the app's launch button (App Launcher) instead, the editor starts empty: open or paste an image
there; it can be posted the same way.

**Vector or raster:** the editor opens as the raster app; **Vector** (the app switch at the top) opens the
same picture in the vector app instead, as the photo layer of a drawing its size – draw lines, shapes and
tile patterns over it, and what is posted is the drawing with the picture under it.

## How it works

```
Discord ──"Edit image"──▶ Worker /interactions ── keeps the image + the command's token ──▶ "launch the Activity"
Activity (editor) ──sign in──▶ /api/token ──▶ /api/pending (the image) … edit … ──▶ /api/post ──▶ answer to the command
```

- `src/worker.ts` (entry) and `src/app.ts`: the Cloudflare Worker. It checks Discord's signatures, keeps
  each user's pending edit (a Durable Object: the image's address and the command's token – the picture
  itself is fetched from Discord when the editor asks), signs users in, and posts the result as a
  follow-up to the user's command.
- Discord lets an app answer a command for **15 minutes**. A picture finished later can't be posted by the
  app any more: the editor says so, and **Copy** + paste in the chat does it instead.
- The editor is the raster app (`raster.html`, served as the start page) and the vector app (`vector.html`),
  both served by the same Worker; inside Discord they load `dist/activity.js` (`src/discord/activity.ts` in
  the main project), which talks to the Discord client. Switching apps keeps Discord's connection details
  in the address (and in the tab, should a page open without them), so the other app connects again.
- GIFs and videos work too: the editor lets the user choose a frame. A Tenor / Giphy "GIF" is a video in the
  message's embed; the Worker takes that. A video also gets a signed address on the Worker (`/api/media`,
  valid 30 minutes, Discord's media only, with byte ranges) for the player, in case the Activity's frame may
  not play it from memory.
- The add-ons' downloads (AI models, the engine, text recognition) come through the Worker as well
  (`/api/fetch`): Discord lets an Activity load only from its own address. The Worker passes on exactly the
  files the app lists (`src/shared/addon-files.ts`, pinned versions) and lets Cloudflare cache them.
- Discord's frame doesn't allow the browser's own questions (`prompt`, `confirm`), so the editor asks in the
  page (New, Save as, renaming, …). On phones the top bar and the panel keep clear of Discord's controls
  (its `--discord-safe-area-inset-*` values).
- Everything runs on Cloudflare's **free plan** (Workers, static assets, SQLite Durable Objects).

## Setting it up

You need a Discord account, a Cloudflare account (free), and Node 20+.

### 1. Create the Discord app

On <https://discord.com/developers/applications> › **New Application**. Then note:

- **General Information:** *Application ID* and *Public Key*
- **OAuth2:** *Client Secret* (Reset Secret); under *Redirects* add `https://127.0.0.1` (Discord wants one
  for the sign-in, it is never visited)
- **Activities › Settings:** turn **Enable Activities** on (choose the platforms: desktop, web, mobile)
- **Installation:** tick **User Install** and **Guild Install**; for both, the scope is
  `applications.commands` only (no `bot`)

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
npm run deploy
```

(each `secret put` asks for the value – paste it there, not into a file you commit.) `npm run deploy`
prints the Worker's address, like `https://mosaic-paint-discord.<you>.workers.dev`.

### 3. Point Discord at the Worker

In the Developer Portal:

- **General Information › Interactions Endpoint URL:** `https://mosaic-paint-discord.<you>.workers.dev/interactions`
  (Discord tests it when you save – it must say it is saved)
- **Activities › URL Mappings:** prefix `/` → target `mosaic-paint-discord.<you>.workers.dev` (without https://)

### 4. Register the commands

Make `discord/.env` (it is ignored by git):

```
DISCORD_CLIENT_ID=your application id
DISCORD_CLIENT_SECRET=your client secret
```

then `npm run register`. It registers "Edit image" and makes the app's launch button go through the Worker,
both usable in servers, DMs and group DMs.

### 5. Install it

**Installation › Install Link** (Discord Provided Link): open it and choose **Add to My Apps** – then you
can use it everywhere, also in servers without the app and in DMs. Or choose **Add to Server** so that
everyone in a server can use it.

Now right-click an image › **Apps › Edit image**.

## Updating

After changing the editor: `npm run build` in the main folder, then `npm run deploy` here. After changing
the commands: `npm run register`.

## Testing

`npm test` in the main project covers it: the Worker against a pretend Discord
(`tests/unit/discord-worker.test.mjs`) and the editor's Activity side with a stand-in for the Discord SDK
(`tests/e2e/activity.spec.js`). `npm run dev` here runs the Worker locally (`wrangler dev`, with the
values in `.dev.vars`); inside Discord it can only be tried once it is deployed (or through a tunnel).

## Limits and notes

- Pictures up to 10 MB can be posted (Discord's upload limit); bigger ones: Image › Resize image first.
- 15 minutes from "Edit image" to posting (see above).
- The free plan allows 100 000 requests a day; one edit takes about five.
