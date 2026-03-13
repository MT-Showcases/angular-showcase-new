// GoF Pattern: Decorator — compose HTTP behavior through interceptor chaining.

import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
// WHY provideAnimationsAsync?
// Angular Material richiede il modulo Animations per le transizioni dei
// componenti (ripple, overlay, drawer, ecc.). La versione "async" carica
// il modulo in modo lazy, migliorando le performance del bundle iniziale.
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

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
    // Angular Material animations — lazy loaded per performance ottimale
    provideAnimationsAsync(),
  ],
};
