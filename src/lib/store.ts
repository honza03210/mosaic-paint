/* IndexedDB storage for the autosave, the version history and the motif library. */

/**
 * A saved version: the vector app keeps SVG text, the raster app PNG bytes (app: 'raster'). size: its size
 * (w × h in unit); colors: how many it uses; title: a name the user gave it; pinned: kept when old versions
 * are cleared.
 */
export interface Version {
  id?: number; app?: string; time: number; name: string; note: string; svg?: string; png?: ArrayBuffer; tiles: number;
  size?: { w: number; h: number; unit: string }; colors?: number; title?: string; pinned?: boolean;
}
const appOf = (v: Version) => v.app || 'vector';

let dbp: Promise<IDBDatabase> | null = null;
function open(): Promise<IDBDatabase> {
  if (!dbp) {
    dbp = new Promise((resolve, reject) => {
      if (!window.indexedDB) { reject(new Error('IndexedDB is not available')); return; }
      const r = indexedDB.open('mosaic-paint', 1);
      r.onupgradeneeded = () => {
        const d = r.result;
        if (!d.objectStoreNames.contains('kv')) d.createObjectStore('kv');
        if (!d.objectStoreNames.contains('versions')) d.createObjectStore('versions', { keyPath: 'id', autoIncrement: true });
      };
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => reject(r.error);
    });
    dbp.catch(() => { dbp = null; });
  }
  return dbp;
}
async function run<T>(name: string, mode: IDBTransactionMode, fn: (s: IDBObjectStore) => IDBRequest | void): Promise<T> {
  const d = await open();
  return new Promise((resolve, reject) => {
    // relaxed: done once the browser has the data, without waiting for the disk (that can take seconds)
    const t = d.transaction(name, mode, { durability: 'relaxed' }), req = fn(t.objectStore(name));
    t.oncomplete = () => resolve(req ? req.result : undefined);
    t.onerror = t.onabort = () => reject(t.error);
  });
}

/** In a lesson nothing is read or kept (the child's own pictures and versions stay as they are). */
const LESSON = typeof location !== 'undefined' && new URLSearchParams(location.search).has('lesson');

export const Store = {
  get: <T = any>(k: string) => (LESSON ? Promise.resolve(undefined as T) : run<T>('kv', 'readonly', s => s.get(k))),
  set: (k: string, v: unknown) => (LESSON ? Promise.resolve(undefined) : run('kv', 'readwrite', s => s.put(v, k))),
  addVersion: (v: Version) => (LESSON ? Promise.resolve(undefined) : run('versions', 'readwrite', s => s.add(v))),
  /** The versions of one app, newest first. */
  async listVersions(app = 'vector'): Promise<Version[]> {
    if (LESSON) return [];
    return (await run<Version[]>('versions', 'readonly', s => s.getAll())).filter(v => appOf(v) === app).sort((a, b) => b.time - a.time);
  },
  deleteVersion: (id: number) => run('versions', 'readwrite', s => s.delete(id)),
  /** Saves changes to a version (its title, pinned). */
  updateVersion: (v: Version) => run('versions', 'readwrite', s => s.put(v)),
  /** Keeps the newest max versions of an app – pinned ones are kept besides. */
  async trimVersions(max: number, app = 'vector'): Promise<void> {
    const all = (await Store.listVersions(app)).filter(v => !v.pinned);
    for (const v of all.slice(max)) await Store.deleteVersion(v.id);
  },
};
