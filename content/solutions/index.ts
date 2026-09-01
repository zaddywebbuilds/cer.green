import type { Solution } from '@/types/content';
import { carbonClimateSolutions } from './carbon-climate';
import { esgSolutions } from './esg-sustainability';
import { complianceSolutions } from './compliance-standards';
import { financeSolutions } from './sustainable-finance';

/**
 * Every service page, across all four categories.
 *
 * A service only appears here once it has enough substance to justify its own
 * page -- business context, components, deliverables and useful FAQs. Anything
 * thinner stays on its category page until CER can develop it. See
 * docs/CONTENT-GUIDE.md.
 */
export const solutions: Solution[] = [
  ...carbonClimateSolutions,
  ...esgSolutions,
  ...complianceSolutions,
  ...financeSolutions,
];
