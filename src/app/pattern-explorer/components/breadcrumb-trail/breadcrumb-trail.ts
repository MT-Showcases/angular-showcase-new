import { Component, computed, input } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
}

@Component({
  selector: 'app-breadcrumb-trail',
  templateUrl: './breadcrumb-trail.html',
  styleUrl: './breadcrumb-trail.scss',
})
export class BreadcrumbTrail {
  readonly itemsState = input<BreadcrumbItem[]>([], { alias: 'items' });

  readonly items = computed(() => this.itemsState());
  readonly depthLevel = computed(() => this.itemsState().length);
}
