import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PatternCard } from '../../pattern-explorer.models';

@Component({
  selector: 'app-depth-side-panel',
  templateUrl: './depth-side-panel.html',
  styleUrl: './depth-side-panel.scss',
})
export class DepthSidePanel {
  @Input({ required: true }) isOpen = false;
  @Input() pattern: PatternCard | null = null;

  @Output() closePanel = new EventEmitter<void>();
}
