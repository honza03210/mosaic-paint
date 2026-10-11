/* Mosaic Paint – entry point. The editor core starts when core/api.ts is evaluated; the feature
   modules are imported after it, in the order they build on each other. */
import { MZ } from './core/api.ts';
import * as Geo from './lib/geometry.ts';
import * as Colors from './lib/colors.ts';
import { Store } from './lib/store.ts';
import { PhotoTools } from './features/photo-tools.ts';
import './features/report.ts';
import './features/print.ts';
import './features/history-ui.ts';
import './features/rulers.ts';
import './features/shell.ts';
import './features/automosaic.ts';
import { LayPlan } from './features/layplan.ts';
import './features/mix.ts';
import { Vision } from './features/vision.ts';
import { Pages } from './features/pages.ts';
import { Snippets } from './features/snippets.ts';
import './features/motifs.ts';
import './features/image-clipboard.ts';
import './features/export3d.ts';
import { Share } from './features/share.ts';

// for the end-to-end tests and for poking around in the browser console
Object.assign(window, { MZ, Geo, Colors, Store, PhotoTools, LayPlan, Vision, Pages, Snippets, Share });
