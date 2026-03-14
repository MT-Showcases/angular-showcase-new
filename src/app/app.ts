// GoF Pattern: Observer — host global toast observer reacting to application events.

import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routeAnimations } from './animations/route.animations';
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
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  protected readonly title = signal('angular-showcase');

  /**
   * WHY: Restituisce l'identificativo unico della route attiva per triggerare l'animazione.
   * Utilizziamo `activatedRouteData` per distinguere i cambi di stato.
   */
  getRouteAnimationState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
