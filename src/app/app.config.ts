// GoF Pattern: Decorator — compose HTTP behavior through interceptor chaining.

import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { appReducers } from './store/app.reducers';
import { loggingInterceptor } from './interceptors/logging.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([loggingInterceptor])),
    provideStore(appReducers),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    // WHY provideAnimations:
    // Necessario per le transizioni di route definite via trigger (routeAnimations).
    // provideAnimationsAsync() non è sufficiente per animazioni complesse che
    // richiedono il modulo completo disponibile immediatamente all'avvio.
    provideAnimations(),
  ],
};
