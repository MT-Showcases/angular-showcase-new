// GoF Pattern: Strategy — define stable model contracts used by runtime-selectable algorithms.
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
  // PEDAGOGICAL NOTE: Category is a union type, not a free string.
  // Adding a new category forces you to provide pattern cards — this is intentional.
  // It keeps the UI filter consistent and prevents orphan categories.
  category:
    | 'Container/Presentational'
    | 'Facade Service'
    | 'Signals Local State'
    | 'State Management'
    | 'Change Detection'
    | 'Dependency Injection'
    | 'RxJS Patterns'
    | 'HTTP & Data Layer'
    | 'Forms';
  summary: string;
  whyItMatters: string;
  fullContent: string;
  level: PatternLevel;
  checklist: string[];
  antiPatterns: string[];
  relatedTopics: string[];
  exercises: string[];
}

// PEDAGOGICAL NOTE: Each lab id maps to an interactive exercise component.
// When adding a new lab, create the component first, then register the id here.
export type PatternLabId =
  | 'smart-dumb'
  | 'signal-vs-observable'
  | 'facade-fixer'
  | 'ngrx-flow'
  | 'onpush-detector'
  | 'rxjs-pipeline'
  | 'signal-form';

export interface PatternPlaygroundState {
  selectedLevel: PatternLevel;
  showContributorTips: boolean;
  activeLabId: PatternLabId;
}
