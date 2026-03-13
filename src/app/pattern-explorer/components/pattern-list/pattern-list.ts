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

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PatternCard } from '../../pattern-explorer.models';
import { Icon } from '../../../components/icon/icon';

@Component({
  selector: 'app-pattern-list',
  imports: [Icon],
  templateUrl: './pattern-list.html',
  styleUrl: './pattern-list.scss',
})
export class PatternList {
  @Input({ required: true }) patterns: PatternCard[] = [];
  @Input({ required: true }) selectedPatternId = '';

  @Output() selectPattern = new EventEmitter<string>();

  onSelectPattern(patternId: string): void {
    this.selectPattern.emit(patternId);
  }
}
