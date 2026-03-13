import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
}

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-breadcrumb-trail',
  templateUrl: './breadcrumb-trail.html',
  styleUrl: './breadcrumb-trail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbTrail {
  readonly itemsState = input<BreadcrumbItem[]>([], { alias: 'items' });

  readonly items = computed(() => this.itemsState());
  readonly depthLevel = computed(() => this.itemsState().length);
}
