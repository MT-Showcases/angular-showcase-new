import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GuideStep } from './guide-step';

describe('GuideStep', () => {
  let component: GuideStep;
  let fixture: ComponentFixture<GuideStep>;

  const createComponent = () => {
    fixture = TestBed.createComponent(GuideStep);
    component = fixture.componentInstance;
    component.stepNumber = 1;
    component.title = 'Test Step';
    component.explanation = 'Test explanation';
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuideStep],
    }).compileComponents();
  });

  it('should create', () => {
    createComponent();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should display step number, title, and explanation', () => {
    createComponent();
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.guide-step__number')?.textContent).toContain('1');
    expect(compiled.querySelector('.guide-step__title')?.textContent).toContain('Test Step');
    expect(compiled.querySelector('.guide-step__explanation')?.textContent).toContain('Test explanation');
  });

  it('should display code example when provided', () => {
    createComponent();
    component.codeExample = {
      title: 'File: test.ts',
      code: 'const test = "example";',
    };
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.guide-step__example-block')).toBeTruthy();
    expect(compiled.querySelector('.guide-step__example-title')?.textContent).toContain('File: test.ts');
    expect(compiled.querySelector('app-code-block')).toBeTruthy();
  });

  it('should not display code example when not provided', () => {
    createComponent();
    component.codeExample = undefined;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.guide-step__example-block')).toBeFalsy();
  });

  it('should display explanation box when provided', () => {
    createComponent();
    component.codeExample = {
      title: 'File: test.ts',
      code: 'const test = "example";',
    };
    component.explanationBox = {
      title: 'What are we doing?',
      points: ['Point 1', 'Point 2'],
    };
    fixture.detectChanges();

    const explanationBox = fixture.nativeElement.querySelector('.guide-step__explanation-box');
    expect(explanationBox).toBeTruthy();
    expect(explanationBox.querySelector('strong')?.textContent).toContain('What are we doing?');

    const listItems = explanationBox.querySelectorAll('li');
    expect(listItems.length).toBe(2);
    expect(listItems[0].textContent).toContain('Point 1');
  });

  it('should display description in code example when provided', () => {
    createComponent();
    component.codeExample = {
      title: 'File: test.ts',
      code: 'const test = "example";',
      description: 'This is a test description',
    };
    fixture.detectChanges();

    const description = fixture.nativeElement.querySelector('.guide-step__example-description');
    expect(description).toBeTruthy();
    expect(description.textContent).toContain('This is a test description');
  });
});
