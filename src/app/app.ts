// GoF Pattern: Observer — host global toast observer reacting to application events.

import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from './navbar/navbar';
import { BouncingLogo } from './bouncing-logo/bouncing-logo';
import { LinkModal } from './link-modal/link-modal';
import { LinkInterceptor } from '../directives/link-interceptor.directive';
import { NotificationToast } from './components/notification-toast/notification-toast';

@Component({
  selector: 'app-root',
  imports: [RouterModule, Navbar, BouncingLogo, LinkModal, LinkInterceptor, NotificationToast],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('angular-showcase');
}
