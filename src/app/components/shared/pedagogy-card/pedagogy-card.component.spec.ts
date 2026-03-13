import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PedagogyCardComponent } from './pedagogy-card.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PedagogyCardComponent', () => {
  let fixture: ComponentFixture<PedagogyCardComponent>;
  let component: PedagogyCardComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PedagogyCardComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(PedagogyCardComponent);
    component = fixture.componentInstance;
    component.title = 'Test Title';
    fixture.detectChanges();
  });

  it('should render the title', () => {
    const titleEl = fixture.debugElement.query(By.css('mat-card-title'));
    expect(titleEl.nativeElement.textContent.trim()).toBe('Test Title');
  });

  it('should apply the correct variant class', () => {
    component.variant = 'warning';
    fixture.detectChanges();
    const card = fixture.debugElement.query(By.css('mat-card'));
    expect(card.nativeElement.classList).toContain('pedagogy-card--warning');
  });

  it('should render mat-icon when icon input is provided', () => {
    component.icon = 'info';
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('mat-icon'));
    expect(icon).toBeTruthy();
    expect(icon.nativeElement.textContent.trim()).toBe('info');
  });

  it('should NOT render mat-icon when icon is not provided', () => {
    component.icon = undefined;
    fixture.detectChanges();
    const icon = fixture.debugElement.query(By.css('mat-icon'));
    expect(icon).toBeNull();
  });
});
