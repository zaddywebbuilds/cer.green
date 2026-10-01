import type { ComponentType } from 'react';
import type { VisualProps } from './shared';

import {
  CarbonAccounting,
  Decarbonisation,
  GhgInventory,
  Iso14064,
  LifeCycleAssessment,
  Scope123,
} from './carbon';
import {
  EsgDataKpis,
  EsgRiskManagement,
  EsgStrategy,
  MaterialityAssessment,
  SustainabilityReporting,
  SustainableProcurement,
} from './esg';
import {
  AssuranceReadiness,
  CbamReadiness,
  GovernanceControls,
  IsoAdvisory,
} from './compliance';
import { ClimateRisk, FinancedEmissions, GreenFinance } from './finance';

/**
 * One diagram per published service, keyed by slug.
 *
 * A service with no entry renders no visual rather than a placeholder, so
 * adding a service never produces a card that quietly shows the wrong idea.
 */
const VISUALS: Record<string, ComponentType<VisualProps>> = {
  'carbon-accounting': CarbonAccounting,
  'ghg-inventory': GhgInventory,
  'scope-1-2-3': Scope123,
  'iso-14064': Iso14064,
  decarbonisation: Decarbonisation,
  'life-cycle-assessment': LifeCycleAssessment,

  'esg-strategy': EsgStrategy,
  'sustainability-reporting': SustainabilityReporting,
  'materiality-assessment': MaterialityAssessment,
  'esg-risk-management': EsgRiskManagement,
  'esg-data-kpis': EsgDataKpis,
  'sustainable-procurement': SustainableProcurement,

  'iso-advisory': IsoAdvisory,
  'cbam-readiness': CbamReadiness,
  'assurance-readiness': AssuranceReadiness,
  'governance-controls': GovernanceControls,

  'green-finance': GreenFinance,
  'climate-risk': ClimateRisk,
  'financed-emissions': FinancedEmissions,
};

export function hasSolutionVisual(slug: string) {
  return slug in VISUALS;
}

export function SolutionVisual({ slug }: { slug: string }) {
  const Visual = VISUALS[slug];
  if (!Visual) return null;
  return <Visual uid={`sv-${slug}`} />;
}
