/**
 * PATTERN: BehaviorSubject per stato condiviso (RxJS)
 *
 * WHY: BehaviorSubject è un Subject che mantiene sempre l'ultimo valore emesso.
 *   È perfetto per rappresentare "lo stato attuale" di qualcosa — un nuovo subscriber
 *   riceve immediatamente il valore corrente, senza aspettare il prossimo .next().
 *   Ideale per service che condividono stato tra più componenti.
 *
 * QUANDO USARLO:
 *   - Stato condiviso tra componenti via service (es. AuthService, CartService)
 *   - Quando i subscriber devono ricevere subito il valore corrente
 *   - App di medie dimensioni che non giustificano NgRx
 *   - Stato con logica di trasformazione (pipe, map, filter)
 *
 * ALTERNATIVA:
 *   - Signals (Angular 17+) → per stato locale al componente, più semplice
 *   - NgRx Store → per applicazioni enterprise con DevTools e time-travel debug
 *   - Subject semplice → per eventi one-shot (click, notifiche) senza stato iniziale
 *
 * ANTI-PATTERN:
 *   - ❌ Esporre il BehaviorSubject direttamente → usa asObservable() per impedire
 *     che i consumer chiamino .next() dall'esterno (rompe l'encapsulation)
 *   - ❌ Usare .value sincrono invece di subscribe → va contro il paradigma reattivo
 *   - ❌ Dimenticare unsubscribe → usa async pipe o takeUntilDestroyed()
 *   - ❌ Mutare oggetti nel valore → crea sempre nuove referenze (immutabilità)
 */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { CodeBlock } from '../components/code-block/code-block';
import { MessageDemo } from './message-demo/message-demo';
import {
  SectionHeaderComponent,
  AntipatternBoxComponent,
  ComparisonGridComponent,
} from '../components/shared';

interface Message {
  text: string;
  timestamp: Date;
}

/**
 * PATTERN: BehaviorSubject per stato condiviso
 *
 * WHY: BehaviorSubject mantiene l'ultimo valore emesso, perfetto per stato
 * che deve essere disponibile immediatamente ai nuovi subscriber.
 *
 * QUANDO USARLO: Stato semplice condiviso tra componenti senza NgRx.
 * ALTERNATIVA: Signals (Angular 17+) per stato locale; NgRx per stato complesso.
 *
 * ANTI-PATTERN: Non esporre il Subject direttamente — usa asObservable()
 * per evitare che i consumer possano fare .next() dall'esterno.
 */
@Component({
  selector: 'app-behavior-subject',
  standalone: true,
  imports: [CommonModule, CodeBlock, MessageDemo, SectionHeaderComponent, AntipatternBoxComponent, ComparisonGridComponent],
  templateUrl: './behavior-subject.html',
  styleUrl: './behavior-subject.scss'
})
export class BehaviorSubjectComponent {
  // BehaviorSubject with initial value
  messageSubject = new BehaviorSubject<string>('Benvenuto!');
  message$ = this.messageSubject.asObservable();
  currentMessage = '';

  // BehaviorSubject for counter
  counterSubject = new BehaviorSubject<number>(0);
  counter$ = this.counterSubject.asObservable();
  currentCount = 0;

  // BehaviorSubject for complex messages
  messagesSubject = new BehaviorSubject<Message[]>([]);
  messages$ = this.messagesSubject.asObservable();
  messageHistory: Message[] = [];

  // BehaviorSubject for user state
  userStateSubject = new BehaviorSubject<{ name: string; online: boolean }>({
    name: 'Ospite',
    online: false,
  });
  userState$ = this.userStateSubject.asObservable();
  currentUserState = { name: 'Ospite', online: false };

  constructor() {
    // Subscriptions to display current values
    this.message$.subscribe((msg) => (this.currentMessage = msg));
    this.counter$.subscribe((count) => (this.currentCount = count));
    this.messages$.subscribe((msgs) => (this.messageHistory = msgs));
    this.userState$.subscribe((state) => (this.currentUserState = state));
  }

  // Methods for message example
  updateMessage(newMessage: string) {
    this.messageSubject.next(newMessage);
  }

  resetMessage() {
    this.messageSubject.next('Benvenuto!');
  }

  // Methods for counter example
  incrementCounter() {
    const currentValue = this.counterSubject.value;
    this.counterSubject.next(currentValue + 1);
  }

  decrementCounter() {
    const currentValue = this.counterSubject.value;
    this.counterSubject.next(currentValue - 1);
  }

  resetCounter() {
    this.counterSubject.next(0);
  }

  // Methods for messages list example
  addMessage(text: string) {
    const currentMessages = this.messagesSubject.value;
    const newMessage: Message = {
      text,
      timestamp: new Date(),
    };
    this.messagesSubject.next([...currentMessages, newMessage]);
  }

  clearMessages() {
    this.messagesSubject.next([]);
  }

  // Methods for user state example
  login(name: string) {
    this.userStateSubject.next({ name, online: true });
  }

  logout() {
    this.userStateSubject.next({ name: 'Ospite', online: false });
  }

  // Code examples
  basicExample = `import { BehaviorSubject } from 'rxjs';

// Creating a BehaviorSubject with initial value
const subject = new BehaviorSubject<string>('Initial value');

// Subscription - immediately receives the current value
subject.subscribe(value => {
  console.log('Received:', value);
});
// Output: Received: Initial value

// Emitting a new value
subject.next('New value');
// Output: Received: New value`;

  valueAccessExample = `// Access current value without subscription
const currentValue = subject.value;
console.log('Current value:', currentValue);

// This is useful for synchronous operations
if (subject.value === 'something') {
  // do something
}`;

  comparisonExample = `// Subject - NO initial value
const subject = new Subject<string>();
subject.subscribe(v => console.log('Sub 1:', v));
// Nothing printed yet

subject.next('First value');
// Output: Sub 1: First value

// BehaviorSubject - HAS initial value
const behaviorSubject = new BehaviorSubject<string>('Initial');
behaviorSubject.subscribe(v => console.log('Sub 1:', v));
// Output: Sub 1: Initial (emitted immediately!)

behaviorSubject.next('Second value');
// Output: Sub 1: Second value`;

  practicalExample = `import { BehaviorSubject } from 'rxjs';

// Service to manage authentication state
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  login(user: User) {
    this.userSubject.next(user);
  }

  logout() {
    this.userSubject.next(null);
  }

  // Get current user without subscription
  getCurrentUser(): User | null {
    return this.userSubject.value;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }
}`;

  stateManagementExample = `// Service to manage cart state
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  public cart$ = this.cartSubject.asObservable();

  addItem(item: CartItem) {
    const currentCart = this.cartSubject.value;
    this.cartSubject.next([...currentCart, item]);
  }

  removeItem(itemId: string) {
    const currentCart = this.cartSubject.value;
    const updatedCart = currentCart.filter(item => item.id !== itemId);
    this.cartSubject.next(updatedCart);
  }

  clearCart() {
    this.cartSubject.next([]);
  }

  getItemCount(): number {
    return this.cartSubject.value.length;
  }
}`;
}
