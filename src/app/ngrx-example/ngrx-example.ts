/**
 * PATTERN: NgRx — Redux State Management per Angular
 *
 * WHY: NgRx implementa il pattern Redux in Angular: stato immutabile centralizzato,
 *   flusso unidirezionale (Action → Reducer → Store → Selector → Component),
 *   e Effects per i side effects. Tutto è tracciabile, testabile e debuggabile
 *   con Redux DevTools (time-travel debugging).
 *
 * QUANDO USARLO:
 *   - App enterprise con stato complesso condiviso tra molte feature
 *   - Quando hai bisogno di time-travel debugging (Redux DevTools)
 *   - Team grandi che beneficiano di pattern espliciti e prevedibili
 *   - Quando BehaviorSubject diventa difficile da mantenere (troppe dipendenze)
 *
 * ALTERNATIVA:
 *   - BehaviorSubject in service → per app medie, stato condiviso semplice
 *   - Signals + service → per Angular 17+, stato locale/semi-globale
 *   - NGXS o Elf → alternative NgRx più leggere (meno boilerplate)
 *
 * ANTI-PATTERN:
 *   - ❌ Mettere tutto lo stato locale (es. isOpen, inputValue) nel NgRx store
 *     → usa Signals/variabili locali per stato che non serve condividere
 *   - ❌ Fare chiamate HTTP direttamente nel reducer → usa NgRx Effects
 *   - ❌ Mutare lo stato nel reducer → sempre spread operator o immer
 *   - ❌ Usare NgRx per app piccole → overhead di boilerplate non giustificato
 */

// COMPONENT TYPE: Container
// SECTION: State Management - NgRx

import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeader } from '../page-header/page-header';
import { NgrxConcepts } from './ngrx-concepts/ngrx-concepts';
import { NgrxCounterDemo } from './ngrx-counter-demo/ngrx-counter-demo';
import { NgrxTodoDemo } from './ngrx-todo-demo/ngrx-todo-demo';

@Component({
  selector: 'app-ngrx-example',
  standalone: true,
  imports: [CommonModule, PageHeader, NgrxConcepts, NgrxCounterDemo, NgrxTodoDemo],
  templateUrl: './ngrx-example.html',
  styleUrls: ['./ngrx-example.scss'],
})
export class NgrxExample {
  selectedTab = signal<'counter' | 'todos' | 'concepts'>('concepts');
}
