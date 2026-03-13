// COMPONENT TYPE: Presentational Lab
// SECTION: Pattern Explorer
//
// ROLE:
// - Train contributors to spot facade anti-patterns and choose better boundaries
// - Provide instant correctness feedback with local signal state
// - Reinforce semantic API design for component consumption

import { Component, computed, signal } from '@angular/core';

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
export class FacadeAntiPatternFixerLab {
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

  get antiPatternScenarios(): FacadeScenario[] {
    return this.scenarios;
  }

  chooseFix(scenarioId: string, option: string): void {
    this.selectedFixes.update((current) => ({
      ...current,
      [scenarioId]: option,
    }));
  }

  isCorrectSelection(scenario: FacadeScenario): boolean {
    return this.selectedFixes()[scenario.id] === scenario.correctFix;
  }

  reset(): void {
    this.selectedFixes.set({
      'raw-http': null,
      'selector-leak': null,
      'verb-naming': null,
    });
  }
}
