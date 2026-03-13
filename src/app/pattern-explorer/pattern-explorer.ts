// COMPONENT TYPE: Container
// SECTION: Pattern Explorer
//
// ROLE:
// - Coordinate Pattern Explorer page state and data loading
// - Connect facade data to presentational components
// - Handle progressive selection flow across depth levels

import { Component, computed, inject, signal } from '@angular/core';
import { PageHeader } from '../page-header/page-header';
import { PatternExplorerFacadeService } from './pattern-explorer-facade.service';
import { PatternList } from './components/pattern-list/pattern-list';
import { PatternPlayground } from './components/pattern-playground/pattern-playground';
import { DepthModal } from './components/depth-modal/depth-modal';
import { DepthSidePanel } from './components/depth-side-panel/depth-side-panel';
import { BreadcrumbItem, BreadcrumbTrail } from './components/breadcrumb-trail/breadcrumb-trail';
import { SearchBar } from '../components/search-bar/search-bar';
import { PatternCard } from './pattern-explorer.models';

@Component({
  selector: 'app-pattern-explorer',
  imports: [
    PageHeader,
    PatternList,
    PatternPlayground,
    SearchBar,
    DepthModal,
    DepthSidePanel,
    BreadcrumbTrail,
  ],
  templateUrl: './pattern-explorer.html',
  styleUrl: './pattern-explorer.scss',
})
export class PatternExplorer {
  private readonly patternExplorerFacade = inject(PatternExplorerFacadeService);

  patterns = signal(this.patternExplorerFacade.getPatternCards());
  selectedPatternId = signal(this.patterns()[0]?.id ?? '');
  searchQuery = signal('');

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

  isDepthModalOpen = signal(false);
  isDepthPanelOpen = signal(false);

  selectedPattern = computed(() =>
    this.patterns().find((pattern) => pattern.id === this.selectedPatternId()) ?? null
  );

  breadcrumbItems = computed<BreadcrumbItem[]>(() => {
    const selectedPattern = this.selectedPattern();

    const base: BreadcrumbItem[] = [{ label: 'Pattern Explorer' }];

    if (!selectedPattern) {
      return base;
    }

    if (this.isDepthPanelOpen()) {
      return [
        ...base,
        { label: selectedPattern.title },
        { label: 'Full Depth Panel' },
      ];
    }

    if (this.isDepthModalOpen()) {
      return [...base, { label: selectedPattern.title }];
    }

    return base;
  });

  onSelectPattern(patternId: string): void {
    this.selectedPatternId.set(patternId);
    this.isDepthModalOpen.set(true);
  }

  onSearchResultSelected(result: PatternCard | { id: string }): void {
    this.onSelectPattern(result.id);
  }

  onCloseModal(): void {
    this.isDepthModalOpen.set(false);
  }

  onOpenDepthPanel(): void {
    this.isDepthModalOpen.set(false);
    this.isDepthPanelOpen.set(true);
  }

  onCloseDepthPanel(): void {
    this.isDepthPanelOpen.set(false);
  }
}
