import { trigger, transition, style, animate, query } from '@angular/animations';

/**
 * Route Animations
 * Fornisce un effetto fade-in + slide-up fluido durante la navigazione.
 * 
 * WHY: fade+slide-up è la transizione più naturale per contenuto educativo.
 * ANTI-PATTERN: animazioni > 400ms — percepite come lente.
 */
export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    query(':enter', [
      style({ opacity: 0, transform: 'translateY(12px)' }),
      animate('250ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
    ], { optional: true })
  ])
]);
