// COMPONENT TYPE: Container
// SECTION: Pattern Explorer
//
// ROLE:
// - Coordinate Pattern Explorer page state and data loading
// - Connect facade data to presentational components
// - Handle selection flow across pattern cards
//
// PATTERNS USED:
// - Container/Presentational split
// - Facade service for data access
// - Signals for local page state
//
// NOTES FOR CONTRIBUTORS:
// - Keep orchestration here and avoid presentation-specific logic
// - Add new data behaviors via facade methods before touching presentational components

import { Component, computed, inject, signal } from '@angular/core';
import { PageHeader } from '../page-header/page-header';
import { PatternExplorerFacadeService } from './pattern-explorer-facade.service';
import { PatternList } from './components/pattern-list/pattern-list';
import { PatternPlayground } from './components/pattern-playground/pattern-playground';

@Component({
  selector: 'app-pattern-explorer',
  imports: [PageHeader, PatternList, PatternPlayground],
  templateUrl: './pattern-explorer.html',
  styleUrl: './pattern-explorer.scss',
})
export class PatternExplorer {
  private readonly patternExplorerFacade = inject(PatternExplorerFacadeService);

  patterns = signal(this.patternExplorerFacade.getPatternCards());
  selectedPatternId = signal(this.patterns()[0]?.id ?? '');

  selectedPattern = computed(() =>
    this.patterns().find((pattern) => pattern.id === this.selectedPatternId())
  );

  onSelectPattern(patternId: string): void {
    this.selectedPatternId.set(patternId);
  }
}
