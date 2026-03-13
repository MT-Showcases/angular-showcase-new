import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PatternCard } from '../../pattern-explorer.models';

@Component({
  selector: 'app-depth-modal',
  templateUrl: './depth-modal.html',
  styleUrl: './depth-modal.scss',
})
export class DepthModal {
  @Input({ required: true }) isOpen = false;
  @Input() pattern: PatternCard | null = null;

  @Output() closeModal = new EventEmitter<void>();
  @Output() openDepthPanel = new EventEmitter<void>();

  onBackdropClick(): void {
    this.closeModal.emit();
  }

  onContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }
}
