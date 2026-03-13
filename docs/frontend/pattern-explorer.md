# Pattern Explorer Architecture

## Purpose

`Pattern Explorer` is a route-level educational area that shows how three recurring Angular patterns can coexist in one coherent feature:

1. **Container/Presentational split**
2. **Facade Service boundary**
3. **Signals-based local state**

Route: `/examples/pattern-explorer`

---

## Folder Structure

```text
src/app/pattern-explorer/
  pattern-explorer.ts                 # Container component (route entry)
  pattern-explorer.html
  pattern-explorer.scss
  pattern-explorer-facade.service.ts  # Facade service
  pattern-explorer.models.ts          # Shared feature models
  components/
    pattern-list/                     # Presentational card + detail renderer
      pattern-list.ts
      pattern-list.html
      pattern-list.scss
    pattern-playground/               # Presentational + local signals demo
      pattern-playground.ts
      pattern-playground.html
      pattern-playground.scss
```

---

## Pattern Mapping

## 1) Container/Presentational

### Container: `PatternExplorer`

Responsibilities:
- Retrieves pattern metadata through the facade
- Owns route-level selection state (`selectedPatternId` signal)
- Connects data/events between child components

The container is intentionally thin: it orchestrates without embedding presentation markup details.

### Presentational: `PatternList`

Responsibilities:
- Renders pattern cards and detail blocks
- Receives all data via `@Input`
- Emits `selectPattern` event via `@Output`

No facade calls, no route logic, no global state wiring.

---

## 2) Facade Service

### `PatternExplorerFacadeService`

Responsibilities:
- Centralizes feature data (`PatternCard[]`)
- Exposes stable, semantic API: `getPatternCards()`
- Keeps future data-source changes isolated from UI components

If the feature later switches to HTTP or NgRx selectors, update the facade internals first and preserve the component-facing contract.

---

## 3) Signals-Based Local State

### `PatternPlayground`

Responsibilities:
- Demonstrates local interaction state with writable signals:
  - `selectedLevel`
  - `showContributorTips`
- Derives filtered view with computed signal:
  - `filteredPatterns`

This component intentionally keeps interaction state local because the controls are page-scoped and not reused globally.

---

## Data Flow Summary

```text
PatternExplorerFacadeService
        ↓
PatternExplorer (Container)
  - patterns signal
  - selectedPatternId signal
        ↓                ↘
PatternList           PatternPlayground
(@Input/@Output)      (local signals + computed)
```

---

## How to Extend Pattern Explorer

### Add a new pattern card

1. Open `pattern-explorer-facade.service.ts`
2. Add a new `PatternCard` entry in `patternCards`
3. Keep `id` unique and stable
4. Fill `checklist` and `antiPatterns` with practical, reviewable items

No template changes are required for basic card rendering.

### Add a new local-state control in playground

1. Open `components/pattern-playground/pattern-playground.ts`
2. Introduce a writable signal for interaction state
3. Use `computed()` for derived values shown in template
4. Update HTML/SCSS using existing BEM structure

### Evolve data source (HTTP/store)

1. Update facade implementation only (`PatternExplorerFacadeService`)
2. Keep return shape aligned with `PatternCard`
3. Avoid exposing raw backend DTOs to presentational components

---

## Contributor Guardrails

- Keep components **standalone**.
- Keep presentational components stateless beyond UI-only local behavior.
- Preserve class-based selectors and BEM naming in SCSS.
- Keep route orchestration inside container, data source concerns inside facade.
