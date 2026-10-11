/* The worker: runs one job at a time (see jobs.ts) and reports its progress. The build bundles this file
   into a string inside each app (shared/work.ts starts it from a blob, so it works from file:// too). */
import { jobs, buffersIn, type JobName } from './jobs.ts';

const post = (msg: unknown, transfer: Transferable[] = []) => (self as unknown as Worker).postMessage(msg, transfer);

self.onmessage = async (e: MessageEvent<{ id: number; job: JobName; args: any }>) => {
  const { id, job, args } = e.data;
  let last = 0;
  const progress = (f: number) => {
    const now = Date.now();
    if (now - last > 100) { last = now; post({ id, progress: f }); }
  };
  try {
    const result = await (jobs[job] as (a: unknown, p: typeof progress) => unknown)(args, progress);
    post({ id, result }, buffersIn(result));
  } catch (err) {
    post({ id, error: String((err as Error)?.message || err) });
  }
};
