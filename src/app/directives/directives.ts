/**
 * PATTERN: Angular Structural & Attribute Directives
 *
 * WHY: Le direttive sono il modo in cui Angular estende l'HTML con comportamenti
 *      dichiarativi. Invece di manipolare il DOM con JavaScript imperativo
 *      (if/for/addClass nel codice), dichiari nel template COSA mostrare
 *      e Angular si occupa del COME.
 *
 * TIPI DI DIRETTIVE:
 *   - Strutturali (*ngIf, *ngFor, *ngSwitch): modificano la struttura del DOM
 *     (aggiungono/rimuovono elementi). In Angular 17+ si preferisce @if/@for/@switch.
 *   - Attributo ([ngClass], [ngStyle]): modificano l'aspetto o comportamento
 *     di un elemento esistente senza cambiare la struttura DOM.
 *   - Componenti: sono direttive con un template (il caso più comune).
 *
 * QUANDO USARLO:
 *   - *ngIf / @if: per mostrare/nascondere elementi in base a condizioni
 *   - *ngFor / @for: per renderizzare liste di elementi
 *   - [ngClass]: per applicare classi CSS in modo condizionale
 *   - [ngStyle]: per applicare stili inline dinamici (preferisci [ngClass] quando possibile)
 *
 * ALTERNATIVA (Angular 17+):
 *   - @if, @for, @switch: nuova sintassi di control flow nativa nel template.
 *     Più leggibile, non richiede l'import di CommonModule, migliori performance.
 *   - Questo componente mostra la sintassi legacy (*ngIf, *ngFor) per comparazione.
 *     In nuovi progetti, usa la sintassi moderna @if / @for.
 *
 * ANTI-PATTERN:
 *   - Usare *ngFor senza trackBy su liste dinamiche (performance degradate)
 *   - Usare [ngStyle] per stili statici (usa classi CSS)
 *   - Combinare *ngIf e *ngFor sullo stesso elemento (usa <ng-container>)
 */

// COMPONENT TYPE: Container
// SECTION: Angular Basics
//
// ROLE:
// - Demonstrate Angular structural and attribute directives
// - Show *ngIf, *ngFor, [ngClass], [ngStyle] (legacy syntax for learning)
// - Compare with modern @if / @for syntax (Angular 17+)
//
// PATTERNS USED:
// - Standalone component with CommonModule for legacy directives
// - Educational examples with React equivalents for comparison
// - Simple state management with component properties
//
// NOTES FOR CONTRIBUTORS:
// - Include both legacy (*ngIf) and modern (@if) examples when possible
// - Keep examples simple and interactive
// - Include React equivalents in comments for cross-framework learning
// - Use Italian for user-facing descriptions

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageHeader } from '../page-header/page-header';

@Component({
  selector: 'app-directives',
  imports: [CommonModule, PageHeader],
  templateUrl: './directives.html',
  styleUrl: './directives.scss',
})
export class Directives {
  // Proprietà booleane per le direttive condizionali
  // WHY: le direttive strutturali reagiscono a valori truthy/falsy
  showMessage = true;
  isLoggedIn = false;

  // Array per *ngFor — in una app reale questo verrebbe da un Service/Store
  // ANTI-PATTERN: non creare array direttamente nel template con [1,2,3]
  items = ['Mela', 'Banana', 'Arancia'];

  // Proprietà per [ngClass] — una classe viene applicata condizionalmente
  isActive = false;

  // Proprietà per [ngStyle] — lo stile viene modificato dinamicamente
  // NOTA: preferisci [ngClass] a [ngStyle] quando possibile:
  // - ngClass è più manutenibile (CSS separato)
  // - ngStyle genera stili inline (priorità alta, difficili da sovrascrivere)
  textColor = '#000000';

  toggleMessage() {
    this.showMessage = !this.showMessage;
  }

  toggleLogin() {
    this.isLoggedIn = !this.isLoggedIn;
  }

  toggleActive() {
    this.isActive = !this.isActive;
  }

  changeColor(color: string) {
    this.textColor = color;
  }
}
