// GoF Pattern: Observer — host global toast observer reacting to application events.

import { Component, signal, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { routeAnimations } from './animations/route.animations';
import { Navbar } from './navbar/navbar';
import { BouncingLogo } from './bouncing-logo/bouncing-logo';
import { LinkModal } from './link-modal/link-modal';
import { LinkInterceptor } from '../directives/link-interceptor.directive';
import { NotificationToast } from './components/notification-toast/notification-toast';
import { filter, map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

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
  private router = inject(Router);

  isNavigating = toSignal(
    this.router.events.pipe(
      filter(e => e instanceof NavigationStart || e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError),
      map(e => e instanceof NavigationStart)
    ),
    { initialValue: false }
  );

  /**
   * WHY: Restituisce l'identificativo unico della route attiva per triggerare l'animazione.
   * Utilizziamo `activatedRouteData` per distinguere i cambi di stato.
   */
  getRouteAnimationState(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
