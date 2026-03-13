# Pattern Discovery Flows

## Goal
Define guided interaction flows that help learners *discover* architectural patterns in the current Angular Showcase routes.

The flows are designed to move from recognition -> reasoning -> application.

---

## Flow 1 — Container/Presentational Discovery (Beginner)

**Entry points**
- `/examples/users`
- `/basics/data-binding`

**Learning objective**
Learner can separate orchestration logic from UI rendering concerns.

**Flow steps**
1. **Observe**
   - Show a split-view card: “Container responsibilities” vs “Presentational responsibilities”
2. **Trace data flow**
   - Learner follows data path from service/container to child inputs
3. **Trace event flow**
   - Learner follows child output events back to container actions
4. **Classify tasks**
   - Prompt with 6 tasks (“fetch users”, “format user badge”, etc.) and classify where each belongs
5. **Reflect**
   - “What breaks if these responsibilities are mixed?”

**Completion signal**
Learner correctly classifies at least 5/6 responsibilities and explains one trade-off.

---

## Flow 2 — Facade Boundary Discovery (Beginner -> Intermediate)

**Entry points**
- `/advanced/http`
- `/examples/users`

**Learning objective**
Learner understands that facades simplify component APIs and hide infrastructure details.

**Flow steps**
1. **Problem framing**
   - Show “Without facade” pain points: repeated HTTP code, hard testing, leaky details
2. **Boundary map**
   - Visual chain: component -> facade -> data source
3. **Contract exercise**
   - Learner defines facade API with method names and return shapes
4. **Decision checkpoint**
   - Ask what should stay private in service internals
5. **Transfer prompt**
   - “How would you apply the same facade to Products page?”

**Completion signal**
Learner can define a minimal facade contract and justify it.

---

## Flow 3 — Reactive State Tool Selection (Intermediate)

**Entry points**
- `/advanced/signals`
- `/state/behavior-subject`
- `/state/ngrx`

**Learning objective**
Learner chooses the right state strategy based on scope and complexity.

**Flow steps**
1. **Single scenario intro**
   - Present one app story (e.g., cart + auth + preferences)
2. **Three implementations panel**
   - Signals / BehaviorSubject / NgRx represented side-by-side
3. **Trade-off matrix**
   - Compare setup cost, debugging capability, scale, explicitness
4. **Choice challenge**
   - Learner picks one strategy for 3 different requirements
5. **Rationale reflection**
   - “Why not the other two in this case?”

**Completion signal**
Learner selects appropriate strategy for each requirement with valid reasoning.

---

## Flow 4 — Composition & Reuse Discovery (Intermediate)

**Entry points**
- `/` (home)
- component examples where `concept-card`, `feature-card`, `guide-step` appear

**Learning objective**
Learner sees composition as contract-driven assembly, not duplication.

**Flow steps**
1. **Anatomy reveal**
   - Page overlay identifies reusable presentational pieces
2. **Contract lens**
   - Show key `@Input` and `@Output` boundaries
3. **Swap challenge**
   - Replace one presentational block with another contract-compatible block
4. **Stability check**
   - Confirm container logic remains unchanged
5. **Generalization**
   - Ask learner to propose one new reusable component based on repeated UI patterns

**Completion signal**
Learner can explain why composition reduces change impact.

---

## Flow 5 — Cross-Pattern Synthesis (Advanced)

**Entry points**
- Start at `/` and navigate through `users`, `http`, and one state route

**Learning objective**
Learner integrates multiple patterns in one mental model.

**Flow steps**
1. **Pattern map**
   - Display active patterns for each visited page
2. **Compare responsibilities**
   - What is handled by container, facade, state layer, presentational UI?
3. **Design brief**
   - “Build a mini feature with list + details + loading + error states”
4. **Architecture sketch**
   - Learner chooses boundaries and state approach
5. **Self-review rubric**
   - Check cohesion, coupling, and reusability

**Completion signal**
Learner produces a coherent pattern-aware architecture sketch.

---

## Shared UX Mechanics Across Flows

- **Pattern badges** always visible in page header
- **You are here** breadcrumbs by concept depth (Intro -> Practice -> Deep Dive)
- **Hint ladder** for tasks (3 levels)
- **Mini recap** after each step (one sentence)
- **Exit ticket** at flow end: one practical question

---

## Difficulty Progression Rules

1. Never introduce more than one new pattern in the first 2 minutes of a flow.
2. Use one concrete example before abstract definitions.
3. Add terminology only after behavior is observed.
4. Require comparison decisions at intermediate+ levels.
5. End each flow with transfer to a new context.

---

## Metrics to Validate Learning UX (qualitative/quantitative)

- Time-to-first-correct-classification (container vs presentational)
- % of learners completing hint level 0 (without hints)
- Correct state strategy choices across scenarios
- Self-reported confidence before/after flow
- Drop-off point by flow step (to find cognitive overload)

These metrics help prioritize UX improvements without changing framework code.
