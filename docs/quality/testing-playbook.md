# Testing Playbook

This project uses Angular-native testing with `TestBed` and `ng test`.

## Quick Commands

- Run all tests (watch mode):
  - `npm test`
- Run all tests once (CI/local verification):
  - `npm run test:ci`
- Run type-checking for app + specs:
  - `npm run lint`
- Build production bundle:
  - `npm run build`

## Test Strategy

### 1) Unit tests first

Use unit tests for:
- Facades/services (state transitions, selectors, helper methods)
- Presentational components (input/output behavior)
- Small pure logic pieces

Guidelines:
- Keep one behavioral assertion per test focus.
- Prefer deterministic inputs over fixture-heavy setup.
- For HTTP facades, use `provideHttpClientTesting()` + `HttpTestingController`.

### 2) Integration-style tests for interaction flows

Use integration tests when behavior spans multiple feature pieces (for example a container + presentational component event flow).

Guidelines:
- Import the standalone container component via TestBed.
- Trigger user interactions through real DOM events (`click`, `input`, etc.).
- Assert both state and rendered output.

### 3) Keep tests maintainable

- Name tests by user-visible behavior (`should ... when ...`).
- Assert stable selectors/classes that reflect feature intent.
- Avoid asserting implementation details that make refactors painful.
- Add test data close to specs; keep it minimal but representative.

## Contributor Workflow

1. Implement or update feature code.
2. Add/update unit tests for changed logic.
3. Add/extend integration coverage for critical interaction flows.
4. Run:
   - `npm run test:ci`
   - `npm run lint`
   - `npm run build`
5. Commit only when all commands pass locally (or document known blockers).

## Common Patterns in This Repository

- **Facade logic**: test loading, error handling, computed selectors, and query helpers.
- **Pattern Explorer**: test selection flow from list interaction to container-rendered summary.

## Troubleshooting

- If tests fail due to unexpected HTTP calls, ensure each request is `expectOne(...)` + `flush(...)`.
- If DOM assertions fail, call `fixture.detectChanges()` after interactions.
- If strict typing fails, align mock objects with the exact interface contracts in `src/types/`.
