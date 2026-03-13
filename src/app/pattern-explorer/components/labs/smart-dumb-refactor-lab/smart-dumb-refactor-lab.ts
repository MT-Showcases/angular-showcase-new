// COMPONENT TYPE: Presentational Lab
// SECTION: Pattern Explorer
//
// ROLE:
// - Provide an interactive exercise to practice Container/Presentational boundaries
// - Let contributors classify responsibilities into smart or dumb component ownership
// - Offer immediate feedback through signal-driven scoring

import { Component, computed, signal } from '@angular/core';

type Ownership = 'smart' | 'dumb';

interface RefactorTask {
  id: string;
  label: string;
  recommendedOwner: Ownership;
  rationale: string;
}

@Component({
  selector: 'app-smart-dumb-refactor-lab',
  imports: [],
  templateUrl: './smart-dumb-refactor-lab.html',
  styleUrl: './smart-dumb-refactor-lab.scss',
})
export class SmartDumbRefactorLab {
  private readonly tasks: RefactorTask[] = [
    {
      id: 'fetch-users',
      label: 'Fetch users from API and map DTOs',
      recommendedOwner: 'smart',
      rationale: 'Data access and mapping belong in container/facade orchestration layers.',
    },
    {
      id: 'emit-card-click',
      label: 'Emit click event when a user card is selected',
      recommendedOwner: 'dumb',
      rationale: 'Presentational components should emit semantic events to their container.',
    },
    {
      id: 'route-guards',
      label: 'Decide navigation based on permissions',
      recommendedOwner: 'smart',
      rationale: 'Routing and authorization decisions are container-level orchestration concerns.',
    },
    {
      id: 'render-avatar',
      label: 'Render avatar, name, and role labels',
      recommendedOwner: 'dumb',
      rationale: 'Rendering and formatting of provided inputs are presentational responsibilities.',
    },
  ];

  readonly selections = signal<Record<string, Ownership | null>>({
    'fetch-users': null,
    'emit-card-click': null,
    'route-guards': null,
    'render-avatar': null,
  });

  readonly solvedCount = computed(() => {
    const selectionMap = this.selections();

    return this.tasks.filter((task) => selectionMap[task.id] === task.recommendedOwner).length;
  });

  readonly completionLabel = computed(() => {
    const solved = this.solvedCount();

    if (solved === this.tasks.length) {
      return 'Excellent split. This boundary is production-ready.';
    }

    if (solved >= this.tasks.length - 1) {
      return 'Almost there — re-check one ownership decision.';
    }

    return 'Keep iterating. Favor orchestration in smart components and rendering in dumb ones.';
  });

  get refactorTasks(): RefactorTask[] {
    return this.tasks;
  }

  chooseOwner(taskId: string, owner: Ownership): void {
    this.selections.update((current) => ({
      ...current,
      [taskId]: owner,
    }));
  }

  isCorrect(task: RefactorTask): boolean {
    return this.selections()[task.id] === task.recommendedOwner;
  }

  resetLab(): void {
    this.selections.set({
      'fetch-users': null,
      'emit-card-click': null,
      'route-guards': null,
      'render-avatar': null,
    });
  }
}
