# Progressive Depth Interaction Model

## Overview

The Progressive Depth Navigation system is a cornerstone of the learning-first UX philosophy. It allows users to dive deeper into complex Angular patterns without losing their context. Instead of traditional page navigation, the system relies on a sequence of progressive disclosures:

**Depth Level 1:** Card (Surface overview)
**Depth Level 2:** Modal (Focused summary)
**Depth Level 3:** Side Panel (Detailed exploration)
**Depth Level 4:** Inline Expansion (Deep dive / Code snippets)
**Depth Level 5:** Breadcrumb Trail / Full View (Immersive mode)

This progressive approach reduces cognitive load by keeping the user anchored to their original learning path, letting them dip in and out of complexity as needed.

---

## 1. Interaction Model & States

### Depth 1: The Card (Surface)
- **Role:** The entry point. Provides high-level summary and an invitation to learn more.
- **Visuals:** Grid or list item. Contains title, brief description, and tags.
- **Interaction:** Clicking the card triggers Depth 2.
- **States:** Default, Hover (elevation increase), Focus (outline), Active.
- **Transitions:** Quick scale-up on hover.

### Depth 2: The Modal (Focused Summary)
- **Role:** Intermediate context. Offers enough detail to decide if a deeper dive is necessary without leaving the main view.
- **Visuals:** Centered overlay with backdrop blur. Contains abstract, key benefits, and a "Deep Dive" button.
- **Interaction:** Clicking outside or hitting Escape closes it. Clicking "Deep Dive" triggers Depth 3.
- **States:** Entering, Entered, Exiting.
- **Transitions:** Fade in + slight translate-up (ease-out).

### Depth 3: The Side Panel (Detailed Exploration)
- **Role:** Comprehensive learning. The user is committed to reading/learning.
- **Visuals:** Drawer sliding from the right edge, pushing or overlaying main content. Contains tabs (e.g., Overview, API, Examples).
- **Interaction:** Can be pinned or dismissed. Contains sections that can expand.
- **States:** Collapsed (hidden), Expanded (visible), Pinned.
- **Transitions:** Slide-in from right (ease-in-out).

### Depth 4: Inline Expansion (Code Deep Dive)
- **Role:** Micro-exploration. Used within the Side Panel to show code snippets or specific configurations.
- **Visuals:** Accordion-style expandable rows inside the panel.
- **Interaction:** Click to expand/collapse.
- **States:** Collapsed, Expanded.
- **Transitions:** Smooth height transition (animate-height).

### Depth 5: Breadcrumb Trail & Immersive View
- **Role:** Navigational anchor. When the user reaches maximum depth (e.g., navigating links inside the Side Panel), a breadcrumb trail appears at the top of the panel to prevent disorientation.
- **Visuals:** Horizontal list of links (`Home > Pattern > Concept > Detail`).
- **Interaction:** Clicking a breadcrumb steps back the corresponding depth level.
- **States:** Interactive links.
- **Transitions:** Fade-in when crossing into depth 5.

---

## 2. Accessibility (A11y) Requirements

- **Focus Management:** 
  - Modal (D2): Trap focus. Return focus to the originating Card (D1) on close.
  - Side Panel (D3): Shift focus to the panel header on open. Return focus to Modal (or Card) on close.
- **ARIA Roles:**
  - Modal: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
  - Side Panel: `role="complementary"` or `role="region"`.
  - Expansions: `aria-expanded="true/false"`, `aria-controls`.
- **Keyboard Navigation:** Full support for `Tab`, `Shift+Tab`, `Escape` (to close modals/panels), and `Enter/Space` (to toggle expansions).
- **Screen Readers:** Announce context changes clearly (e.g., "Navigated to Details panel").

---

## 3. Angular Component Contracts (Interface Specs)

Below are the strictly defined Angular component contracts using Inputs, Outputs, and Signals. No implementation details.

### Depth 1: CardComponent
```typescript
import { Component, input, output } from '@angular/core';
import { PatternSummary } from '@models/pattern';

@Component({
  selector: 'app-pattern-card',
  standalone: true,
  template: `...`
})
export class PatternCardComponent {
  // Inputs
  pattern = input.required<PatternSummary>();
  
  // Outputs
  openModal = output<string>(); // Emits pattern ID
}
```

### Depth 2: ModalComponent
```typescript
import { Component, input, output, signal } from '@angular/core';
import { PatternDetails } from '@models/pattern';

@Component({
  selector: 'app-pattern-modal',
  standalone: true,
  template: `...`
})
export class PatternModalComponent {
  // Inputs
  isOpen = input<boolean>(false);
  details = input<PatternDetails | null>(null);
  
  // Outputs
  close = output<void>();
  openSidePanel = output<string>(); // Emits pattern ID for deeper dive
  
  // Internal State
  isLoading = signal<boolean>(false);
}
```

### Depth 3: SidePanelComponent
```typescript
import { Component, input, output, signal } from '@angular/core';
import { FullPatternSpec } from '@models/pattern';

@Component({
  selector: 'app-side-panel',
  standalone: true,
  template: `...`
})
export class SidePanelComponent {
  // Inputs
  isOpen = input<boolean>(false);
  content = input<FullPatternSpec | null>(null);
  
  // Outputs
  close = output<void>();
  depthIncreased = output<string>(); // Emits new context ID for breadcrumbs
  
  // Internal State
  activeTab = signal<'overview' | 'api' | 'examples'>('overview');
}
```

### Depth 4: InlineExpansionComponent
```typescript
import { Component, input, output, model } from '@angular/core';

@Component({
  selector: 'app-inline-expansion',
  standalone: true,
  template: `...`
})
export class InlineExpansionComponent {
  // Inputs
  title = input.required<string>();
  
  // Two-way binding for state (Signals model)
  isExpanded = model<boolean>(false);
  
  // Outputs
  toggled = output<boolean>();
}
```

### Depth 5: BreadcrumbNavComponent
```typescript
import { Component, input, output } from '@angular/core';

export interface BreadcrumbNode {
  id: string;
  label: string;
  depthLevel: number;
}

@Component({
  selector: 'app-breadcrumb-nav',
  standalone: true,
  template: `...`
})
export class BreadcrumbNavComponent {
  // Inputs
  trail = input.required<BreadcrumbNode[]>();
  
  // Outputs
  navigate = output<BreadcrumbNode>(); // Emits node to return to
}
```
