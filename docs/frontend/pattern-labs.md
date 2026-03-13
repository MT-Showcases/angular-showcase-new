# Pattern Labs Extension Guide

## Purpose

Pattern Labs turn Pattern Explorer from a static reference into a practice engine. Each lab is a small, interactive exercise that reinforces one architecture decision with immediate feedback.

Current labs:

1. **Smart/Dumb Refactor**
2. **Signal vs Observable**
3. **Facade Anti-pattern Fixer**

Route: `/examples/pattern-explorer`

---

## Implementation Map

```text
src/app/pattern-explorer/
  pattern-explorer.models.ts
  components/
    pattern-playground/
      pattern-playground.ts            # Local state + lab tab shell
      pattern-playground.html
      pattern-playground.scss
    labs/
      smart-dumb-refactor-lab/
      signal-vs-observable-lab/
      facade-anti-pattern-fixer-lab/
```

- `PatternPlayground` owns only lab selection (`activeLabId`) and local page controls.
- Each lab is a standalone presentational component with self-contained signal state.

---

## Design Rules

### 1) Keep labs standalone and local

- New labs must be standalone components.
- Avoid global stores for lab-only interactions.
- Keep side effects out of the lab unless the exercise explicitly requires async behavior.

### 2) Preserve educational readability

- Prefer explicit signals and computed values over hidden indirection.
- Use practical anti-pattern/fix language contributors can apply during code reviews.
- Keep exercises short: one focused architectural decision per lab.

### 3) Match project UI conventions

- Use BEM-style class names in SCSS.
- Keep spacing, borders, and chip/button interactions aligned with existing Pattern Explorer UI.
- Use semantic headings and accessible labels (`aria-label`, tab semantics where relevant).

---

## How to Add a New Lab

### Step 1 — Create component files

Create a folder under `src/app/pattern-explorer/components/labs/`:

```text
my-new-lab/
  my-new-lab.ts
  my-new-lab.html
  my-new-lab.scss
```

Use the same top-of-file contributor comment style used across Pattern Explorer.

### Step 2 — Add a typed lab id

In `pattern-explorer.models.ts`, extend `PatternLabId`:

```ts
export type PatternLabId =
  | 'smart-dumb-refactor'
  | 'signal-vs-observable'
  | 'facade-fixer'
  | 'my-new-lab';
```

### Step 3 — Register in `PatternPlayground`

1. Import the new lab component in `pattern-playground.ts`
2. Add it to `imports: []`
3. Add a tab entry in `labTabs`
4. Add a conditional panel render in `pattern-playground.html`

Example tab entry:

```ts
{
  id: 'my-new-lab',
  label: 'My New Lab',
  summary: 'One-line learning objective.'
}
```

### Step 4 — Keep interactions testable

- Use deterministic state transitions (`set`, `update`), avoid implicit mutations.
- If a lab includes scoring, derive it with `computed()`.
- Include a reset action for repeatable practice.

---

## Quality Checklist Before Merge

- [ ] Lab is standalone and compiles without extra route wiring
- [ ] No service/store dependency unless intentionally part of exercise
- [ ] Labels and helper copy explain *why* a choice is correct
- [ ] Mobile layout remains usable (chips/buttons wrap cleanly)
- [ ] Existing Pattern Explorer behavior remains unchanged
