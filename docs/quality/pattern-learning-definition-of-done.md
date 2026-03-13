# Pattern-Learning Definition of Done

Use this checklist before opening or approving a PR.

## 1) Learning Value
- [ ] The change teaches or reinforces at least one Angular pattern.
- [ ] The pattern intent is explicit in naming, structure, or comments.
- [ ] The solution improves clarity for learners, not only implementation detail.

## 2) Angular Quality Bar
- [ ] Uses modern Angular conventions (standalone components, typed APIs, reactive approach).
- [ ] No unnecessary abstractions or framework-agnostic detours.
- [ ] Feature logic is separated from presentational concerns where relevant.

## 3) Code & Style Standards
- [ ] TypeScript is strict-friendly and readable.
- [ ] SCSS follows project conventions (`@use 'globals' as *;`, mobile-first, BEM-like classes, `rem()` sizing).
- [ ] Naming is consistent with existing feature and component structure.

## 4) Testing & Verification
- [ ] Existing tests pass locally.
- [ ] New behavior has appropriate tests, or a documented rationale if not required.
- [ ] Manual verification steps are included in the PR for UI/interaction changes.

## 5) Documentation & DX
- [ ] README/CONTRIBUTING/docs are updated when behavior or workflow changes.
- [ ] Example usage and limits are clear for contributors.
- [ ] No dead links, stale instructions, or ambiguous TODOs introduced.

## 6) PR Readiness
- [ ] PR scope is focused and reviewable.
- [ ] Commits are clean and descriptive.
- [ ] PR description explains **what changed**, **why**, and **how to validate**.

---

## Fast Gate (minimum to merge)
A PR is merge-ready when:
1. Pattern-learning objective is clear.
2. Angular conventions are respected.
3. Tests/checks pass.
4. Documentation impact is handled.
