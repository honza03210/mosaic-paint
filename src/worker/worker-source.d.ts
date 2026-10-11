/* The worker's bundled code (src/worker/worker.ts), put into the apps as a string by build.mjs. */
declare module 'worker-source' {
  const source: string;
  export default source;
}
