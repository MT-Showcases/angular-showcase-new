// COMPONENT TYPE: Presentational
// SECTION: Layout Components
//
// ROLE:
// - Display consistent page header with title and subtitle
// - Provide standardized visual hierarchy for all pages
// - Keep page header styling centralized
//
// PATTERNS USED:
// - Pure presentational component (@Input only)
// - No business logic or state management
// - Reusable across all page-level components
//
// NOTES FOR CONTRIBUTORS:
// - Keep this component simple and stateless
// - All styling should be in page-header.scss
// - Used at the top of every major page/section

import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-page-header',
  imports: [],
  templateUrl: './page-header.html',
  styleUrl: './page-header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageHeader {
  @Input() title = '';
  @Input() subtitle = '';
}
