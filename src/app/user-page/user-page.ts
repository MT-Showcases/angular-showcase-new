// COMPONENT TYPE: Container
// SECTION: HTTP and Async Operations
//
// ROLE:
// - Provide route wrapper for user list functionality
// - Serve as entry point for /users route
// - Compose UserList component with page layout
//
// PATTERNS USED:
// - Simple composition (wrapper component)
// - Routing target component
//
// NOTES FOR CONTRIBUTORS:
// - Keep this component minimal
// - All user list logic lives in UserList component
// - Add page-level concerns here (breadcrumbs, page title, etc.)

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserList } from '../user-list/user-list';

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-user-page',
  imports: [UserList],
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPage {}
