import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SectionHeaderComponent } from './section-header.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('SectionHeaderComponent', () => {
  let fixture: ComponentFixture<SectionHeaderComponent>;
  let component: SectionHeaderComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionHeaderComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(SectionHeaderComponent);
    component = fixture.componentInstance;
    component.title = 'Main Section Title';
    fixture.detectChanges();
  });

  it('should render the title in an h1 element', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.textContent.trim()).toBe('Main Section Title');
  });

  it('should render subtitle when provided', () => {
    fixture.componentRef.setInput('title', 'Test');
    fixture.componentRef.setInput('subtitle', 'A descriptive subtitle');
    fixture.detectChanges();
    const subtitle = fixture.debugElement.query(By.css('.section-header__subtitle'));
    expect(subtitle.nativeElement.textContent.trim()).toBe('A descriptive subtitle');
  });

  it('should render breadcrumb when provided', () => {
    fixture.componentRef.setInput('title', 'Test');
    fixture.componentRef.setInput('breadcrumb', 'Home > Patterns');
    fixture.detectChanges();
    const breadcrumb = fixture.debugElement.query(By.css('.section-header__breadcrumb'));
    expect(breadcrumb.nativeElement.textContent.trim()).toBe('Home > Patterns');
  });

  it('should NOT render subtitle element when subtitle is not provided', () => {
    fixture.componentRef.setInput('subtitle', '');
    fixture.detectChanges();
    const subtitle = fixture.debugElement.query(By.css('.section-header__subtitle'));
    expect(subtitle).toBeNull();
  });
});
