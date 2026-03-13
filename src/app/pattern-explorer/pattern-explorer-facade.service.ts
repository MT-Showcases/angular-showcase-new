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
    },
    {
      id: 'facade-service',
      title: 'Facade Service Boundary',
      category: 'Facade Service',
      summary:
        'A facade exposes business-friendly methods so components do not depend on store, HTTP, or transformation internals.',
      whyItMatters:
        'You can evolve implementation details (mock data, REST API, NgRx selectors) without rewriting every consuming component.',
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
    },
    {
      id: 'signals-local-state',
      title: 'Signals for Local UI State',
      category: 'Signals Local State',
      summary:
        'Use writable and computed signals for local interactions (selection, filters, panels) close to the component.',
      whyItMatters:
        'Signals provide lightweight, explicit reactivity for UI concerns without introducing global state complexity.',
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
    },
  ];

  getPatternCards(): PatternCard[] {
    return this.patternCards;
  }
}
