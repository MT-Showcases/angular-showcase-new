// COMPONENT TYPE: Container
// SECTION: State Management - NgRx
//
// ROLE:
// - Demonstrate NgRx state management patterns
// - Organize multiple NgRx examples with tab navigation
// - Show concepts, counter demo, and todo demo
//
// PATTERNS USED:
// - Standalone component architecture
// - Signal-based tab selection
// - Composition of multiple demo components
//
// WHY: NgRx separates application state into a predictable store accessible globally.
// QUANDO USARLO: Complex data flows, extensive sharing of state across deeply nested components.
// ALTERNATIVA: BehaviorSubject/Signals for simpler apps or isolated state.
//
// ANTI-PATTERN: Putting all component local state in the global NgRx store.
//
// NOTES FOR CONTRIBUTORS:
// - Keep this component as a coordinator only
// - Complex NgRx logic lives in child components
// - Add new demos as separate components and import here
// - Maintain consistent tab structure for navigation

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
