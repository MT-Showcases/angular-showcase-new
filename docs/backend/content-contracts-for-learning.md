# Content Contracts for Pattern-Learning (Lightweight Backend Strategy)

## Goal
Provide a **stable, typed content contract** for concept-based learning paths without introducing a separate backend service.

This design keeps content in versioned JSON files under `src/assets/content/` and exposes it through a small Angular facade.

---

## Why this approach
- No infrastructure overhead: no DB, no API server, no auth layer.
- Fast iteration for educational content.
- Easy migration path: same TypeScript contracts can be reused by a future real API.
- Works well for demo/showcase apps while preserving architecture discipline.

---

## Contract location
- JSON source: `src/assets/content/learning-content.json`
- Type contracts: `src/types/learning-content.ts`
- Facade/data-access: `src/services/learning-content.facade.ts`

---

## Contract shape
Top-level payload (`LearningContent`):

```ts
interface LearningContent {
  version: string;
  generatedAt: string; // ISO date-time
  depthLevels: DepthLevel[];
  concepts: LearningConcept[];
}
```

`DepthLevel` defines progression steps (`intro`, `guided`, `applied`, `mastery`).

`LearningConcept` is the core learning entity:
- metadata (`id`, `title`, `summary`, `tags`)
- available progression levels (`depthLevels`)
- graph references (`relatedTopics`)
- pedagogical units (`examples`)

---

## Design notes
1. **Versioned payload**
   - `version` supports future compatibility checks.

2. **Graph-ready relationships**
   - `relatedTopics` encodes prerequisite/support/extension links without requiring joins.

3. **Depth as first-class concept**
   - Concepts can be filtered by level via facade selectors (`conceptsByDepth`).

4. **Incremental backend migration**
   - Keep the interface contract stable.
   - Later replace JSON file with API endpoint returning same shape.

---

## Facade responsibilities
`LearningContentFacade` is the boundary between UI and content source.

Responsibilities:
- Load content from `assets/content/learning-content.json`.
- Expose typed, signal-driven selectors:
  - `content`
  - `depthLevels`
  - `concepts`
- Expose helper queries:
  - `conceptById(id)`
  - `conceptsByDepth(level)`
  - `relatedTopicsFor(conceptId)`
- Publish loading/error state for component UX.

This keeps components presentation-focused and backend-agnostic.

---

## Suggested future evolution
- Add lightweight runtime validation (e.g. zod/io-ts) before setting state.
- Split content by domain (`patterns.json`, `architecture.json`, etc.) if volume grows.
- Introduce `ContentRepository` token for swappable providers (assets/API/cache).
- Add ETag-based caching when moving to HTTP API.
