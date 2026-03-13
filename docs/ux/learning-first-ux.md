# Learning-First UX Specification

## Purpose
Design the learning experience so users progressively discover Angular patterns instead of passively reading pages.

This spec focuses on **progressive depth**:
1. Understand what a pattern is
2. Recognize where it appears
3. Practice applying it
4. Compare trade-offs with alternatives

---

## 1) Learning Outcomes by Depth Level

### Level 1 — See it
Learner can identify pattern names and responsibilities.

- Container vs Presentational
- Facade service
- Reactive state (Signals, BehaviorSubject, NgRx)
- Composition (small reusable UI building blocks)

### Level 2 — Explain it
Learner can explain *why* the pattern is used in this page and what problem it solves.

### Level 3 — Modify it
Learner can make small implementation decisions (what should move to container/service/store vs presentational components).

### Level 4 — Transfer it
Learner can apply the same pattern to a new scenario (e.g., users page -> products page).

---

## 2) UX Learning Model (Progressive-Depth Stack)

Every feature page should use a consistent 5-layer stack:

1. **Pattern Snapshot (30–60 seconds)**
   - One card per pattern used in the page
   - Shows role in one sentence: “Container orchestrates data and events”
2. **Annotated Walkthrough (2–4 minutes)**
   - Visual map: component/service/store interaction
   - “Data flows down, events flow up” style diagrams
3. **Guided Practice (5–8 minutes)**
   - Micro-task prompt with expected outcome
   - Hint ladder (Hint 1 conceptual, Hint 2 structural, Hint 3 near-solution)
4. **Compare & Choose (3–5 minutes)**
   - Alternative implementation and trade-off table
   - Example: Signals local state vs NgRx global state
5. **Reflection Checkpoint (1 minute)**
   - 3 short self-check questions
   - “What belongs in container? What belongs in UI-only child?”

---

## 3) Pattern Teaching UX (by pattern)

## 3.1 Container / Presentational

**Current project anchors**
- Containers: `home`, `user-list`, `http-example`, `ngrx-example`
- Presentational: `concept-card`, `feature-card`, `guide-step`, `user-card`, `page-header`, `icon`

**Teaching UX requirements**
- Show a “Responsibility Split” panel:
  - Container = fetch/select state, coordinate actions
  - Presentational = render inputs, emit outputs
- Add “Move this logic” exercises:
  - Give mixed responsibilities and ask learner where each should live
- Add anti-pattern callouts:
  - “Presentational component calling HTTP directly”

## 3.2 Facade

**Current project anchors**
- `http-example` and `user-list` mention service/facade usage

**Teaching UX requirements**
- Provide a “Facade Boundary” diagram:
  - Component -> Facade service -> API/Store
- Include “API contract first” prompt:
  - “Design 3 facade methods before implementation details”
- Add refactor challenge:
  - Start from component with direct HTTP usage and move to facade mental model

## 3.3 Reactive State

**Current project anchors**
- Signals page
- BehaviorSubject page
- NgRx demos (counter/todo/concepts)

**Teaching UX requirements**
- Add a “State Tool Picker” block on each state page:
  - Local + simple -> Signals
  - Shared + moderate -> BehaviorSubject service
  - Global + complex/time-travel/devtools -> NgRx
- Add one same-problem comparison scenario shown with all 3 approaches
- Add “state lifecycle” visualization:
  - init -> update -> derive -> cleanup

## 3.4 Composition

**Current project anchors**
- Reusable components library under `src/app/components/*`

**Teaching UX requirements**
- Show composed page anatomy using existing reusable components
- Include “swap component” exercise:
  - Replace one presentational card with another without changing container behavior
- Emphasize stable contracts (`@Input` / `@Output`) as composition glue

---

## 4) Interaction Patterns to Reinforce Learning

### 4.1 Pattern Chips (persistent context)
At top of every learning page, show chips for active patterns in that page:
- Example: `Container`, `Facade`, `Reactive State`
- Chips open mini definitions in-place (no hard context switch)

### 4.2 Why-this-matters callouts
For every major section, add one line:
- “Without this split, testing and reuse get harder.”

### 4.3 Misconception toggles
Collapsible “Common mistake” blocks:
- “BehaviorSubject is not always better than Signals”
- “NgRx is not required for every app”

### 4.4 Practice-first ordering
Default section order should be:
1) tiny concept
2) working example
3) learner action
4) deeper theory

---

## 5) Page Blueprint (Reusable Template)

Use this sequence for each educational page:

1. **Page Header**
   - What you will build/understand in this page
2. **Pattern Snapshot Row**
   - 2–4 pattern cards
3. **Live Example**
   - Existing demo component
4. **Guided Task**
   - “Now you try” prompt
5. **Deep Dive**
   - internals/trade-offs
6. **Self-check**
   - 3 questions + expected reasoning
7. **Next Step**
   - route to adjacent concept with rationale

---

## 6) UX Copy Guidelines for Learning Clarity

- Prefer short active phrases: “Select state in container”
- Explain intent before syntax
- Keep jargon paired with a plain-language equivalent
- Use consistent vocabulary:
  - “container”, “presentational”, “facade”, “state source”, “derived state”, “composition contract”

---

## 7) Success Criteria (Documentation-level)

A page is considered learning-first when:
- It explicitly names the pattern(s) used
- It explains *responsibility boundaries*
- It includes at least one guided learner action
- It includes one comparison or trade-off
- It ends with reflection/self-check questions

---

## 8) Suggested Rollout Order

1. State pages first (`signals`, `behavior-subject`, `ngrx`) for comparison value
2. `http-example` + `user-list` to reinforce facade/container split
3. Home page pattern map to orient new learners before deep dives

This order maximizes concept transfer with minimal cognitive load.
