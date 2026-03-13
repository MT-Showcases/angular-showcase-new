import { Component, ElementRef, HostListener, input, model, output, signal, viewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface SearchResult {
  id: string;
  title: string;
  category: string;
}

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="search-bar" role="search">
      <label [for]="id()" class="sr-only">{{ label() }}</label>
      <input
        #searchInput
        [id]="id()"
        type="text"
        [placeholder]="placeholder()"
        [value]="query()"
        (input)="onInput($event)"
        (keydown)="onKeyDown($event)"
        class="search-bar__input"
        aria-autocomplete="list"
        [attr.aria-label]="label()"
        aria-haspopup="listbox"
      />
      
      @if (showResults() && results().length > 0) {
        <ul
          class="search-bar__results"
          role="listbox"
          [id]="id() + '-results'"
          aria-label="Search results"
        >
          @for (result of results(); track result.id; let i = $index) {
            <li
              role="option"
              [attr.aria-selected]="activeIndex() === i"
              [class.search-bar__result--active]="activeIndex() === i"
              (click)="selectResult(result)"
              (mouseenter)="activeIndex.set(i)"
              class="search-bar__result"
            >
              <span class="search-bar__result-title">{{ result.title }}</span>
              <span class="search-bar__result-category">{{ result.category }}</span>
            </li>
          }
        </ul>
      }
      
      <div class="sr-only" aria-live="polite">
        {{ results().length }} results found.
      </div>
    </div>
  `,
  styles: [`
    .search-bar {
      position: relative;
      width: 100%;
      max-width: 600px;
      margin: 1rem 0;
    }

    .search-bar__input {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 1rem;
      border: 2px solid var(--border-color, #ccc);
      border-radius: 8px;
      background: var(--bg-card, #fff);
      color: var(--text-main, #333);
      transition: border-color 0.2s;

      &:focus {
        outline: none;
        border-color: var(--primary-color, #007bff);
        box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
      }
    }

    .search-bar__results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      z-index: 10;
      background: var(--bg-card, #fff);
      border: 1px solid var(--border-color, #ccc);
      border-radius: 0 0 8px 8px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      margin: 0;
      padding: 0;
      list-style: none;
      max-height: 300px;
      overflow-y: auto;
    }

    .search-bar__result {
      padding: 0.75rem 1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid var(--border-color-light, #eee);

      &:last-child {
        border-bottom: none;
      }

      &.search-bar__result--active {
        background-color: var(--primary-color-light, #f0f7ff);
        outline: 2px solid var(--primary-color, #007bff);
        outline-offset: -2px;
      }
    }

    .search-bar__result-title {
      font-weight: 500;
    }

    .search-bar__result-category {
      font-size: 0.85rem;
      opacity: 0.7;
    }

    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border-width: 0;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBar {
  id = input('search-input');
  label = input('Search learning patterns');
  placeholder = input('Search by title, category, or level...');
  results = input<SearchResult[]>([]);
  
  query = model('');
  
  resultSelected = output<SearchResult>();
  
  showResults = signal(false);
  activeIndex = signal(-1);
  
  inputElement = viewChild<ElementRef<HTMLInputElement>>('searchInput');

  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.query.set(value);
    this.showResults.set(true);
    this.activeIndex.set(-1);
  }

  onKeyDown(event: KeyboardEvent): void {
    const results = this.results();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.showResults.set(true);
        this.activeIndex.update(idx => (idx + 1) % results.length);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.activeIndex.update(idx => (idx - 1 + results.length) % results.length);
        break;
      case 'Enter':
        if (this.activeIndex() >= 0 && this.activeIndex() < results.length) {
          event.preventDefault();
          this.selectResult(results[this.activeIndex()]);
        }
        break;
      case 'Escape':
        this.showResults.set(false);
        this.activeIndex.set(-1);
        break;
      case 'Tab':
        this.showResults.set(false);
        break;
    }
  }

  selectResult(result: SearchResult): void {
    this.resultSelected.emit(result);
    this.query.set('');
    this.showResults.set(false);
    this.activeIndex.set(-1);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (!this.inputElement()?.nativeElement.contains(event.target as Node)) {
      this.showResults.set(false);
    }
  }
}
