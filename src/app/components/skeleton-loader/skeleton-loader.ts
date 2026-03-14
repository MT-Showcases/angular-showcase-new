import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

// WHY: Skeleton loader migliora la UX percepita — l'utente vede subito struttura invece di vuoto
// QUANDO USARLO: su ogni fetch HTTP con latenza > 100ms
// ALTERNATIVA: spinner — ma è meno informativo sulla struttura del contenuto
// ANTI-PATTERN: nessun feedback di loading — UX scadente, utente non sa cosa sta succedendo
@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-wrapper" [attr.aria-label]="'Caricamento in corso...'">
      @for (item of rows; track item) {
        <div class="skeleton-row" [style.width]="item"></div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
    .skeleton-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      padding: 1rem 0;
    }
    .skeleton-row {
      height: 1rem;
      border-radius: 0.5rem;
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    @keyframes shimmer {
      0% { background-position: 200% 0; }
      100% { background-position: -200% 0; }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkeletonLoader {
  @Input() rows: string[] = ['100%', '80%', '60%', '90%', '70%'];
}
