import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../page-header/page-header';
import { PatternExplorerFacadeService } from './pattern-explorer-facade.service';
import { SearchBar } from '../components/search-bar/search-bar';
import { PatternPlayground } from './components/pattern-playground/pattern-playground';
import { PatternCard, PatternLevel } from './pattern-explorer.models';
import { PatternList } from './components/pattern-list/pattern-list';

type PatternExplorerTab = 'panoramica' | 'approfondimento' | 'lab';

@Component({
  selector: 'app-pattern-explorer',
  imports: [CommonModule, PageHeader, SearchBar, PatternPlayground, PatternList],
  templateUrl: './pattern-explorer.html',
  styleUrl: './pattern-explorer.scss',
})
export class PatternExplorer {
  private readonly patternExplorerFacade = inject(PatternExplorerFacadeService);

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
}
