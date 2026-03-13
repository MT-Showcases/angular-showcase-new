/**
 * PATTERN: Angular Signals — Reactive Primitives
 *
 * WHY: Signals sono primitivi reattivi che tracciano automaticamente le dipendenze.
 *   A differenza di RxJS, non richiedono subscription/unsubscription e si integrano
 *   nativamente con il change detection di Angular (zone-less ready).
 *
 * QUANDO USARLO:
 *   - Stato locale del componente (contatori, form, UI state)
 *   - Valori derivati con computed() (es. totale carrello, filtri)
 *   - Side effects semplici con effect() (logging, localStorage, analytics)
 *   - Quando vuoi eliminare la complessità di RxJS per casi semplici
 *
 * ALTERNATIVA:
 *   - RxJS BehaviorSubject → stato condiviso tra componenti via service
 *   - RxJS Observable → stream asincroni, HTTP, WebSocket, operatori complessi
 *   - NgRx → stato globale di applicazioni enterprise con DevTools
 *
 * ANTI-PATTERN:
 *   - ❌ Modificare un signal dentro computed() → causa loop infinito
 *   - ❌ Chiamare .set()/.update() dentro effect() sullo stesso signal → loop
 *   - ❌ Usare Signals per stream asincroni (HTTP) → usa RxJS + toSignal()
 *   - ❌ Condividere stato tra componenti via Signal locale → usa service
 */

// COMPONENT TYPE: Container
// SECTION: Angular Signals

import { Component, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { SectionHeaderComponent } from '../components/shared/section-header/section-header.component';

@Component({
  selector: 'app-signals',
  imports: [SectionHeaderComponent],
  templateUrl: './signals.html',
  styleUrl: './signals.scss',
  // WHY OnPush: i Signals si integrano perfettamente con OnPush, notificando Angular esattamente quando il valore cambia.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Signals {
  // ═══════════════════════════════════════════════════════════════════
  // 1. WRITABLE SIGNAL - Signal that can be modified
  // ═══════════════════════════════════════════════════════════════════
  // Creates a signal with initial value 0
  // Signals are reactive: when the value changes, Angular automatically updates the template
  count = signal(0);

  increment() {
    // .update() receives a function that takes the current value and returns the new value
    this.count.update((value) => value + 1);
  }

  decrement() {
    this.count.update((value) => value - 1);
  }

  reset() {
    // .set() directly sets a new value without reading the previous one
    this.count.set(0);
  }

  // ═══════════════════════════════════════════════════════════════════
  // 2. COMPUTED SIGNAL - Derived from other signals (reactive)
  // ═══════════════════════════════════════════════════════════════════
  // Computed signals automatically recalculate when their dependent signals change
  // They are read-only and memoize the result to avoid unnecessary calculations
  doubleCount = computed(() => this.count() * 2);
  tripleCount = computed(() => this.count() * 3);

  // ═══════════════════════════════════════════════════════════════════
  // 3. PRACTICAL EXAMPLE - Shopping cart with calculated total
  // ═══════════════════════════════════════════════════════════════════
  // Signal containing an array of objects (cart items)
  items = signal([
    { name: 'MacBook Pro', price: 2499, quantity: 1 },
    { name: 'iPhone 15', price: 999, quantity: 2 },
    { name: 'AirPods Pro', price: 249, quantity: 1 },
  ]);

  // Computed that automatically calculates total whenever items changes
  // This is much more efficient than manually recalculating total after each modification
  total = computed(() => {
    return this.items().reduce((sum, item) => sum + item.price * item.quantity, 0);
  });

  addItem() {
    this.items.update((currentItems) => [
      ...currentItems,
      { name: 'Magic Mouse', price: 99, quantity: 1 },
    ]);
  }

  removeItem(index: number) {
    this.items.update((currentItems) => currentItems.filter((_, i) => i !== index));
  }

  updateQuantity(index: number, delta: number) {
    // Update item quantity by creating a new array (immutability)
    // Math.max(0, ...) prevents negative quantities
    this.items.update((currentItems) =>
      currentItems.map((item, i) =>
        i === index ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
      )
    );
  }

  // ═══════════════════════════════════════════════════════════════════
  // 4. EFFECT - Executes side effects when signals change
  // ═══════════════════════════════════════════════════════════════════
  effectLogs = signal<string[]>([]);

  constructor() {
    // Effect: executes automatically when signals used inside it change
    // Useful for logging, analytics, API calls, localStorage, etc.
    effect(() => {
      const currentCount = this.count();
      const log = `Count changed: ${currentCount}`;
      // Keep only last 5 logs to avoid overflow
      this.effectLogs.update((logs) => [...logs.slice(-4), log]);
    });
  }
}
