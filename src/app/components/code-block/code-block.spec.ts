import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { CodeBlock } from './code-block';

describe('CodeBlock', () => {
  let component: CodeBlock;
  let fixture: ComponentFixture<CodeBlock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeBlock],
    }).compileComponents();

    fixture = TestBed.createComponent(CodeBlock);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should highlight TypeScript code', () => {
    component.code = 'const message = "Hello";';
    component.language = 'typescript';
    fixture.detectChanges();

    expect(component.highlightedCode).toBeTruthy();
  });

  it('should copy code to clipboard', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText },
      configurable: true,
    });

    component.code = 'test code';
    component.copyCode();
    await Promise.resolve();

    expect(writeText).toHaveBeenCalledWith('test code');
    expect(component.copied()).toBe(true);
  });
});
