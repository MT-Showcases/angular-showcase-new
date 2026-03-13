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

  it('should render initial selection and change state when a pattern card is clicked', () => {
    const host: HTMLElement = fixture.nativeElement;

    // The component uses <p class="pattern-explorer__breadcrumb"> for breadcrumb/summary
    const breadcrumbBefore = host.querySelector('.pattern-explorer__breadcrumb')?.textContent;
    expect(breadcrumbBefore).toContain('Panoramica');

    // The first pattern is 'Container + Presentational Split'
    const activePatternTitle = host.querySelector('.pattern-detail__title')?.textContent;
    expect(activePatternTitle).toContain('Container + Presentational Split');

    const cards = host.querySelectorAll<HTMLButtonElement>('.pattern-list__card');
    expect(cards.length).toBeGreaterThan(1);

    // Click on the second card (Facade Service Boundary)
    cards[1].click();
    fixture.detectChanges();

    expect(component.selectedPatternId()).toBe('facade-service');

    // When a pattern is selected, it switches to the 'Approfondimento' tab
    const breadcrumbAfter = host.querySelector('.pattern-explorer__breadcrumb')?.textContent;
    expect(breadcrumbAfter).toContain('Approfondimento');

    const detailedTitle = host.querySelector('.pattern-detail__title')?.textContent;
    expect(detailedTitle).toContain('Facade Service Boundary');

    const activeCard = host.querySelector('.pattern-list__card--active');
    expect(activeCard?.textContent).toContain('Facade Service Boundary');
  });
});
