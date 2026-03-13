# GoF Patterns to Angular Mapping

This guide provides a comprehensive mapping of Gang of Four (GoF) design patterns to their modern Angular implementations and idiomatic practices.

## Quick Reference Table

| GoF Pattern | Angular Implementation | Location in Project |
| :--- | :--- | :--- |
| **Observer** | RxJS / Signals / EventEmitter | `src/assets/content/learning-content.json#gof-observer` |
| **Strategy** | DI + Interface Swapping | `src/assets/content/learning-content.json#gof-strategy` |
| **Facade** | Service Facades | `src/assets/content/learning-content.json#svc-facade` |
| **Decorator** | Directives / HttpInterceptors | `src/assets/content/learning-content.json#gof-decorator` |
| **Factory** | `useFactory` / Factory Providers | `src/assets/content/learning-content.json#gof-factory` |
| **Singleton** | `providedIn: 'root'` Services | `src/assets/content/learning-content.json#gof-singleton` |
| **Proxy** | HTTP Interceptors | `src/assets/content/learning-content.json#gof-proxy` |
| **Template Method** | Abstract Base Classes + Lifecycle | `src/assets/content/learning-content.json#gof-template-method` |

---

## Deep Dive

### 1. Observer Pattern
**Angular Equivalent:** RxJS Observables, Signals, EventEmitter.

In Angular, the Observer pattern is everywhere. Components "observe" state changes through Signals or RxJS streams.

```typescript
// Signal-based Observation
@Component({ ... })
export class MyComponent {
  private stateService = inject(StateService);
  
  // Reacting to changes in state signal
  count = this.stateService.count;
  
  constructor() {
    effect(() => console.log('Count changed:', this.count()));
  }
}
```

### 2. Strategy Pattern
**Angular Equivalent:** Dependency Injection (DI) with multi-providers or token swapping.

Used to swap algorithms or behaviors at runtime or configuration time (e.g., Mock vs. Real API).

```typescript
// Define Strategy
export abstract class DataStrategy {
  abstract fetchData(): Observable<any>;
}

// implementation 1
@Injectable() export class ApiStrategy { ... }

// implementation 2
@Injectable() export class MockStrategy { ... }

// Usage in providers
{ provide: DataStrategy, useClass: environment.production ? ApiStrategy : MockStrategy }
```

### 3. Facade Pattern
**Angular Equivalent:** Service Facades.

Simplifies interaction with a complex subsystem (like a set of specialized services or a store) by providing a unified, high-level API.

```typescript
@Injectable({ providedIn: 'root' })
export class UserFacade {
  private api = inject(UserApiService);
  private store = inject(UserStore);

  users = this.store.users;
  loading = this.store.loading;

  load() {
    this.api.getUsers().subscribe(u => this.store.setUsers(u));
  }
}
```

### 4. Decorator Pattern
**Angular Equivalent:** Directives.

Adds behavior to an existing component or element without modifying its internal code.

```typescript
@Directive({ selector: '[appHighlight]', standalone: true })
export class HighlightDirective {
  @HostListener('mouseenter') onMouseEnter() {
    // Adding behavior (decoration) to the host element
    this.el.style.backgroundColor = 'yellow';
  }
}
```

### 5. Factory Pattern
**Angular Equivalent:** `useFactory` in DI.

Handles complex object creation logic that depends on other services or runtime conditions.

```typescript
export const MY_PROVIDER = {
  provide: MyService,
  useFactory: (http: HttpClient) => {
    return new MyService(http, 'https://api.example.com');
  },
  deps: [HttpClient]
};
```

### 6. Singleton Pattern
**Angular Equivalent:** Services with `providedIn: 'root'`.

Angular's DI system manages singletons by default when using the root injector.

```typescript
@Injectable({ providedIn: 'root' })
export class GlobalConfigService {
  // Only one instance of this class exists in the app
}
```

### 7. Proxy Pattern
**Angular Equivalent:** HTTP Interceptors.

Acts as a middleman for HTTP requests, allowing for cross-cutting concerns like authentication, logging, or caching.

```typescript
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  const proxyReq = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  return next(proxyReq);
};
```

### 8. Template Method Pattern
**Angular Equivalent:** Abstract Base Components and Lifecycle Hooks.

Defines the program skeleton in an algorithm, letting subclasses redefine certain steps without changing the algorithm's structure.

```typescript
export abstract class BaseListComponent {
  ngOnInit() {
    this.loadData(); // This is the 'template method' skeleton
  }

  abstract loadData(): void; // Steps to be defined by subclasses
}
```
