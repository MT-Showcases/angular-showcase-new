import { Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-message-demo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './message-demo.html',
  styleUrl: './message-demo.scss'
})
export class MessageDemo {
  messageSubject = new BehaviorSubject<string>('Benvenuto!');
  message$ = this.messageSubject.asObservable();
  currentMessage = '';

  private destroyRef = inject(DestroyRef);

  constructor() {
    // WHY: evita memory leak quando il componente viene distrutto
    // QUANDO USARLO: sempre con subscribe in componenti e servizi con lifecycle
    // ANTI-PATTERN: subscribe senza unsubscribe — leak garantito
    this.message$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe((msg) => (this.currentMessage = msg));
  }

  updateMessage(newMessage: string) {
    if (newMessage.trim()) {
      this.messageSubject.next(newMessage);
    }
  }

  resetMessage() {
    this.messageSubject.next('Benvenuto!');
  }
}
