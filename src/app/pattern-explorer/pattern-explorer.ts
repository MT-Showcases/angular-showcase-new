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

import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// WHY MatTabsModule: i tab Material gestiscono automaticamente accessibilità (ARIA roles),
// keyboard navigation e animazioni. Non dobbiamo reimplementarle da zero — DRY + a11y gratis.
import { MatTabsModule } from '@angular/material/tabs';
import { SectionHeaderComponent } from '../components/shared/section-header/section-header.component';
// WHY PedagogyCardComponent: componente shared riusabile che evita la duplicazione
// di div .pedagogy-box in tutto il progetto (DRY principle).
import { PedagogyCardComponent } from '../components/shared/pedagogy-card/pedagogy-card.component';
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
  // WHY OnPush: questa è una container component guidata da signals. Con OnPush,
  // Angular esegue change detection SOLO quando un signal cambia o un @Input cambia
  // reference. Questo riduce drasticamente i cicli di CD su pagine complesse.
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatTabsModule,
    SectionHeaderComponent,
    PedagogyCardComponent,
    SearchBar,
    PatternPlayground,
    PatternList,
    CodeBlock,
  ],
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

  // WHY tabIndex computed: mat-tab-group usa indici numerici, ma internamente
  // lavoriamo con nomi stringa per leggibilità. Questo computed fa il bridge
  // senza duplicare lo state — single source of truth.
  tabIndex = computed<number>(() => {
    switch (this.activeTab()) {
      case 'panoramica': return 0;
      case 'approfondimento': return 1;
      case 'lab': return 2;
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
   * PEDAGOGICAL NOTE: ngOnInit è il lifecycle hook corretto per i side effect
   * (chiamate HTTP) perché gira dopo che Angular ha risolto tutti gli @Input.
   * Evitiamo il constructor per rispettare le convenzioni DI e testabilità.
   */
  ngOnInit(): void {
    this.learningContent.load();
  }

  setActiveTab(tab: PatternExplorerTab): void {
    this.activeTab.set(tab);
  }

  // WHY onTabIndexChange: mat-tab-group emette un indice numerico su (selectedIndexChange).
  // Convertiamo qui invece che nel template per mantenere la logica nel controller.
  onTabIndexChange(index: number): void {
    const tabs: PatternExplorerTab[] = ['panoramica', 'approfondimento', 'lab'];
    this.activeTab.set(tabs[index] ?? 'panoramica');
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
   * PEDAGOGICAL NOTE: Evitiamo un flag nel data model per mantenere il JSON schema semplice.
   * Questa euristica è volutamente conservativa: se c'è dubbio, renderiamo come testo.
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
