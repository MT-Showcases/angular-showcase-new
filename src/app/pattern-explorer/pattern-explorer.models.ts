// COMPONENT TYPE: Utility
// SECTION: Pattern Explorer
//
// ROLE:
// - Define strongly typed contracts for Pattern Explorer feature data
// - Keep Container, Presentational components, and Facade aligned on shared models
// - Document the educational metadata shown in the UI
//
// PATTERNS USED:
// - Shared model definitions for feature boundaries
// - Explicit union types for constrained values
//
// NOTES FOR CONTRIBUTORS:
// - Extend these interfaces before introducing new pattern cards or playground options
// - Keep ids stable to avoid breaking selectedPattern signals and track expressions

export type PatternLevel = 'beginner' | 'intermediate' | 'advanced';

export interface PatternCard {
  id: string;
  title: string;
  category: 'Container/Presentational' | 'Facade Service' | 'Signals Local State';
  summary: string;
  whyItMatters: string;
  level: PatternLevel;
  checklist: string[];
  antiPatterns: string[];
}

export interface PatternPlaygroundState {
  selectedLevel: PatternLevel;
  showContributorTips: boolean;
}
