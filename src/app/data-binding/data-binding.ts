/**
 * PATTERN: Angular Data Binding (Three-Way Communication)
 *
 * WHY: Il data binding è il meccanismo fondamentale con cui Angular sincronizza
 *      lo stato del componente con il DOM. Senza di esso dovresti manipolare
 *      manualmente il DOM (document.getElementById, innerHTML, ecc.) come in
 *      vanilla JS — codice fragile, difficile da testare e mantenere.
 *
 * QUANDO USARLO:
 *   - Interpolazione {{ }}: per mostrare testo/valori nel template (one-way: TS → DOM)
 *   - Property Binding [ ]: per legare attributi HTML a valori del componente (one-way: TS → DOM)
 *   - Event Binding ( ): per reagire a eventi utente (one-way: DOM → TS)
 *   - Two-way [(ngModel)]: quando vuoi che il valore del DOM aggiorni anche il componente
 *
 * ALTERNATIVA:
 *   - Signals (Angular 17+): il nuovo sistema reattivo, più granulare e performante
 *   - Per form complessi usa Reactive Forms invece del two-way binding
 *
 * ANTI-PATTERN:
 *   - Non usare interpolazione per attributi HTML: <img src="{{ url }}">
 *     → usa sempre [src]="url" (property binding) per gli attributi — evita flash di contenuto
 *   - Non chiamare metodi con side-effects nell'interpolazione {{ doSomething() }}
 *     → viene chiamato ad ogni change detection cycle (può esplodere in performance)
 *   - Evitare la manipolazione diretta del DOM (document.querySelector, nativeElement.style)
 *     → rende il componente non testabile e non SSR-compatibile
 */

// COMPONENT TYPE: Container
// SECTION: Angular Basics
//
// ROLE:
// - Demonstrate core Angular data binding concepts
// - Show interpolation, property binding, and event binding
// - Provide interactive examples for each binding type
//
// PATTERNS USED:
// - Standalone component architecture
// - Educational organization with clear examples
// - Direct state manipulation (no services needed for basic demo)
//
// NOTES FOR CONTRIBUTORS:
// - Keep examples simple and focused on binding concepts
// - Add comments explaining Angular vs React equivalents for learning
// - Use clear section markers for different binding types
// - Maintain Italian for user-facing content

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PageHeader } from '../page-header/page-header';

@Component({
  selector: 'app-data-binding',
  imports: [CommonModule, PageHeader],
  templateUrl: './data-binding.html',
  styleUrl: './data-binding.scss',
})
export class DataBinding {
  // Simple property - used with interpolation {{ text }}
  // WHY: le proprietà pubbliche sono direttamente accessibili dal template Angular
  // ANTI-PATTERN: non dichiarare proprietà come private se le usi nel template
  text = 'testo statico da variabile';

  // Mutable property - modified by events
  // In React: const [imgLogo, setImgLogo] = useState('/logo.png')
  // In Angular non serve un setter esplicito: assegni direttamente e Angular rileva il cambiamento
  imgLogo = '/logo.png';

  // Simple method - called in template: {{ getText() }}
  // ATTENZIONE: i metodi nel template vengono chiamati ad ogni change detection cycle.
  // Per logica costosa preferisci un getter (calcolato una volta) o un pipe.
  getText() {
    return 'testo da getText()';
  }

  // Method with parameters - example: {{ getDynamicText('test') }}
  getDynamicText(text: string) {
    return 'dynamic text: ' + text;
  }

  // Method with multiple parameters - example: {{ sum(2, 3) }}
  // ALTERNATIVA: per calcoli puri considera un pipe custom (es. | sum)
  sum(a: number, b: number) {
    return a + b;
  }

  trackByUserId(_: number, user: any) {
    return user.id;
  }

  // GETTER: fornisce imgLogo come proprietà derivata
  // WHY: i getter sono calcolati solo quando viene letto il valore (lazy)
  //      e sono più efficienti di un metodo se il valore non cambia spesso
  // QUANDO USARLO: logica di presentazione semplice, senza side-effects
  get imgLogoSrc() {
    return this.imgLogo;
  }

  // SETTER: intercetta l'assegnazione di imgLogoSrc per aggiungere logica
  // In React getters/setters non esistono: si usa useState con una funzione updater
  set imgLogoSrc(value: string) {
    this.imgLogo = value;
  }

  // EVENT HANDLER: risponde al click e muta lo stato del componente
  // Angular: (click)="onClick()" — esplicito, leggibile, separato dal template
  // React:   onClick={onClick}   — passato come prop, funzione di riferimento
  // WHY: separare la logica (TS) dalla presentazione (HTML) è il principio MVC
  onClick() {
    this.imgLogo = '/path-inesistente.png';
  }

  onReset() {
    this.imgLogo = '/logo.png';
  }
}
