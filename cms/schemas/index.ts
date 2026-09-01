/**
 * Sanity schema registry.
 *
 * Copy this directory into the Studio's `schemaTypes` folder and register the
 * export in `sanity.config.ts`:
 *
 *   import { schemaTypes } from './schemaTypes';
 *   export default defineConfig({ schema: { types: schemaTypes } });
 *
 * See `cms/README.md` for the full deployment steps.
 */

import { seo } from './objects/seo';
import { faq } from './objects/faq';
import { courseDate } from './objects/courseDate';
import { courseModule } from './objects/module';
import { metric } from './objects/metric';

import { siteSettings } from './siteSettings';
import { solution } from './solution';
import { solutionCategory } from './solutionCategory';
import { course } from './course';
import { courseCategory } from './courseCategory';
import { expert } from './expert';
import { industry } from './industry';
import { partner } from './partner';
import { caseStudy } from './caseStudy';
import { article } from './article';
import { articleCategory } from './articleCategory';
import { testimonial } from './testimonial';

/** Shared objects, referenced by the document types below. */
export const objectTypes = [seo, faq, courseDate, courseModule, metric];

export const documentTypes = [
  siteSettings,
  solutionCategory,
  solution,
  courseCategory,
  course,
  expert,
  industry,
  partner,
  caseStudy,
  articleCategory,
  article,
  testimonial,
];

export const schemaTypes = [...objectTypes, ...documentTypes];
