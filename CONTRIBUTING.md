# Contributing to Angular Showcase

Thanks for helping improve Angular Showcase.

This project is **Angular-only** and education-driven: every contribution should improve how learners understand reusable Angular patterns.

## Contributor Workflow
1. **Open or pick an issue**
   - Confirm the learning objective and expected pattern impact.
2. **Create a branch**
   - `feat/<short-description>` or `fix/<short-description>`.
3. **Implement focused changes**
   - Keep PRs small and reviewable.
4. **Run quality checks**
   - `npm test`
   - `npm run build`
5. **Update docs if needed**
   - README / architecture / quality docs when behavior or conventions change.
6. **Open a PR**
   - Include: problem, approach, pattern-learning value, validation steps.

## Coding Standards (Summary)

### Angular & TypeScript
- Prefer modern Angular practices (standalone components, typed APIs, reactive patterns).
- Keep container/presentational boundaries clear when applicable.
- Avoid unnecessary abstractions; prioritize readability and teachability.

### SCSS
- Use `@use 'globals' as *;`.
- Follow mobile-first breakpoints.
- Use class-based selectors and BEM-style naming.
- Use `rem()` sizing conventions from project styles.

### Documentation
- Keep comments and docs concise, in English.
- Document intent and pattern role, not obvious syntax.
- Add/update docs for any contributor-facing workflow change.

## Definition of Done
A PR is ready when it satisfies the checklist in:
- [docs/quality/pattern-learning-definition-of-done.md](docs/quality/pattern-learning-definition-of-done.md)

## Review Expectations
- Be respectful and specific.
- Suggest improvements with rationale.
- Prefer actionable comments over broad criticism.
