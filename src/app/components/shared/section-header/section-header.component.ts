import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * SectionHeaderComponent
 *
 * PATTERN: Presentational Component
 * WHY: Risolve il problema degli h1 non uniformi tra le pagine.
 *      Prima ogni pagina aveva la propria implementazione di intestazione
 *      con CSS inconsistente. Ora un unico componente garantisce coerenza
 *      tipografica e strutturale in tutto il progetto.
 *
 * QUANDO: All'inizio di ogni "sezione" di pagina che ha un titolo principale.
 *         Usa subtitle per la descrizione breve, breadcrumb per la navigazione.
 *         Sostituisce tutti gli h1/h2 standalone con CSS custom nelle pagine.
 *
 * ALTERNATIVA: Per header con azioni (bottoni, menu), estendi questo componente
 *              con ng-content projection per la "action area" invece di aggiungere
 *              @Input di tipo EventEmitter (viola la separazione presentational).
 *
 * ANTI-PATTERN: Non usare MatToolbar qui — MatToolbar è semanticamente
 *               per navigation bars fisse, non per content headers.
 *               Un div con Material typography è la scelta corretta.
 */
@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="section-header">
      <!-- Breadcrumb opzionale per contesto di navigazione -->
      @if (breadcrumb !== '') {
        <nav class="section-header__breadcrumb" aria-label="breadcrumb">
          <span class="mat-body-2">{{ breadcrumb }}</span>
        </nav>
      }

      <!--
        WHY h1 semantico: un solo h1 per pagina è best practice SEO e
        accessibilità. Questo componente va usato UNA SOLA VOLTA per pagina.
        Per sezioni secondarie usa SectionHeaderComponent con variant futuro
        o direttamente h2/h3 con classe mat-headline-*.
      -->
      <h1 class="section-header__title mat-headline-4">{{ title }}</h1>

      @if (subtitle !== '') {
        <p class="section-header__subtitle mat-body-1">{{ subtitle }}</p>
      }

      <!-- Slot per contenuto aggiuntivo (es: badge, chips, status) -->
      <ng-content />
    </header>
  `,
  styleUrl: './section-header.component.scss',
})
export class SectionHeaderComponent {
  /** Titolo principale della sezione — corrisponde semanticamente a h1 */
  @Input({ required: true }) title: string = '';

  /**
   * Sottotitolo descrittivo opzionale.
   * WHY optional: non tutte le sezioni richiedono descrizione aggiuntiva.
   */
  @Input() subtitle: string = '';

  /**
   * Testo breadcrumb opzionale (es: "Home > Pattern > Singleton").
   * WHY stringa semplice invece di oggetto: per casi avanzati con link
   * attivi, usa un componente BreadcrumbComponent dedicato e proiettalo
   * via ng-content invece di aggiungere complessità qui.
   */
  @Input() breadcrumb: string = '';
}
