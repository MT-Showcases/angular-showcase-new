# Maintainer workflow (triage → review → release-lite)

This is a lightweight process for keeping contributions moving without heavy ceremony.

## Goals

- Keep first response time low for contributors.
- Keep CI and review expectations predictable.
- Ship small, safe updates often.

---

## 1) Triage (issues + PRs)

### Issue triage checklist

Run this checklist when a new issue arrives:

1. **Reproduce / clarify quickly**
   - If unclear, ask one focused follow-up question.
2. **Label it**
   - Suggested baseline labels: `bug`, `enhancement`, `learning-content`, `pattern-request`, `good first issue`, `needs-info`.
3. **Set priority**
   - P0: blocking bug/regression
   - P1: high-value improvement
   - P2: nice-to-have/backlog
4. **Define done**
   - Add or confirm acceptance criteria in the issue.

### PR triage checklist

For each PR:

1. Confirm CI status is green.
2. Check scope is focused (avoid bundling unrelated changes).
3. Add labels (`ready-for-review`, `needs-work`, etc.).
4. Assign reviewer or self-review queue.

**SLA suggestion:** first maintainer response within 48h on weekdays.

---

## 2) Review process

### What reviewers should verify

- **Correctness:** change does what it claims.
- **Learning value:** examples and docs are understandable.
- **Quality bar:** lint/build/tests pass in CI.
- **Scope:** no unrelated refactors.
- **Docs:** update docs when behavior or patterns change.

### Review style

- Prefer actionable comments over broad criticism.
- Be explicit about blocking vs non-blocking feedback.
- Offer a quick path to merge for first-time contributors.

### Merge criteria

A PR can be merged when:

- CI is green (`lint`, `build`, `test`).
- At least one maintainer approves.
- Blocking feedback is addressed.
- Changelog/release note impact is captured (if user-facing).

---

## 3) Release-lite

Use release-lite for quick, low-overhead shipping.

### When to release

- At least one meaningful merged change, or
- A fix users are waiting for.

### Steps

1. Pull latest `main`.
2. Sanity check locally:
   - `npm ci`
   - `npm run lint`
   - `npm run build`
   - `npm run test:ci`
3. Create a tag (semantic versioning recommended):
   - Patch: fixes/docs-only examples
   - Minor: new non-breaking pattern content
   - Major: breaking changes
4. Publish release notes (brief):
   - Highlights
   - Breaking changes (if any)
   - Contributor credits

### Rollback mindset

If a release causes regressions:

- Revert fast.
- Ship a patch with a short postmortem note in the release description.

---

## Contributor-friendly defaults

- Keep PRs small and reviewable.
- Prefer docs + examples in the same PR when possible.
- Automate checks in CI; avoid manual gates unless necessary.
- Use issue templates to reduce back-and-forth and speed up triage.
