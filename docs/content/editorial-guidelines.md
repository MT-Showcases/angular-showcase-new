# Editorial Guidelines for Learning Content

This document defines how to author and review `src/assets/content/learning-content.json`.

## 1) Audience and Goal

- Target: developers learning Angular from intermediate to advanced levels.
- Goal: every concept should move from understanding to practical implementation.
- Preferred style: concise, concrete, action-oriented.

## 2) Required JSON Contract

Each concept **must** remain compatible with `src/types/learning-content.ts`:

- `id: string` (stable, kebab-case, unique)
- `title: string`
- `summary: string`
- `tags: string[]`
- `depthLevels: DepthLevelId[]` where `DepthLevelId` is only:
  - `intro`
  - `guided`
  - `applied`
  - `mastery`
- `relatedTopics: RelatedTopicRef[]`
  - `topicId: string`
  - `relation: 'prerequisite' | 'supports' | 'extends' | 'alternative'`
  - `note?: string`
- `examples: LearningExample[]`
  - `id: string` (unique inside concept)
  - `title: string`
  - `format: 'analogy' | 'snippet' | 'exercise' | 'case-study'`
  - `prompt: string`
  - `solution?: string`
  - `difficulty: 'easy' | 'medium' | 'hard'`

## 3) Content Quality Rules

For every concept:

1. Include at least one actionable `exercise` example.
2. Keep `summary` to one focused sentence.
3. Provide at least 2 `relatedTopics` when possible.
4. Ensure `depthLevels` represent realistic progression.
5. Use practical prompts that can be implemented in this project.

## 4) Writing Guidelines

- Prefer explicit tasks over theory-only descriptions.
- Use consistent terminology for Angular primitives (signals, providers, routes, facades, effects).
- Avoid buzzwords without implementation detail.
- Keep prompts measurable ("implement", "refactor", "add", "measure").
- Prefer deterministic outcomes in `solution` fields.

## 5) ID and Naming Conventions

- Concept IDs: kebab-case nouns, e.g. `route-level-code-splitting`.
- Example IDs: `<concept-id>-<type-or-purpose>`.
- Do not rename existing IDs without migration plan (other references may depend on them).

## 6) Review Checklist (PR Ready)

Before merging:

- [ ] JSON is valid and formatted.
- [ ] All concepts conform to the TypeScript interfaces.
- [ ] Every concept includes at least one `exercise`.
- [ ] `topicId` references are intentional and semantically correct.
- [ ] Difficulty values use only allowed literals.
- [ ] No unsupported enum values were introduced.
- [ ] Version and `generatedAt` updated when content changes materially.

## 7) Suggested Validation Steps

- Run TypeScript checks/build to ensure no compile-time regressions.
- Manually load the app section using `LearningContentFacade` and verify:
  - concepts load,
  - filtering by depth works,
  - no runtime errors from malformed fields.

## 8) Scope Management

When adding many concepts:

- Batch related edits in one commit.
- Keep conceptual overlap minimal.
- Prefer fewer high-quality concepts over many repetitive ones.
