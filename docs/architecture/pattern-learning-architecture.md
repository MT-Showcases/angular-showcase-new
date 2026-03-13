# Pattern-Learning Architecture

## Purpose
Angular Showcase is an **Angular-only learning platform** designed to teach reusable front-end architecture patterns through concrete, runnable examples.

This project is not a generic component gallery and not a multi-framework comparison sandbox. Every feature should strengthen pattern recognition in Angular.

## Guiding Objectives
1. **Teach patterns, not just APIs** (container/presentational split, facades, reactive state, composition).
2. **Make complexity progressive** (start simple, reveal depth on demand).
3. **Keep examples production-shaped** (clear boundaries, maintainable structure, testable logic).
4. **Keep contributors aligned** through predictable conventions.

## Architectural Layers

### 1) Learning Experience Layer (UI)
- Route-level feature pages (`src/app/[feature]`)
- Reusable UI building blocks (`src/app/components`)
- Navigation and context-retention patterns (cards, modals, internal linking)

**Responsibility:** present concepts in incremental steps without breaking learning flow.

### 2) Pattern Demonstration Layer (Feature Logic)
- Feature-specific examples for Angular concepts (signals, forms, http, ngrx, directives, etc.)
- Explicitly named pattern roles in code comments and file headers

**Responsibility:** show *why* a pattern exists and when to choose it.

### 3) Shared Domain & Service Layer
- Shared services (`src/services`, `src/app/services`)
- Shared models/types (`src/types`)
- Cross-feature utilities and adapters

**Responsibility:** centralize reusable behavior and keep feature pages focused.

### 4) State & Reactivity Layer
- Local state with Signals/RxJS where appropriate
- Global state examples in `src/app/store` for NgRx scenarios

**Responsibility:** demonstrate state patterns from simple local flows to structured global flows.

### 5) Styling System Layer
- Global SCSS foundations in `src/styles`
- Mobile-first, BEM-style class conventions, tokenized spacing/typography

**Responsibility:** keep visual consistency while reinforcing maintainable CSS architecture.

## Pattern-First Contributor Rules
- New code should map to an explicit learning pattern.
- Prefer extending an existing pattern example over introducing novelty.
- Keep route features self-contained, but extract cross-cutting logic to shared layers.
- Optimize for readability and teaching clarity over cleverness.

## Decision Heuristics
When proposing changes, validate against these checks:
- **Pattern clarity:** does this make the pattern easier to recognize?
- **Angular alignment:** is this idiomatic for modern Angular (standalone, typed, reactive)?
- **Progressive depth:** can a learner understand this in layers?
- **Maintainability:** will another contributor understand and extend this quickly?

## Non-Goals
- Becoming framework-agnostic in scope.
- Adding features that do not improve Angular pattern learning.
- Prioritizing visual novelty over educational clarity.
