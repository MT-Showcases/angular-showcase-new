// GoF Pattern: Decorator — augment HTTP request handling with logging without changing callers.

import { HttpInterceptorFn } from '@angular/common/http';
import { finalize } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  const start = performance.now();

  return next(req).pipe(
    finalize(() => {
      const elapsedMs = Math.round(performance.now() - start);
      console.log(`[HTTP] ${req.method} ${req.urlWithParams} (${elapsedMs} ms)`);
    })
  );
};
