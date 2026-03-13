import { Routes } from '@angular/router';
import { UserList } from './user-list/user-list';
import { DataBinding } from './data-binding/data-binding';
import { Directives } from './directives/directives';
import { Home } from './home/home';
import { Forms } from './forms/forms';
import { UserPage } from './user-page/user-page';
import { Signals } from './signals/signals';
import { HttpExample } from './http-example/http-example';
import { NgrxExample } from './ngrx-example/ngrx-example';
import { CodeBlockDemo } from './code-block-demo/code-block-demo';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject';
import { PatternExplorer } from './pattern-explorer/pattern-explorer';
import { SignalFormDemo } from './signal-form-demo/signal-form-demo';
import { MaterialDemo } from './components/material-demo/material-demo';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'basics',
    children: [
      {
        path: 'data-binding',
        component: DataBinding,
      },
      {
        path: 'directives',
        component: Directives,
      },
      {
        path: 'forms',
        component: Forms,
      },
    ],
  },
  {
    path: 'advanced',
    children: [
      {
        path: 'signals',
        component: Signals,
      },
      {
        path: 'http',
        component: HttpExample,
      },
      {
        path: 'signal-forms',
        component: SignalFormDemo,
      },
    ],
  },
  {
    path: 'state',
    children: [
      {
        path: 'ngrx',
        component: NgrxExample,
      },
      {
        path: 'behavior-subject',
        component: BehaviorSubjectComponent,
      },
    ],
  },
  {
    path: 'pattern-explorer',
    component: PatternExplorer,
  },
  {
    path: 'patterns',
    children: [
      {
        path: 'gof-reference',
        loadComponent: () => import('./patterns/gof-reference/gof-reference').then(m => m.GofReference)
      }
    ]
  },
  {
    path: 'examples',
    children: [
      {
        path: 'users',
        component: UserPage,
      },
      {
        path: 'pattern-explorer',
        redirectTo: '/pattern-explorer',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'code-block-demo',
    component: CodeBlockDemo,
  },
  {
    // WHY /material-demo?
    // Route di test per verificare l'integrazione Angular Material + tema M3.
    // Accessibile direttamente durante lo sviluppo.
    path: 'material-demo',
    component: MaterialDemo,
  },
];
