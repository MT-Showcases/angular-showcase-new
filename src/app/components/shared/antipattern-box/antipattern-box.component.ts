import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

/**
 * AntipatternBoxComponent
 *
 * PATTERN: Presentational Component
 * WHY: Centralizza la visualizzazione degli anti-pattern in tutto il progetto.
 *      Prima questa era una div con classi CSS ripetuta in ogni pagina —
 *      violazione del principio DRY e fonte di inconsistenza visiva.
 *
 * QUANDO: Usa questo componente per evidenziare approcci scorretti e
 *         spiegare perché vanno evitati. Tipicamente accompagna esempi
 *         di codice che mostrano cosa NON fare.
 *
 * ALTERNATIVA: Se vuoi mostrare SOLO un messaggio senza lista,
 *              usa PedagogyCardComponent con variant='warning'.
 *
 * ANTI-PATTERN: Non passare HTML grezzo come items — solo stringhe pure.
 *               Per contenuto ricco, usa ng-content projection.
 */
@Component({
  selector: 'app-antipattern-box',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card class="antipattern-box">
      <mat-card-header>
        <!-- WHY mat-icon 'warning': rinforzo visivo immediato del pericolo -->
        <mat-icon mat-card-avatar class="antipattern-box__icon">warning</mat-icon>
        <mat-card-title class="antipattern-box__title">{{ title }}</mat-card-title>
        @if (description) {
          <mat-card-subtitle>{{ description }}</mat-card-subtitle>
        }
      </mat-card-header>

      @if (items.length > 0) {
        <mat-card-content>
          <mat-list>
            @for (item of items; track item) {
              <mat-list-item class="antipattern-box__item">
                <mat-icon matListItemIcon class="antipattern-box__item-icon">
                  close
                </mat-icon>
                <span matListItemTitle>{{ item }}</span>
              </mat-list-item>
            }
          </mat-list>
        </mat-card-content>
      }
    </mat-card>
  `,
  styleUrl: './antipattern-box.component.scss',
})
export class AntipatternBoxComponent {
  /** Titolo dell'anti-pattern (es: "Non fare questo in OnInit") */
  @Input({ required: true }) title!: string;

  /**
   * Lista di anti-pattern specifici da evitare.
   * WHY array di string: ogni item è atomico e indipendente,
   * facilita iterazione e futura estensione (es: link, codice).
   */
  @Input() items: string[] = [];

  /** Descrizione opzionale che contestualizza il problema */
  @Input() description?: string;
}
