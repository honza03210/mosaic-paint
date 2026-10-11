// Registers the "Edit image" message command (right-click a message › Apps › Edit image).
// Needs DISCORD_CLIENT_ID and DISCORD_BOT_TOKEN in the environment (or in ./.env). Run again after changes.
import fs from 'node:fs';

if (fs.existsSync('.env')) {
  for (const line of fs.readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const m = /^\s*([A-Z_]+)\s*=\s*(.*?)\s*$/.exec(line);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const { DISCORD_CLIENT_ID: app, DISCORD_BOT_TOKEN: token } = process.env;
if (!app || !token) { console.error('Set DISCORD_CLIENT_ID and DISCORD_BOT_TOKEN (environment or .env).'); process.exit(1); }
const url = `https://discord.com/api/v10/applications/${app}/commands`, headers = { authorization: `Bot ${token}`, 'content-type': 'application/json' };

// keep the Activity's own Entry Point command (type 4): overwriting the list without it is refused
const existing = await (await fetch(url, { headers })).json();
if (!Array.isArray(existing)) { console.error('Discord said:', existing); process.exit(1); }
const commands = [
  ...existing.filter(c => c.type === 4),
  // type 3: a message command; installed with the bot in a server (0), used in servers (0)
  { name: 'Edit image', type: 3, integration_types: [0], contexts: [0] },
];
const r = await fetch(url, { method: 'PUT', headers, body: JSON.stringify(commands) });
const out = await r.json();
if (!r.ok) { console.error('Discord said:', out); process.exit(1); }
console.log('Registered:', out.map(c => `${c.name} (type ${c.type})`).join(', '));
