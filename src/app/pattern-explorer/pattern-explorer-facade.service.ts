// COMPONENT TYPE: Facade Service
// SECTION: Pattern Explorer
//
// ROLE:
// - Expose a simple API for Pattern Explorer components
// - Centralize pattern metadata used by the container and presentational views
// - Keep data source details hidden from UI components
//
// PATTERNS USED:
// - Facade service
// - Read-only data contract for UI consumption
//
// NOTES FOR CONTRIBUTORS:
// - Keep this API stable and simple for educational clarity
// - If data later comes from HTTP, preserve method signatures used by the container

import { Injectable } from '@angular/core';
import { PatternCard } from './pattern-explorer.models';

@Injectable({
  providedIn: 'root',
})
export class PatternExplorerFacadeService {
  // PATTERN: Facade service
  // PURPOSE:
  // - Expose a simplified API to components
  // - Keep pattern definitions centralized and reusable
  // - Prevent presentational components from owning data source details
  private readonly patternCards: PatternCard[] = [
    {
      id: 'container-presentational',
      title: 'Container + Presentational Split',
      category: 'Container/Presentational',
      summary:
        'Use a smart container to coordinate state and events, then delegate rendering to pure UI components.',
      whyItMatters:
        'This split keeps templates simple, improves testability, and makes visual components reusable in other flows.',
      fullContent:
        'At depth 3, this pattern is about strong boundaries: the container orchestrates route data, state changes, and side effects, while presentational components focus on rendering and semantic events. Keep business branching and data access in the container so visual components remain portable and easy to test.',
      level: 'beginner',
      checklist: [
        'Container owns orchestration and route-level decisions',
        'Presentational component receives @Input data and emits events',
        'No API or store calls in presentational classes',
      ],
      antiPatterns: [
        'Fetching HTTP data directly in a reusable card component',
        'Large templates mixing rendering and business branching in one place',
      ],
      relatedTopics: ['Smart vs Dumb Components', 'Single Responsibility Principle', 'Input/Output Contracts'],
      exercises: [
        'Move data-fetching out of a card component into a route container',
        'Refactor a mixed component into one container and two presentational children',
      ],
    },
    {
      id: 'facade-service',
      title: 'Facade Service Boundary',
      category: 'Facade Service',
      summary:
        'A facade exposes business-friendly methods so components do not depend on store, HTTP, or transformation internals.',
      whyItMatters:
        'You can evolve implementation details (mock data, REST API, NgRx selectors) without rewriting every consuming component.',
      fullContent:
        'At depth 3, treat the facade as your domain-friendly API. Components should ask for meaningful operations, not transport-level calls. The facade can aggregate sources, normalize DTOs, and expose stable models. This decouples UI from backend shape churn and keeps architecture adaptable.',
      level: 'intermediate',
      checklist: [
        'Components call semantic methods like getPatternCards()',
        'Facade hides mapping and normalization logic',
        'UI receives typed models ready to render',
      ],
      antiPatterns: [
        'Leaking backend DTO shapes directly into templates',
        'Duplicating fetch-and-map logic across multiple pages',
      ],
      relatedTopics: ['Adapter Pattern', 'Service Layer', 'API Composition'],
      exercises: [
        'Rename low-level service methods into semantic facade actions',
        'Normalize two different endpoint responses into one shared UI model',
      ],
    },
    {
      id: 'signals-local-state',
      title: 'Signals for Local UI State',
      category: 'Signals Local State',
      summary:
        'Use writable and computed signals for local interactions (selection, filters, panels) close to the component.',
      whyItMatters:
        'Signals provide lightweight, explicit reactivity for UI concerns without introducing global state complexity.',
      fullContent:
        'At depth 3, signals shine when state is local, short-lived, and tightly coupled to one feature view. Keep writable signals minimal, derive everything else with computed signals, and avoid mutation-in-place pitfalls. Promote state to facade/store only when multiple routes must coordinate or persistence is required.',
      level: 'advanced',
      checklist: [
        'Writable signals hold local interaction state',
        'Computed signals derive labels, counters, and filtered views',
        'Prefer local state unless cross-feature sharing is required',
      ],
      antiPatterns: [
        'Using a global store for a one-page toggle',
        'Mutating arrays/objects in place instead of updating signal values immutably',
      ],
      relatedTopics: ['Computed Memoization', 'Change Detection', 'Component Reactivity'],
      exercises: [
        'Replace imperative counters with computed signals',
        'Model a filter + selected item flow using only writable and computed signals',
      ],
    },
  ];

  getPatternCards(): PatternCard[] {
    return this.patternCards;
  }
}
