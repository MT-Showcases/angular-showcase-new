import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatternExplorer } from './pattern-explorer';

describe('PatternExplorer integration flow', () => {
  let fixture: ComponentFixture<PatternExplorer>;
  let component: PatternExplorer;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatternExplorer],
    }).compileComponents();

    fixture = TestBed.createComponent(PatternExplorer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render initial selection and open depth modal when a pattern card is clicked', () => {
    const host: HTMLElement = fixture.nativeElement;

    const selectionSummaryBefore = host.querySelector('.pattern-explorer__selection-summary')?.textContent;
    expect(selectionSummaryBefore).toContain('Container + Presentational Split');

    const cards = host.querySelectorAll<HTMLButtonElement>('.pattern-list__card');
    expect(cards.length).toBeGreaterThan(1);

    cards[1].click();
    fixture.detectChanges();

    expect(component.selectedPatternId()).toBe('facade-service');
    expect(component.isDepthModalOpen()).toBeTrue();

    const modalTitle = host.querySelector('.depth-modal__title')?.textContent;
    expect(modalTitle).toContain('Facade Service Boundary');

    const selectionSummaryAfter = host.querySelector('.pattern-explorer__selection-summary')?.textContent;
    expect(selectionSummaryAfter).toContain('Facade Service Boundary');

    const activeCard = host.querySelector('.pattern-list__card--active');
    expect(activeCard?.textContent).toContain('Facade Service Boundary');
  });
});
