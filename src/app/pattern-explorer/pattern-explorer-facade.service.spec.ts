import { TestBed } from '@angular/core/testing';

import { PatternExplorerFacadeService } from './pattern-explorer-facade.service';

describe('PatternExplorerFacadeService', () => {
  let service: PatternExplorerFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatternExplorerFacadeService);
  });

  it('should provide the expected educational pattern cards', () => {
    const cards = service.getPatternCards();

    expect(cards.length).toBe(10);
    expect(cards.map((card) => card.id)).toEqual([
      'container-presentational',
      'facade-service',
      'signals-local-state',
      'smart-dumb-io',
      'http-loading-state',
      'ngrx-store-pattern',
      'onpush-change-detection',
      'di-advanced',
      'rxjs-operators',
      'signal-forms',
    ]);
  });

  it('should expose cards with checklist and anti-pattern guidance', () => {
    const cards = service.getPatternCards();

    for (const card of cards) {
      expect(card.title.length).toBeGreaterThan(0);
      expect(card.checklist.length).toBeGreaterThan(0);
      expect(card.antiPatterns.length).toBeGreaterThan(0);
    }
  });
});
