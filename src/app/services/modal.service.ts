// GoF Pattern: Singleton — single instance via Angular DI root scope.
// COMPONENT TYPE: Facade Service
// SECTION: UI State Management
//
// ROLE:
// - Manage modal state across the application
// - Provide methods to open/close modals
// - Support both external links and dynamic components
// - Use BehaviorSubject for reactive state management
//
// PATTERNS USED:
// - Service for shared UI state
// - BehaviorSubject for reactive modal state
// - Type-safe modal content interface
// - Dynamic component loading support
//
// NOTES FOR CONTRIBUTORS:
// - Use this service to open modals from anywhere in the app
// - Modal state is reactive via modalState$ observable
// - Supports two content types: 'external' (iframe) and 'component' (dynamic)
// - Always expose Observable, not BehaviorSubject directly

import { Injectable, Type } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

// PATTERN: Modal content type definition
// PURPOSE:
// - Defines structure for modal content
// - Supports both external URLs and dynamic components
export interface ModalContent {
  type: 'external' | 'component';
  url: string;
  component?: Type<any>;
  title?: string;
}

export interface ModalState {
  isOpen: boolean;
  content: ModalContent | null;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalStateSubject = new BehaviorSubject<ModalState>({
    isOpen: false,
    content: null,
  });

  // Expose only Observable, not Subject
  modalState$ = this.modalStateSubject.asObservable();

  openExternal(url: string, title?: string) {
    this.modalStateSubject.next({
      isOpen: true,
      content: {
        type: 'external',
        url,
        title: title || 'External Link',
      },
    });
  }

  openComponent(component: Type<any>, title?: string) {
    this.modalStateSubject.next({
      isOpen: true,
      content: {
        type: 'component',
        url: '',
        component,
        title: title || 'Contenuto',
      },
    });
  }

  close() {
    this.modalStateSubject.next({
      isOpen: false,
      content: null,
    });
  }

  isExternal(url: string): boolean {
    try {
      const urlObj = new URL(url, window.location.href);
      return urlObj.origin !== window.location.origin;
    } catch {
      return false;
    }
  }
}
