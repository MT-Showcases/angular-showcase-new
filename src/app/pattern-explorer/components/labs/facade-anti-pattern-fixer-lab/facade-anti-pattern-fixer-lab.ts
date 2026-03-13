// GoF Pattern: Template Method — keep fixed lab lifecycle while customizing scenario evaluation logic.

import { Component, computed, inject, signal } from '@angular/core';
import { NotificationService } from '../../../../services/notification.service';
import { BasePatternLab } from '../base-pattern-lab';

interface FacadeScenario {
  id: string;
  antiPattern: string;
  fixOptions: string[];
  correctFix: string;
}

@Component({
  selector: 'app-facade-anti-pattern-fixer-lab',
  imports: [],
  templateUrl: './facade-anti-pattern-fixer-lab.html',
  styleUrl: './facade-anti-pattern-fixer-lab.scss',
})
export class FacadeAntiPatternFixerLab extends BasePatternLab {
  private readonly notificationService = inject(NotificationService);
  private hasAnnouncedCompletion = false;

  private readonly scenarios: FacadeScenario[] = [
    {
      id: 'raw-http',
      antiPattern: 'Component calls HttpClient directly and maps API DTO fields in template.',
      fixOptions: [
        'Move fetch + mapping into facade and expose typed view model method.',
        'Keep HttpClient in component but add a comment explaining the endpoint.',
        'Pass DTO through @Input and map it in each presentational child.',
      ],
      correctFix: 'Move fetch + mapping into facade and expose typed view model method.',
    },
    {
      id: 'selector-leak',
      antiPattern: 'Multiple components import store selectors and repeat transformation logic.',
      fixOptions: [
        'Create facade observables/signals that expose transformed data for components.',
        'Duplicate selector combination in every component for clarity.',
        'Move selectors into templates with inline pipes and conditionals.',
      ],
      correctFix: 'Create facade observables/signals that expose transformed data for components.',
    },
    {
      id: 'verb-naming',
      antiPattern: 'Facade exposes generic methods like load() and update() without business context.',
      fixOptions: [
        'Use semantic methods such as loadPatternCards() and saveContributorProgress().',
        'Keep generic names and rely on README docs to explain intent.',
        'Expose raw repository methods directly from component classes.',
      ],
      correctFix: 'Use semantic methods such as loadPatternCards() and saveContributorProgress().',
    },
  ];

  readonly selectedFixes = signal<Record<string, string | null>>({
    'raw-http': null,
    'selector-leak': null,
    'verb-naming': null,
  });

  readonly solvedCount = computed(() => {
    const picks = this.selectedFixes();
    return this.scenarios.filter((scenario) => picks[scenario.id] === scenario.correctFix).length;
  });

  constructor() {
    super();
    this.init();
  }

  get antiPatternScenarios(): FacadeScenario[] {
    return this.scenarios;
  }

  chooseFix(scenarioId: string, option: string): void {
    this.selectedFixes.update((current) => ({
      ...current,
      [scenarioId]: option,
    }));
    this.run();
  }

  isCorrectSelection(scenario: FacadeScenario): boolean {
    return this.selectedFixes()[scenario.id] === scenario.correctFix;
  }

  init(): void {
    this.hasAnnouncedCompletion = false;
    this.selectedFixes.set({
      'raw-http': null,
      'selector-leak': null,
      'verb-naming': null,
    });
  }

  run(): void {
    if (this.score() === this.scenarios.length && !this.hasAnnouncedCompletion) {
      this.hasAnnouncedCompletion = true;
      this.notificationService.push('Facade Fixer lab completed 🚀', 'success');
    }
  }

  score(): number {
    return this.solvedCount();
  }

  override reset(): void {
    super.reset();
  }
}
