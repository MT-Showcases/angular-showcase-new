// COMPONENT TYPE: Container
// SECTION: Navigation and Layout
//
// ROLE:
// - Provide main application navigation
// - Organize navigation items into logical groups
// - Handle dropdown menu state and interactions
// - Track current route for active link highlighting
//
// PATTERNS USED:
// - Signal-based dropdown state management
// - Router integration for navigation and route tracking
// - Grouped navigation structure (Basics, Advanced, State Management, Examples)
// - HostListener for click-outside-to-close functionality
//
// NOTES FOR CONTRIBUTORS:
// - Add new routes to appropriate groups array
// - Maintain consistent icon usage with Icon component
// - Keep navigation structure flat (avoid deep nesting)
// - Update currentUrl signal when adding route tracking features

import { Component, signal, inject, HostListener, DestroyRef, ChangeDetectionStrategy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Icon } from '../components/icon/icon';
import { filter } from 'rxjs';

// PATTERN: Navigation data structure
// PURPOSE:
// - Defines typed structure for navigation items and groups
// - Ensures consistency in navigation data throughout the component
// - Makes it easy to add new routes with type safety
interface NavItem {
  label: string;
  route: string;
  icon: string;
  exact?: boolean;
}

interface NavGroup {
  label: string;
  icon: string;
  items: NavItem[];
}

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, Icon, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Navbar {
  private router = inject(Router);
  private destroyRef = inject(DestroyRef);
  openDropdown = signal<string | null>(null);
  currentUrl = signal<string>('');

  mainItems: NavItem[] = [{ label: 'Home', route: '', icon: 'home', exact: true }];

  groups: NavGroup[] = [
    {
      label: 'Basics',
      icon: 'data-binding',
      items: [
        { label: 'Data Binding', route: '/basics/data-binding', icon: 'data-binding' },
        { label: 'Directives', route: '/basics/directives', icon: 'directives' },
        { label: 'Forms', route: '/basics/forms', icon: 'form' },
      ],
    },
    {
      label: 'Advanced',
      icon: 'signals',
      items: [
        { label: 'Signals', route: '/advanced/signals', icon: 'signals' },
        { label: 'HTTP', route: '/advanced/http', icon: 'http' },
      ],
    },
    {
      label: 'State',
      icon: 'store',
      items: [
        { label: 'BehaviorSubject', route: '/state/behavior-subject', icon: 'signals' },
        { label: 'NgRx', route: '/state/ngrx', icon: 'store' },
      ],
    },
    {
      label: 'Patterns',
      icon: 'blocks',
      items: [
        { label: 'GoF Reference', route: '/patterns/gof-reference', icon: 'blocks' }
      ]
    },
    {
      label: 'Examples',
      icon: 'users',
      items: [
        { label: 'Users List', route: '/examples/users', icon: 'users' },
        {
          label: 'Pattern Explorer',
          route: '/examples/pattern-explorer',
          icon: 'blocks',
        },
      ],
    },
  ];

  constructor() {
    // Track current route
    this.currentUrl.set(this.router.url);

    // WHY: evita memory leak quando il componente viene distrutto
    // QUANDO USARLO: sempre con subscribe in componenti e servizi con lifecycle
    // ANTI-PATTERN: subscribe senza unsubscribe — leak garantito
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd), takeUntilDestroyed(this.destroyRef))
      .subscribe((event) => {
        this.currentUrl.set(event.urlAfterRedirects);
      });
  }

  isGroupActive(group: NavGroup): boolean {
    const url = this.currentUrl();
    return group.items.some((item) => url.startsWith(item.route));
  }

  toggleDropdown(groupLabel: string) {
    this.openDropdown.set(this.openDropdown() === groupLabel ? null : groupLabel);
  }

  closeDropdown() {
    this.openDropdown.set(null);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.nav-dropdown');

    if (!clickedInside && this.openDropdown()) {
      this.closeDropdown();
    }
  }
}
