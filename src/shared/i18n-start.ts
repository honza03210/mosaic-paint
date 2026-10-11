/* Imported first by both apps: translates the page's static texts before anything else runs. */
import { translateDom } from './i18n.ts';

translateDom(document.body);
