// COMPONENT TYPE: Presentational
// SECTION: Pattern Explorer
//
// ROLE:
// - Render Pattern Explorer cards and details for the currently selected item
// - Emit semantic selection events to the container
// - Keep all business/state orchestration outside the component
//
// PATTERNS USED:
// - Container/Presentational split
// - @Input/@Output data flow
//
// NOTES FOR CONTRIBUTORS:
// - Keep this component UI-focused and stateless
// - Add fields to PatternCard model before introducing new rendered properties

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { PatternCard } from '../../pattern-explorer.models';
import { Icon } from '../../../components/icon/icon';

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-pattern-list',
  imports: [Icon],
  templateUrl: './pattern-list.html',
  styleUrl: './pattern-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatternList {
  @Input({ required: true }) patterns: PatternCard[] = [];
  @Input({ required: true }) selectedPatternId = '';

  // UX NOTE:
  // We keep disclosure mode configurable so mobile can use inline-accordion expansion,
  // while desktop can pair the same list with a dedicated right-side detail panel.
  @Input() showInlineDetail = false;

  @Output() selectPattern = new EventEmitter<string>();
  @Output() closePattern = new EventEmitter<void>();

  onSelectPattern(patternId: string): void {
    this.selectPattern.emit(patternId);
  }

  onCardKeydown(event: KeyboardEvent, patternId: string): void {
    // Accessibility:
    // - Enter/Space on buttons already trigger click natively in browsers.
    // - Escape is *not* native for buttons, so we handle it to close disclosure quickly.
    if (event.key === 'Escape' && this.selectedPatternId === patternId) {
      event.preventDefault();
      this.closePattern.emit();
    }
  }
}
