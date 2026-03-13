import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../page-header/page-header';
import { PatternExplorerFacadeService } from './pattern-explorer-facade.service';
import { SearchBar } from '../components/search-bar/search-bar';
import { PatternPlayground } from './components/pattern-playground/pattern-playground';
import { PatternCard } from './pattern-explorer.models';

type PatternExplorerTab = 'panoramica' | 'approfondimento' | 'lab';

@Component({
  selector: 'app-pattern-explorer',
  imports: [CommonModule, PageHeader, SearchBar, PatternPlayground],
  templateUrl: './pattern-explorer.html',
  styleUrl: './pattern-explorer.scss',
})
export class PatternExplorer {
  private readonly patternExplorerFacade = inject(PatternExplorerFacadeService);

  patterns = signal(this.patternExplorerFacade.getPatternCards());
  selectedPatternId = signal(this.patterns()[0]?.id ?? '');
  searchQuery = signal('');
  activeTab = signal<PatternExplorerTab>('panoramica');

  filteredPatterns = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();

    if (!query) {
      return this.patterns();
    }

    return this.patterns().filter((pattern) => {
      const haystack = `${pattern.title} ${pattern.category} ${pattern.level}`.toLowerCase();
      return haystack.includes(query);
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
}
