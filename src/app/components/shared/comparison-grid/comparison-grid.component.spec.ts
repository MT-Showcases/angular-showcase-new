import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ComparisonGridComponent } from './comparison-grid.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('ComparisonGridComponent', () => {
  let fixture: ComponentFixture<ComparisonGridComponent>;
  let component: ComparisonGridComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComparisonGridComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ComparisonGridComponent);
    component = fixture.componentInstance;
    component.leftTitle = 'Pattern';
    component.rightTitle = 'Anti-Pattern';
    fixture.detectChanges();
  });

  it('should render left and right titles', () => {
    const titles = fixture.debugElement.queryAll(By.css('mat-card-title'));
    expect(titles[0].nativeElement.textContent.trim()).toBe('Pattern');
    expect(titles[1].nativeElement.textContent.trim()).toBe('Anti-Pattern');
  });

  it('should render correct number of items in each column', () => {
    fixture.componentRef.setInput('leftTitle', 'Title L');
    fixture.componentRef.setInput('rightTitle', 'Title R');
    fixture.componentRef.setInput('leftItems', ['Item L1', 'Item L2']);
    fixture.componentRef.setInput('rightItems', ['Item R1']);
    fixture.detectChanges();

    const cards = fixture.debugElement.queryAll(By.css('mat-card'));
    const leftItems = cards[0].queryAll(By.css('.comparison-grid__item'));
    const rightItems = cards[1].queryAll(By.css('.comparison-grid__item'));

    expect(leftItems.length).toBe(2);
    expect(rightItems.length).toBe(1);
  });

  it('should render grid container with two cards', () => {
    const grid = fixture.debugElement.query(By.css('.comparison-grid'));
    const cards = grid.queryAll(By.css('mat-card'));
    expect(cards.length).toBe(2);
  });
});
