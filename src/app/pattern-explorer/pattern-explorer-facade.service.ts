// GoF Pattern: Singleton — single instance via Angular DI root scope.
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
    // ──────────────────────────────────────────────────────────────
    // PATTERN 4: Smart/Dumb Components with Input/Output
    // PEDAGOGICAL NOTE: This deepens the Container/Presentational pattern
    // by focusing specifically on the @Input/@Output contract boundary.
    // ──────────────────────────────────────────────────────────────
    {
      id: 'smart-dumb-io',
      title: 'Smart/Dumb Components with Input/Output',
      category: 'Container/Presentational',
      summary:
        'Smart components own data and logic; dumb components receive data via @Input and emit events via @Output — nothing else.',
      whyItMatters:
        'This hard boundary makes dumb components reusable across features, trivially testable (no injections), and visually previewable in isolation.',
      fullContent:
        'At mastery level, enforce a rule: if a component imports a service, it is smart. If it only has inputs/outputs, it is dumb. Dumb components should have OnPush change detection and zero side effects. Smart components orchestrate, dumb components render.',
      level: 'beginner',
      checklist: [
        'Dumb components have only @Input and @Output — no inject()',
        'Smart components handle subscriptions, HTTP, and store reads',
        'Use OnPush on all dumb components for performance',
        'Events bubble up via Output, never down via shared mutable state',
      ],
      antiPatterns: [
        '❌ Injecting HttpClient in a reusable button component',
        '❌ Using a shared mutable object between parent and child',
        '✅ Parent passes data via [input] and listens with (output)',
      ],
      relatedTopics: ['Container/Presentational Pattern', 'OnPush Change Detection', 'Component Composition'],
      exercises: [
        'Create a UserCard dumb component with typed @Input and @Output',
        'Refactor a service-calling component into smart parent + dumb child',
      ],
    },
    // ──────────────────────────────────────────────────────────────
    // PATTERN 5: HTTP + Loading State
    // PEDAGOGICAL NOTE: This pattern eliminates "boolean hell" where
    // separate isLoading/hasError/data variables create impossible states.
    // ──────────────────────────────────────────────────────────────
    {
      id: 'http-loading-state',
      title: 'HTTP + Loading State Pattern',
      category: 'HTTP & Data Layer',
      summary:
        'Model every async operation as a state machine: idle → loading → success/error. Never leave the UI ambiguous.',
      whyItMatters:
        'Users need visual feedback. Without explicit loading/error states, the UI appears frozen or silently fails.',
      fullContent:
        'Create a generic LoadingState<T> type with discriminated unions. Use this in facades and components to drive template @switch blocks. Combine with retry logic for resilient data fetching.',
      level: 'intermediate',
      checklist: [
        'Every HTTP call has loading, success, and error states',
        'Use a typed LoadingState<T> union — not separate booleans',
        'Show skeleton/spinner during loading, error message on failure',
        'Implement retry with backoff for transient errors',
      ],
      antiPatterns: [
        '❌ Separate isLoading + hasError + data variables (impossible states)',
        '❌ Silently swallowing HTTP errors with empty catchError',
        '✅ Single LoadingState signal with discriminated union',
      ],
      relatedTopics: ['Service Facade Pattern', 'RxJS Error Handling', 'Discriminated Unions'],
      exercises: [
        'Implement LoadingState<T> and use it for a list fetch',
        'Add retry with exponential backoff to a failing API call',
      ],
    },
    // ──────────────────────────────────────────────────────────────
    // PATTERN 6: NgRx Store Pattern
    // PEDAGOGICAL NOTE: Links to the existing src/app/store/ and
    // src/app/ngrx-example/ sections for hands-on exploration.
    // ──────────────────────────────────────────────────────────────
    {
      id: 'ngrx-store-pattern',
      title: 'NgRx Store Pattern',
      category: 'State Management',
      summary:
        'Centralize shared state with Actions → Reducers → Selectors. Predictable state updates via pure functions.',
      whyItMatters:
        'When multiple features share state (auth, cart, notifications), NgRx prevents data inconsistency and enables Redux DevTools debugging.',
      fullContent:
        'NgRx implements Redux: components dispatch Actions, Reducers compute new state, Selectors derive views. Effects handle HTTP side effects. See src/app/store/ for working counter and todo examples.',
      level: 'advanced',
      checklist: [
        'Actions describe events in past tense ("[Todo] Todo Added")',
        'Reducers are pure functions — no side effects',
        'Selectors use createSelector for memoized derived state',
        'Effects handle HTTP and other side effects',
      ],
      antiPatterns: [
        '❌ Mutating state in a reducer (state.items.push(x))',
        '❌ Using store for purely local UI state (use signals)',
        '✅ Using createFeature() for concise feature state setup',
      ],
      relatedTopics: ['Signals for Local State', 'Redux DevTools', 'Effects Pattern'],
      exercises: [
        'Explore src/app/store/todo/ — trace action dispatch to UI update',
        'Add a "priority" field to the todo feature with action, reducer, selector',
      ],
    },
    // ──────────────────────────────────────────────────────────────
    // PATTERN 7: OnPush Change Detection
    // ──────────────────────────────────────────────────────────────
    {
      id: 'onpush-change-detection',
      title: 'ChangeDetection: OnPush Strategy',
      category: 'Change Detection',
      summary:
        'Skip unnecessary re-renders by telling Angular to check only when inputs change or events fire.',
      whyItMatters:
        'Default CD checks every component on every event. OnPush reduces checks to only affected components.',
      fullContent:
        'With OnPush, Angular re-renders only when: (1) @Input reference changes, (2) event handler fires, (3) async pipe emits, (4) signal updates. Critical rule: never mutate objects — create new references.',
      level: 'intermediate',
      checklist: [
        'Set ChangeDetectionStrategy.OnPush on all presentational components',
        'Never mutate @Input objects — always new references',
        'Use signals or async pipe — they trigger OnPush correctly',
        'Test UI updates after enabling OnPush',
      ],
      antiPatterns: [
        '❌ Mutating an array with push() and expecting OnPush to detect it',
        '❌ Using setTimeout without markForCheck()',
        '✅ Spread to create new references: [...items, newItem]',
      ],
      relatedTopics: ['Signals for Local State', 'Smart/Dumb Components', 'Immutable Data'],
      exercises: [
        'Enable OnPush on a component and fix broken updates',
        'Compare Angular DevTools profiling before/after OnPush',
      ],
    },
    // ──────────────────────────────────────────────────────────────
    // PATTERN 8: Advanced DI
    // ──────────────────────────────────────────────────────────────
    {
      id: 'di-advanced',
      title: 'Advanced DI: InjectionToken & Multi-Providers',
      category: 'Dependency Injection',
      summary:
        'Use InjectionToken for non-class deps (config, flags) and multi-providers for plugin-like extensibility.',
      whyItMatters:
        'Real apps inject config objects and feature flags, not just classes. InjectionToken makes this type-safe.',
      fullContent:
        'InjectionToken<T> creates unique tokens for non-class values. Multi-providers (multi: true) let multiple modules contribute to one token. Combine with inject() for clean functional-style DI.',
      level: 'advanced',
      checklist: [
        'Use InjectionToken<T> with proper generic typing',
        'Use useFactory + deps for runtime-computed values',
        'Use multi: true for plugin/registry patterns',
        'Prefer inject() over constructor injection',
      ],
      antiPatterns: [
        '❌ Magic strings instead of typed InjectionTokens',
        '❌ Forgetting multi: true and overwriting providers',
        '✅ const API_URL = new InjectionToken<string>("API_URL")',
      ],
      relatedTopics: ['Factory Pattern', 'Strategy Pattern via DI', 'Provider Scoping'],
      exercises: [
        'Create an InjectionToken<string> for API_BASE_URL at route level',
        'Build a VALIDATORS multi-token collecting rules from feature modules',
      ],
    },
    // ──────────────────────────────────────────────────────────────
    // PATTERN 9: RxJS Operators
    // ──────────────────────────────────────────────────────────────
    {
      id: 'rxjs-operators',
      title: 'RxJS Operators: switchMap, combineLatest, takeUntilDestroyed',
      category: 'RxJS Patterns',
      summary:
        'Master the essential operators that solve 90% of Angular async patterns: search cancellation, stream combination, auto-cleanup.',
      whyItMatters:
        'Without switchMap, searches have race conditions. Without takeUntilDestroyed, subscriptions leak memory.',
      fullContent:
        'switchMap: cancels previous Observable when source emits — perfect for typeahead. combineLatest: emits when ANY source changes — ideal for filters. takeUntilDestroyed: auto-unsubscribes on component destroy.',
      level: 'intermediate',
      checklist: [
        'Use switchMap for search/autocomplete (cancel stale requests)',
        'Use combineLatest for combining independent streams',
        'Use takeUntilDestroyed() in every manual subscribe()',
        'Prefer declarative streams over imperative subscribe-and-set',
      ],
      antiPatterns: [
        '❌ mergeMap for search (race conditions with out-of-order responses)',
        '❌ Nested subscribes: obs1$.subscribe(() => obs2$.subscribe(...))',
        '✅ debounceTime(300) + switchMap(q => search(q)) + takeUntilDestroyed()',
      ],
      relatedTopics: ['RxJS + Signals Interop', 'HTTP Data Layer', 'Memory Leak Prevention'],
      exercises: [
        'Build a search with debounceTime + switchMap',
        'Combine filters with data using combineLatest + toSignal',
      ],
    },
    // ──────────────────────────────────────────────────────────────
    // PATTERN 10: Signal-Based Forms
    // PEDAGOGICAL NOTE: Links to the live demo at /advanced/signal-forms
    // ──────────────────────────────────────────────────────────────
    {
      id: 'signal-forms',
      title: 'Signal-Based Forms (Angular 17+)',
      category: 'Forms',
      summary:
        'Use signals to model form state, validation, and derived UI without ReactiveForms complexity.',
      whyItMatters:
        'Reactive Forms have a steep learning curve. For many use cases, signals provide the same reactivity with less boilerplate.',
      fullContent:
        'Model each field as a writable signal. Use computed() for validation, derived state, and submit-button disabled state. See the live demo at /advanced/signal-forms. For complex dynamic forms with FormArrays, Reactive Forms remain better.',
      level: 'intermediate',
      checklist: [
        'Each field is a writable signal: name = signal("")',
        'Validation is computed: nameError = computed(() => ...)',
        'Form validity is derived: isValid = computed(() => !nameError() && !emailError())',
        'Submit reads signal values directly — no form.value needed',
      ],
      antiPatterns: [
        '❌ Using ReactiveForms for a simple 3-field form (overkill)',
        '❌ Imperative validation in submit handler',
        '✅ Computed signals that auto-update error messages as user types',
      ],
      relatedTopics: ['Signals for Local State', 'Reactive Forms (for complex cases)', 'Validation Patterns'],
      exercises: [
        'Build a contact form with name/email/message signals and computed validation',
        'Add an autosave effect() that debounces and saves to localStorage',
      ],
    },
  ];

  getPatternCards(): PatternCard[] {
    return this.patternCards;
  }
}
