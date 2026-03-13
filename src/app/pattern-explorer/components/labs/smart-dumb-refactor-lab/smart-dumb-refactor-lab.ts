// GoF Pattern: Template Method — specialize lab lifecycle steps while reusing base reset flow.

import { Component, computed, inject, signal } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { BasePatternLab } from '../base-pattern-lab';

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
export class SmartDumbRefactorLab extends BasePatternLab {
  private readonly notificationService = inject(NotificationService);
  private hasAnnouncedCompletion = false;

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

  constructor() {
    super();
    this.init();
  }

  get refactorTasks(): RefactorTask[] {
    return this.tasks;
  }

  chooseOwner(taskId: string, owner: Ownership): void {
    this.selections.update((current) => ({
      ...current,
      [taskId]: owner,
    }));
    this.run();
  }

  isCorrect(task: RefactorTask): boolean {
    return this.selections()[task.id] === task.recommendedOwner;
  }

  init(): void {
    this.hasAnnouncedCompletion = false;
    this.selections.set({
      'fetch-users': null,
      'emit-card-click': null,
      'route-guards': null,
      'render-avatar': null,
    });
  }

  run(): void {
    if (this.score() === this.tasks.length && !this.hasAnnouncedCompletion) {
      this.hasAnnouncedCompletion = true;
      this.notificationService.push('Smart/Dumb Refactor lab completed 🎉', 'success');
    }
  }

  score(): number {
    return this.solvedCount();
  }

  override reset(): void {
    super.reset();
  }

  resetLab(): void {
    this.reset();
  }
}
