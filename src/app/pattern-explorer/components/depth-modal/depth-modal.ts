import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { PatternCard } from '../../pattern-explorer.models';

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-depth-modal',
  templateUrl: './depth-modal.html',
  styleUrl: './depth-modal.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
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
