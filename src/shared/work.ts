/* Heavy work off the page: jobs (worker/jobs.ts) run in a worker, so the page keeps responding and can show
   their progress. The worker's code is built into the app as a string and started from a blob URL – that
   also works when the app is opened from a file. Without workers (or if one can't start) the same job runs
   on the page instead. Each job runs in a lane; a new job in a lane cancels the one still running there. */
import WORKER_SOURCE from 'worker-source';
import { jobs, type JobName, type JobArgs, type JobResult } from '../worker/jobs.ts';

export class Cancelled extends Error {
  constructor() { super('cancelled'); }
}
export const isCancelled = (e: unknown): boolean => e instanceof Cancelled;

interface Lane {
  worker: Worker | null;
  /** the job running in it */
  id: number;
  resolve: (v: any) => void;
  reject: (e: unknown) => void;
  progress?: (f: number) => void;
  /** to run it here if the worker dies */
  job: JobName;
  args: unknown;
}
const lanes = new Map<string, Lane>();
let url = '', noWorkers = false, seq = 0;

function spawn(): Worker | null {
  if (noWorkers || typeof Worker === 'undefined') return null;
  try {
    url ||= URL.createObjectURL(new Blob([WORKER_SOURCE], { type: 'text/javascript' }));
    return new Worker(url);
  } catch {
    noWorkers = true;
    return null;
  }
}
async function runHere<N extends JobName>(job: N, args: JobArgs<N>, progress?: (f: number) => void): Promise<JobResult<N>> {
  // let the page show that work started before it gets busy
  await new Promise(r => setTimeout(r, 0));
  return (jobs[job] as (a: unknown, p: (f: number) => void) => any)(args, progress || (() => {}));
}

/**
 * Runs a job and resolves with its result. lane: jobs in the same lane replace each other (the older one
 * rejects with Cancelled); by default the job's name. progress: 0…1 now and then.
 */
export function run<N extends JobName>(job: N, args: JobArgs<N>, o: { lane?: string; progress?: (f: number) => void } = {}): Promise<JobResult<N>> {
  const name = o.lane || job, old = lanes.get(name);
  if (old) {
    // stop the old job: its worker is busy with it
    old.worker?.terminate();
    old.reject(new Cancelled());
    lanes.delete(name);
  }
  const worker = spawn();
  if (!worker) return runHere(job, args, o.progress);
  return new Promise((resolve, reject) => {
    const lane: Lane = { worker, id: ++seq, resolve, reject, progress: o.progress, job, args };
    lanes.set(name, lane);
    const finish = () => { worker.terminate(); if (lanes.get(name) === lane) lanes.delete(name); };
    worker.onmessage = (e: MessageEvent<{ id: number; progress?: number; result?: unknown; error?: string }>) => {
      const m = e.data;
      if (m.id !== lane.id) return;
      if (m.progress != null) { lane.progress?.(m.progress); return; }
      finish();
      if (m.error != null) reject(new Error(m.error)); else resolve(m.result as JobResult<N>);
    };
    // the worker could not start (or broke): from now on, work here
    worker.onerror = (e) => {
      e.preventDefault?.();
      finish();
      noWorkers = true;
      runHere(job, args, o.progress).then(resolve, reject);
    };
    worker.postMessage({ id: lane.id, job, args });
  });
}
