// COMPONENT TYPE: Presentational
// SECTION: Pattern Explorer
//
// ROLE:
// - Demonstrate Signals-based local state in an isolated, reusable UI block
// - Let users filter patterns by level without mutating source data
// - Toggle contributor hints with lightweight component-local state
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
import { PatternCard, PatternLevel } from '../../pattern-explorer.models';

@Component({
  selector: 'app-pattern-playground',
  imports: [],
  templateUrl: './pattern-playground.html',
  styleUrl: './pattern-playground.scss',
})
export class PatternPlayground {
  @Input({ required: true }) patterns: PatternCard[] = [];

  selectedLevel = signal<PatternLevel>('beginner');
  showContributorTips = signal(false);

  levels: PatternLevel[] = ['beginner', 'intermediate', 'advanced'];

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
}
