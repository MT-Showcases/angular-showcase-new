import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 * PedagogyCardComponent
 *
 * PATTERN: Presentational (Dumb) Component
 * WHY: Separa la presentazione dalla logica business. Questo componente
 *      non sa nulla del dominio — riceve dati e li mostra, tutto qui.
 *      Riusabile in qualsiasi contesto senza dipendenze esterne.
 *
 * QUANDO: Ogni volta che devi mostrare un concetto pedagogico con
 *         contesto visivo (info, success, warning). Sostituisce i div
 *         .pedagogy-box duplicati in tutto il progetto.
 *
 * ALTERNATIVA: Se hai bisogno di logica (fetch dati, eventi), crea
 *              un Container Component che wrappa questo.
 *
 * ANTI-PATTERN: Non aggiungere mai logica business qui. Niente servizi,
 *               niente HTTP, niente state management. Solo @Input e ng-content.
 */
@Component({
  selector: 'app-pedagogy-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card [class]="'pedagogy-card pedagogy-card--' + variant">
      <mat-card-header>
        @if (icon !== '') {
          <mat-icon mat-card-avatar [class]="'pedagogy-card__icon pedagogy-card__icon--' + variant">
            {{ icon }}
          </mat-icon>
        }
        <mat-card-title>{{ title }}</mat-card-title>
      </mat-card-header>
      <mat-card-content>
        <!-- ng-content permette al parent di proiettare HTML arbitrario -->
        <!-- WHY ng-content: massima flessibilità senza prop drilling -->
        <ng-content />
      </mat-card-content>
    </mat-card>
  `,
  styleUrl: './pedagogy-card.component.scss',
})
export class PedagogyCardComponent {
  /** Titolo della card pedagogica */
  @Input({ required: true }) title: string = '';

  /**
   * Icona Material (nome stringa, es: 'info', 'lightbulb', 'warning')
   * WHY optional: non tutti i contesti richiedono un'icona visiva.
   */
  @Input() icon: string = '';

  /**
   * Variante visiva della card.
   * WHY union type invece di string: type safety a compile time,
   * impossibile passare valori non previsti.
   */
  @Input() variant: 'info' | 'success' | 'warning' = 'info';
}
