// COMPONENT TYPE: Presentational
// SECTION: Pattern Explorer
//
// ROLE:
// - Demonstrate Signals-based local state in an isolated, reusable UI block
// - Let users filter patterns by level without mutating source data
// - Toggle contributor hints with lightweight component-local state
// - Host interactive pattern labs for architecture practice
//
// PATTERNS USED:
// - Signals for local UI state
// - Computed signal for derived filtered collection
// - @Input for immutable source data
//
// NOTES FOR CONTRIBUTORS:
// - Keep all state local to this component; do not move to global store
// - Add new interactions with writable/computed signals to preserve educational intent

import { Component, Input, computed, signal } from '@angular/core';
import { PatternCard, PatternLabId, PatternLevel } from '../../pattern-explorer.models';
import { SmartDumbRefactorLab } from '../labs/smart-dumb-refactor-lab/smart-dumb-refactor-lab';
import { SignalVsObservableLab } from '../labs/signal-vs-observable-lab/signal-vs-observable-lab';
import { FacadeAntiPatternFixerLab } from '../labs/facade-anti-pattern-fixer-lab/facade-anti-pattern-fixer-lab';

interface PatternLabTab {
  id: PatternLabId;
  label: string;
  summary: string;
}

@Component({
  selector: 'app-pattern-playground',
  imports: [SmartDumbRefactorLab, SignalVsObservableLab, FacadeAntiPatternFixerLab],
  templateUrl: './pattern-playground.html',
  styleUrl: './pattern-playground.scss',
})
export class PatternPlayground {
  @Input({ required: true }) patterns: PatternCard[] = [];

  selectedLevel = signal<PatternLevel>('beginner');
  showContributorTips = signal(false);
  activeLabId = signal<PatternLabId>('smart-dumb-refactor');

  levels: PatternLevel[] = ['beginner', 'intermediate', 'advanced'];

  readonly labTabs: PatternLabTab[] = [
    {
      id: 'smart-dumb-refactor',
      label: 'Smart/Dumb Refactor',
      summary: 'Classify responsibilities to reinforce container/presentational boundaries.',
    },
    {
      id: 'signal-vs-observable',
      label: 'Signal vs Observable',
      summary: 'Compare local interaction updates across both reactive primitives.',
    },
    {
      id: 'facade-fixer',
      label: 'Facade Fixer',
      summary: 'Repair anti-patterns by choosing semantic facade boundaries.',
    },
  ];

  // PATTERN: Signals-based local state
  // PURPOSE:
  // - Keep interaction state close to the UI that consumes it
  // - Recompute filtered patterns only when dependencies change
  // - Avoid global state for page-local educational controls
  filteredPatterns = computed(() => {
    const activeLevel = this.selectedLevel();

    return this.patterns.filter((pattern) => {
      if (activeLevel === 'advanced') {
        return true;
      }

      if (activeLevel === 'intermediate') {
        return pattern.level !== 'advanced';
      }

      return pattern.level === 'beginner';
    });
  });

  updateLevel(level: PatternLevel): void {
    this.selectedLevel.set(level);
  }

  toggleContributorTips(): void {
    this.showContributorTips.update((value) => !value);
  }

  selectLab(labId: PatternLabId): void {
    this.activeLabId.set(labId);
  }
}
