import { Component, Input, computed, signal } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
}

@Component({
  selector: 'app-breadcrumb-trail',
  templateUrl: './breadcrumb-trail.html',
  styleUrl: './breadcrumb-trail.scss',
})
export class BreadcrumbTrail {
  private readonly itemsState = signal<BreadcrumbItem[]>([]);

  @Input({ required: true })
  set items(items: BreadcrumbItem[]) {
    this.itemsState.set(items);
  }

  readonly breadcrumbItems = computed(() => this.itemsState());
  readonly depthLevel = computed(() => this.itemsState().length);
}
