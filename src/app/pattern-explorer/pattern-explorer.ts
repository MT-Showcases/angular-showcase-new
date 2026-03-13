// COMPONENT TYPE: Container (Smart)
// SECTION: Pattern Explorer
//
// ROLE:
// - Orchestrate all signals and computed state for the Pattern Explorer feature
// - Inject facade (pattern list) and LearningContentService (depth-level examples)
// - Expose a stable API to child presentational components via template bindings
//
// PATTERNS USED:
// - Container/Presentational split
// - Facade Service (PatternExplorerFacadeService)
// - Signals for local UI state (Angular 17+)
// - Computed signals for derived state (filteredPatterns, selectedPattern, depthExamples)
//
// PEDAGOGICAL NOTE:
// This component is "smart": it injects services and drives all state.
// The template receives only signals — presentational blocks have zero logic.
// When you add a new tab or filter, modify this container, not the templates.

import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../page-header/page-header';
import { PatternExplorerFacadeService } from './pattern-explorer-facade.service';
import { SearchBar } from '../components/search-bar/search-bar';
import { PatternPlayground } from './components/pattern-playground/pattern-playground';
import { PatternCard, PatternLevel } from './pattern-explorer.models';
import { PatternList } from './components/pattern-list/pattern-list';
import { CodeBlock } from '../components/code-block/code-block';
import { LearningContentService } from '../services/learning-content.service';
import { LearningExample } from '../../types/learning-content';

type PatternExplorerTab = 'panoramica' | 'approfondimento' | 'lab';

@Component({
  selector: 'app-pattern-explorer',
  imports: [CommonModule, PageHeader, SearchBar, PatternPlayground, PatternList, CodeBlock],
  templateUrl: './pattern-explorer.html',
  styleUrl: './pattern-explorer.scss',
})
export class PatternExplorer implements OnInit {
  // PEDAGOGICAL NOTE: We inject the facade (domain API) and LearningContentService
  // (content enrichment) separately. This respects the Single Responsibility Principle:
  // the facade manages *which* patterns exist; LearningContent manages *educational depth*.
  private readonly patternExplorerFacade = inject(PatternExplorerFacadeService);
  readonly learningContent = inject(LearningContentService);

  patterns = signal(this.patternExplorerFacade.getPatternCards());
  selectedPatternId = signal(this.patterns()[0]?.id ?? '');
  searchQuery = signal('');
  activeTab = signal<PatternExplorerTab>('panoramica');
  selectedLevel = signal<'all' | PatternLevel>('all');

  filteredPatterns = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const levelFilter = this.selectedLevel();

    return this.patterns().filter((pattern) => {
      const matchesQuery =
        !query || `${pattern.title} ${pattern.category} ${pattern.level}`.toLowerCase().includes(query);
      const matchesLevel = levelFilter === 'all' || pattern.level === levelFilter;
      return matchesQuery && matchesLevel;
    });
  });

  selectedPattern = computed(() =>
    this.patterns().find((pattern) => pattern.id === this.selectedPatternId()) ?? null
  );

  activeTabLabel = computed(() => {
    switch (this.activeTab()) {
      case 'panoramica':
        return 'Panoramica';
      case 'approfondimento':
        return 'Approfondimento';
      case 'lab':
        return 'Lab interattivi';
    }
  });

  // ─────────────────────────────────────────────────────────────────────────
  // DEPTH-LEVEL COMPUTED SIGNALS
  // PEDAGOGICAL NOTE:
  // We derive examples from LearningContentService using the selected pattern's
  // conceptId. This is a "lazy join" — we fetch the linked concept only when
  // a pattern is selected, keeping the main patterns[] signal lean.
  // ─────────────────────────────────────────────────────────────────────────

  /** Examples matching the 'intro' depth for the selected pattern (used in Panoramica tab) */
  introExamples = computed<LearningExample[]>(() => {
    const conceptId = this.selectedPattern()?.conceptId;
    if (!conceptId) return [];
    return this.learningContent.getExamplesForDepth(conceptId, 'intro');
  });

  /** Examples matching the 'guided' depth for the selected pattern (used in Approfondimento tab) */
  guidedExamples = computed<LearningExample[]>(() => {
    const conceptId = this.selectedPattern()?.conceptId;
    if (!conceptId) return [];
    return this.learningContent.getExamplesForDepth(conceptId, 'guided');
  });

  /** Examples matching the 'applied' depth for the selected pattern (used in Approfondimento tab) */
  appliedExamples = computed<LearningExample[]>(() => {
    const conceptId = this.selectedPattern()?.conceptId;
    if (!conceptId) return [];
    return this.learningContent.getExamplesForDepth(conceptId, 'applied');
  });

  /** Examples matching the 'mastery' depth for the selected pattern (used in Lab tab) */
  masteryExamples = computed<LearningExample[]>(() => {
    const conceptId = this.selectedPattern()?.conceptId;
    if (!conceptId) return [];
    return this.learningContent.getExamplesForDepth(conceptId, 'mastery');
  });

  /**
   * PEDAGOGICAL NOTE: ngOnInit is the right lifecycle hook to trigger side effects
   * (HTTP calls) because it runs after Angular has resolved all @Inputs.
   * We do NOT call load() in the constructor to respect DI and testability conventions.
   */
  ngOnInit(): void {
    this.learningContent.load();
  }

  setActiveTab(tab: PatternExplorerTab): void {
    this.activeTab.set(tab);
  }

  onSelectPattern(patternId: string): void {
    this.selectedPatternId.set(patternId);
    this.activeTab.set('approfondimento');
  }

  onSearchResultSelected(result: PatternCard | { id: string }): void {
    this.onSelectPattern(result.id);
  }

  onFilterLevel(level: 'all' | PatternLevel): void {
    this.selectedLevel.set(level);
  }

  clearSelectedPattern(): void {
    this.selectedPatternId.set('');
    this.activeTab.set('panoramica');
  }

  /**
   * Detect whether an example's solution looks like a code snippet
   * (starts with a decorator, keyword, or backtick) rather than plain prose.
   *
   * PEDAGOGICAL NOTE: We avoid a flag in the data model to keep the JSON schema simple.
   * This heuristic is intentionally conservative: if in doubt, render as text.
   */
  isCodeSnippet(text: string): boolean {
    if (!text) return false;
    const trimmed = text.trimStart();
    return (
      trimmed.startsWith('@') ||
      trimmed.startsWith('export ') ||
      trimmed.startsWith('const ') ||
      trimmed.startsWith('function ') ||
      trimmed.startsWith('import ') ||
      trimmed.startsWith('class ') ||
      trimmed.startsWith('<') ||
      trimmed.includes('\n') // multi-line → likely code
    );
  }
}
