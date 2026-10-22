/* Lesson mode: the editor opened by the lessons page (learn.html) in a frame, as raster.html?lesson=…
   It is a world of its own: settings live in memory only (every lesson starts from the same defaults, and
   the child's own settings stay as they were), nothing is autosaved or kept as a version, and the
   newcomer's guide and tips stay away – the lesson does the guiding. */
export const LESSON = typeof location !== 'undefined' && new URLSearchParams(location.search).has('lesson');
