import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AntipatternBoxComponent } from './antipattern-box.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('AntipatternBoxComponent', () => {
  let fixture: ComponentFixture<AntipatternBoxComponent>;
  let component: AntipatternBoxComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AntipatternBoxComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AntipatternBoxComponent);
    component = fixture.componentInstance;
    component.title = 'Anti-Pattern Test';
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const titleEl = fixture.debugElement.query(By.css('mat-card-title'));
    expect(titleEl.nativeElement.textContent.trim()).toBe('Anti-Pattern Test');
  });

  it('should render all items in the list', () => {
    fixture.componentRef.setInput('title', 'Test');
    fixture.componentRef.setInput('items', ['Bad practice A', 'Bad practice B']);
    fixture.detectChanges();
    const items = fixture.debugElement.queryAll(By.css('.antipattern-box__item'));
    expect(items.length).toBe(2);
  });

  it('should show description subtitle when provided', () => {
    fixture.componentRef.setInput('title', 'Test');
    fixture.componentRef.setInput('description', 'Evita questi approcci');
    fixture.detectChanges();
    const subtitle = fixture.debugElement.query(By.css('mat-card-subtitle'));
    expect(subtitle.nativeElement.textContent.trim()).toBe('Evita questi approcci');
  });

  it('should NOT render list when items is empty', () => {
    fixture.componentRef.setInput('items', []);
    fixture.detectChanges();
    const list = fixture.debugElement.query(By.css('.antipattern-box__list'));
    expect(list).toBeNull();
  });
});
