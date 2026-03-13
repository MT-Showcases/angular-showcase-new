# Accessibility and Navigation Specification (Learning UX)

## Purpose
Ensure progressive-depth learning is navigable and accessible for keyboard users, screen-reader users, and learners with different cognitive loads.

Scope: documentation-level UX rules for Angular Showcase learning routes and pattern flows.

---

## 1) Core Accessibility Principles

1. **Perceivable learning structure**
   - Every page communicates: what this page teaches, current depth level, and next step.
2. **Operable interactions**
   - All interactive learning controls are fully keyboard reachable and visible on focus.
3. **Understandable progression**
   - Navigation labels describe outcome, not just topic (e.g., “Practice container split”).
4. **Robust semantics**
   - Use semantic landmarks/headings so assistive tech can traverse by region.

---

## 2) Information Architecture for Learning Navigation

## 2.1 Primary route groups (existing)
- Basics: data binding, directives, forms
- Advanced: signals, HTTP/facade
- State: BehaviorSubject, NgRx
- Examples: users

## 2.2 Learning-depth model per page
Each page should expose the same internal navigation anchors:
1. Overview
2. Pattern snapshot
3. Guided practice
4. Deep dive
5. Self-check
6. Next concept

This consistency reduces orientation cost and improves accessibility.

---

## 3) Keyboard Navigation Requirements

- Tab order must follow visual and logical learning sequence.
- Provide “Skip to content” at top of page.
- Provide “Skip to practice” when page has long conceptual intro.
- Do not trap keyboard focus except in explicit modal/dialog contexts.
- In dialogs/panels:
  - initial focus on title or first actionable item
  - `Esc` closes
  - focus returns to trigger element on close

**Visible focus**
- High-contrast focus indicator on all interactive elements
- Do not remove default outline unless replaced with equivalent or better style

---

## 4) Screen Reader and Semantics Requirements

- One `h1` per page: learning objective
- Section headings in descending order (`h2`, `h3`)
- Landmark usage:
  - `header` for page identity
  - `nav` for route and depth navigation
  - `main` for lesson content
  - `aside` for related references/hints
- Icon-only controls require accessible names
- Pattern chips must expose text labels and state (`expanded/collapsed` where applicable)
- Practice step progress should be announced (e.g., “Step 2 of 5”)

---

## 5) Progressive Disclosure Accessibility Rules

- Expand/collapse controls must expose `aria-expanded` and `aria-controls`
- Hidden sections should not be focusable until opened
- When deep content opens inline, announce context change with a polite live region
- Do not rely on color alone to communicate state/tool choice

---

## 6) Learning-Oriented Navigation Components

## 6.1 Breadcrumbs (concept depth)
Format:
- `Topic > Pattern > Practice > Deep Dive`

Rules:
- Current item marked with `aria-current="page"`
- Labels should be learning-action oriented

## 6.2 Pattern badges/chips
- Must be keyboard actionable if interactive
- Opening a badge detail should not unexpectedly move focus far from trigger

## 6.3 Next-step links
- Include “why next” helper text
- Example: “Next: BehaviorSubject (learn shared reactive state across components)”

---

## 7) Content Readability and Cognitive Accessibility

- Keep paragraphs short (2–4 lines typical)
- Use bullet points for responsibilities and trade-offs
- Define terms on first use in plain language
- Provide examples before theory where possible
- Avoid sudden jumps in complexity within a single section
- Keep CTA language concrete: “Classify responsibilities”, “Choose state strategy”

---

## 8) Motion, Contrast, and Feedback

- Respect reduced-motion preferences for transitions/animations
- Ensure text and UI controls meet contrast expectations (WCAG AA target)
- Validation/error feedback must include text, not only color or icon
- Async states in demos should be explicit: loading, success, error

---

## 9) Route-Level Navigation Spec (Learning continuity)

Recommended route progression for first-time learners:
1. `/` (orientation)
2. `/examples/users` (container/presentational in context)
3. `/advanced/http` (facade boundary)
4. `/advanced/signals` (local reactive state)
5. `/state/behavior-subject` (shared reactive state)
6. `/state/ngrx` (global structured state)

Each step should include:
- “Prerequisite from previous page” note
- “What changes at this depth” note
- “When to use this pattern” summary

---

## 10) Accessibility Acceptance Checklist

A page is ready when all are true:
- [ ] Keyboard-only user can complete full learning flow
- [ ] Focus order follows learning sequence
- [ ] Headings and landmarks are semantically correct
- [ ] Expand/collapse states are announced to assistive tech
- [ ] Practice steps are understandable without visual-only cues
- [ ] Next-step navigation explains pedagogical reason
- [ ] Color contrast and focus visibility are adequate

---

## 11) Testing Guidance (manual)

- Keyboard walkthrough: Tab/Shift+Tab/Enter/Space/Escape
- Screen reader smoke test (VoiceOver/NVDA): landmarks, headings, expanding sections
- Zoom test at 200%: no content loss, no horizontal traps for core flows
- Reduced motion preference enabled: interactions remain understandable

This spec supports a learning-first experience where accessibility is not an add-on, but part of how pattern understanding is delivered.
