/* The Worker's entry point. Cloudflare treats every export of this file as an entry point, so it exports
   only the Worker and its Durable Object; everything else is in app.ts. */
import app, { PendingEdits } from './app.ts';

export default app;
export { PendingEdits };
