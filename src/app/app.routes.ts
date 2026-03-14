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
    data: { animation: 'HomePage' }
  },
  {
    path: 'basics',
    data: { animation: 'BasicsPage' },
    children: [
      {
        path: 'data-binding',
        component: DataBinding,
        data: { animation: 'DataBindingPage' }
      },
      {
        path: 'directives',
        component: Directives,
        data: { animation: 'DirectivesPage' }
      },
      {
        path: 'forms',
        component: Forms,
        data: { animation: 'FormsPage' }
      },
    ],
  },
  {
    path: 'advanced',
    data: { animation: 'AdvancedPage' },
    children: [
      {
        path: 'signals',
        component: Signals,
        data: { animation: 'SignalsPage' }
      },
      {
        path: 'http',
        component: HttpExample,
        data: { animation: 'HttpPage' }
      },
      {
        path: 'signal-forms',
        component: SignalFormDemo,
        data: { animation: 'SignalFormsPage' }
      },
    ],
  },
  {
    path: 'state',
    data: { animation: 'StatePage' },
    children: [
      {
        path: 'ngrx',
        component: NgrxExample,
        data: { animation: 'NgrxPage' }
      },
      {
        path: 'behavior-subject',
        component: BehaviorSubjectComponent,
        data: { animation: 'BehaviorSubjectPage' }
      },
    ],
  },
  {
    path: 'pattern-explorer',
    component: PatternExplorer,
    data: { animation: 'PatternExplorerPage' }
  },
  {
    path: 'patterns',
    data: { animation: 'PatternsPage' },
    children: [
      {
        path: 'gof-reference',
        loadComponent: () => import('./patterns/gof-reference/gof-reference').then(m => m.GofReference),
        data: { animation: 'GofReferencePage' }
      }
    ]
  },
  {
    path: 'examples',
    data: { animation: 'ExamplesPage' },
    children: [
      {
        path: 'users',
        component: UserPage,
        data: { animation: 'UsersPage' }
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
    data: { animation: 'CodeBlockDemoPage' }
  },
  {
    path: 'material-demo',
    component: MaterialDemo,
    data: { animation: 'MaterialDemoPage' }
  },
];
