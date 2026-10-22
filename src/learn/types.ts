/* The lessons' shapes: a task (one tool, a starting picture, a few steps) and its steps. */

export interface Box { x: number; y: number; w: number; h: number }

/** The editor in its frame, and a place for a task to remember things between steps. */
export interface Ctx {
  w: Window & typeof globalThis & { RZ: any };
  d: Document;
  RZ: any;
  mem: Record<string, any>;
}

export interface Step {
  /** one short instruction */
  say: string;
  /** the button or setting to use (a selector, or found by a function) … */
  at?: string | ((c: Ctx) => Element | null);
  /** … or the part of the picture to work on (image px) */
  area?: (c: Ctx) => Box;
  /** no target: nothing is dimmed */
  free?: boolean;
  /** done when this is true (checked several times a second) */
  done: (c: Ctx) => boolean;
  /** before the step is shown */
  enter?: (c: Ctx) => void;
  /** used instead when the button isn't there (e.g. zoom buttons on a phone: two fingers) */
  alt?: { say: string; at?: Step['at']; area?: Step['area'] };
}

export interface Task {
  id: string;
  /** the unit it belongs to (1…5) */
  unit: number;
  /** the tool it teaches (its button's data-tool) – the icon on the course page */
  tool: string;
  title: string;
  /** what we are making today */
  story: string;
  /** shown at the end */
  learned: string;
  /** the starting picture and settings */
  setup: (c: Ctx) => void;
  steps: Step[];
}
