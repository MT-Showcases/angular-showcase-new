// COMPONENT TYPE: Service
// SECTION: Shared Services
//
// ROLE:
// - Load and cache the learning-content.json asset
// - Provide typed access to concepts, depth levels, and examples
// - Keep HTTP/fetch concerns out of components and facades
//
// PATTERNS USED:
// - Singleton service (providedIn: 'root')
// - HttpClient for JSON asset loading
// - Signal-based reactive state (signal + computed)
//
// PEDAGOGICAL NOTE:
// Loading the JSON via HttpClient (not a raw import) keeps the service testable —
// you can provide a mock HttpClient in specs without touching the filesystem.

import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LearningContent, LearningConcept, LearningExample } from '../../types/learning-content';

@Injectable({ providedIn: 'root' })
export class LearningContentService {
  private readonly http = inject(HttpClient);

  // PEDAGOGICAL NOTE: We use a signal (not BehaviorSubject) because the data
  // is local-state, not a stream. Signals are simpler when you just need
  // "store a value and read it reactively".
  private readonly _content = signal<LearningContent | null>(null);

  /** True once the JSON has been loaded */
  readonly loaded = computed(() => this._content() !== null);

  /** Full list of concepts from the JSON */
  readonly concepts = computed<LearningConcept[]>(() => this._content()?.concepts ?? []);

  /**
   * Load the JSON once; subsequent calls are no-ops.
   * Call this early (e.g., from the PatternExplorer container) to avoid
   * waterfall rendering: start the request before child components render.
   */
  load(): void {
    if (this._content() !== null) return;

    this.http.get<LearningContent>('/assets/content/learning-content.json').subscribe({
      next: (content) => this._content.set(content),
      error: (err) => console.error('[LearningContentService] Failed to load learning content', err),
    });
  }

  /**
   * Find a concept by its id.
   * Returns undefined if the JSON is not yet loaded or the id does not exist.
   *
   * PEDAGOGICAL NOTE: Returning undefined (not null) aligns with Array.find semantics.
   * Callers can use optional chaining: service.findConcept('x')?.examples
   */
  findConcept(id: string): LearningConcept | undefined {
    return this.concepts().find((c) => c.id === id);
  }

  /**
   * Get examples for a concept filtered by depth level format.
   * We map depth levels to example ids by convention:
   *   intro    → first 'analogy' example
   *   guided   → first 'snippet' example
   *   applied  → first 'exercise' example
   *   mastery  → first 'case-study' example
   *
   * PEDAGOGICAL NOTE: This mapping is intentionally simple.
   * It avoids adding a depthLevel field to LearningExample (would change the schema)
   * while still providing meaningful content per tab.
   */
  getExamplesForDepth(
    conceptId: string,
    depth: 'intro' | 'guided' | 'applied' | 'mastery'
  ): LearningExample[] {
    const concept = this.findConcept(conceptId);
    if (!concept) return [];

    const formatMap: Record<string, LearningExample['format']> = {
      intro: 'analogy',
      guided: 'snippet',
      applied: 'exercise',
      mastery: 'case-study',
    };

    const targetFormat = formatMap[depth];
    return concept.examples.filter((ex) => ex.format === targetFormat);
  }
}
