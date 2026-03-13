// GoF Pattern: Observer — react to NotificationService stream updates and render toasts.

import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-notification-toast',
  imports: [CommonModule],
  templateUrl: './notification-toast.html',
  styleUrl: './notification-toast.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationToast {
  private readonly notificationService = inject(NotificationService);

  readonly notifications$ = this.notificationService.notifications$;

  dismiss(id: string): void {
    this.notificationService.dismiss(id);
  }
}
