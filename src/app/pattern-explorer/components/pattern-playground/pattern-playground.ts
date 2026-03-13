// GoF Pattern: Factory Method — resolve concrete lab component types from selected lab id at runtime.

import { CommonModule, NgComponentOutlet } from '@angular/common';
import { Component, Input, computed, signal } from '@angular/core';
import { PatternCard, PatternLabId, PatternLevel } from '../../pattern-explorer.models';
import { getLabComponent } from '../../pattern-lab.factory';

interface PatternLabTab {
  id: PatternLabId;
  label: string;
  summary: string;
}

@Component({
  selector: 'app-pattern-playground',
  imports: [CommonModule, NgComponentOutlet],
  templateUrl: './pattern-playground.html',
  styleUrl: './pattern-playground.scss',
})
export class PatternPlayground {
  @Input({ required: true }) patterns: PatternCard[] = [];

  selectedLevel = signal<PatternLevel>('beginner');
  showContributorTips = signal(false);
  activeLabId = signal<PatternLabId>('smart-dumb');

  levels: PatternLevel[] = ['beginner', 'intermediate', 'advanced'];

  readonly labTabs: PatternLabTab[] = [
    {
      id: 'smart-dumb',
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

  readonly activeLabComponent = computed(() => getLabComponent(this.activeLabId()));

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
