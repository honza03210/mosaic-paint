/* How each curve type of the Curve tool takes its points (both apps). */
import { t } from './i18n.ts';

const NOTES: Record<string, () => string> = {
  catmull: () => t('The curve runs smoothly through every point you click.'),
  bspline: () => t('The curve is pulled towards each point but only touches the first and the last – very smooth, good for flowing lines.'),
  bezier3: () => t('Click a point, two control points, the next point, two control points … The curve passes through every third point; the control points (round) pull it.'),
  bezier2: () => t('Click a point, a control point, the next point, a control point … The curve passes through every other point; the control points (round) pull it.'),
};
/** The note for a curve type (lib/curves.ts SplineType). */
export const curveNote = (type: string): string => (NOTES[type] || NOTES.catmull)();
