// GoF Pattern: Observer — publish notification state changes to subscribed UI observers.

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
  createdAt: number;
}

@Injectable({
  // GoF Pattern: Singleton — single instance via Angular DI root scope
  providedIn: 'root',
})
export class NotificationService {
  private readonly notificationsSubject = new BehaviorSubject<Notification[]>([]);
  readonly notifications$ = this.notificationsSubject.asObservable();

  push(message: string, type: Notification['type'] = 'info'): void {
    const notification: Notification = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      message,
      type,
      createdAt: Date.now(),
    };

    this.notificationsSubject.next([...this.notificationsSubject.value, notification]);
  }

  dismiss(id: string): void {
    this.notificationsSubject.next(this.notificationsSubject.value.filter((item) => item.id !== id));
  }
}
