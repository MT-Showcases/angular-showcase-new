import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

/**
 * ComparisonGridComponent
 *
 * PATTERN: Presentational Component
 * WHY: Visualizzazione affiancata "buono vs cattivo" / "prima vs dopo".
 *      Pattern ricorrente nella documentazione didattica — centralizzarlo
 *      garantisce consistenza e riduce CSS duplicato.
 *
 * QUANDO: Confronti tra due approcci (es: Observable vs Promise,
 *         OnPush vs Default, Pattern A vs Pattern B).
 *         Ideale per pagine di spiegazione pattern GoF.
 *
 * ALTERNATIVA: Per confronti più complessi con codice, usa una tab group
 *              (MatTabsModule) invece di una griglia affiancata.
 *
 * ANTI-PATTERN: Non mettere più di 5-6 item per colonna — la leggibilità
 *               crolla. Spezza in più confronti tematici.
 */
@Component({
  selector: 'app-comparison-grid',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="comparison-grid">
      <!-- Colonna sinistra (tipicamente: approccio corretto / pattern) -->
      <mat-card class="comparison-grid__card comparison-grid__card--left">
        <mat-card-header>
          <mat-icon mat-card-avatar class="comparison-grid__icon comparison-grid__icon--left">
            check_circle
          </mat-icon>
          <mat-card-title>{{ leftTitle }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ul class="comparison-grid__list">
            @for (item of leftItems; track item) {
              <li class="comparison-grid__item comparison-grid__item--left">
                <mat-icon class="comparison-grid__item-icon">check</mat-icon>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </mat-card-content>
      </mat-card>

      <!-- Colonna destra (tipicamente: approccio scorretto / anti-pattern) -->
      <mat-card class="comparison-grid__card comparison-grid__card--right">
        <mat-card-header>
          <mat-icon mat-card-avatar class="comparison-grid__icon comparison-grid__icon--right">
            cancel
          </mat-icon>
          <mat-card-title>{{ rightTitle }}</mat-card-title>
        </mat-card-header>
        <mat-card-content>
          <ul class="comparison-grid__list">
            @for (item of rightItems; track item) {
              <li class="comparison-grid__item comparison-grid__item--right">
                <mat-icon class="comparison-grid__item-icon">close</mat-icon>
                <span>{{ item }}</span>
              </li>
            }
          </ul>
        </mat-card-content>
      </mat-card>
    </div>
  `,
  styleUrl: './comparison-grid.component.scss',
})
export class ComparisonGridComponent {
  /** Titolo colonna sinistra (es: "✅ Pattern corretto") */
  @Input({ required: true }) leftTitle: string = '';

  /** Titolo colonna destra (es: "❌ Anti-pattern") */
  @Input({ required: true }) rightTitle: string = '';

  /**
   * Item colonna sinistra.
   * WHY array separati: ogni colonna è indipendente e può avere
   * lunghezze diverse — niente padding artificiale con stringhe vuote.
   */
  @Input() leftItems: string[] = [];

  /** Item colonna destra */
  @Input() rightItems: string[] = [];
}
