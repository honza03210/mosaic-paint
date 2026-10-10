/* Mosaic Paint – IndexedDB storage for the autosave and the version history. */
'use strict';

const Store = (() => {
  let dbp = null;
  function open() {
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
  async function run(name, mode, fn) {
    const d = await open();
    return new Promise((resolve, reject) => {
      const t = d.transaction(name, mode), req = fn(t.objectStore(name));
      t.oncomplete = () => resolve(req ? req.result : undefined);
      t.onerror = t.onabort = () => reject(t.error);
    });
  }
  return {
    get: (k) => run('kv', 'readonly', s => s.get(k)),
    set: (k, v) => run('kv', 'readwrite', s => s.put(v, k)),
    addVersion: (v) => run('versions', 'readwrite', s => s.add(v)),
    async listVersions() {
      return (await run('versions', 'readonly', s => s.getAll())).sort((a, b) => b.time - a.time);
    },
    deleteVersion: (id) => run('versions', 'readwrite', s => s.delete(id)),
    async trimVersions(max) {
      const all = await this.listVersions();
      for (const v of all.slice(max)) await this.deleteVersion(v.id);
    },
  };
})();
