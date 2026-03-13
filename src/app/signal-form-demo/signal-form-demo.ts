// COMPONENT TYPE: Container (Smart)
// SECTION: Signal-Based Forms Demo
//
// ROLE:
// - Demonstrate how to build forms using Angular Signals instead of ReactiveForms
// - Show computed validation, derived UI state, and effect-based autosave
// - Serve as a concrete, explorable example for the "Signal-Based Forms" learning concept
//
// PATTERNS USED:
// - Signal-based form state: each field is a writable signal
// - Computed validation: error messages auto-recalculate when fields change
// - Derived UI state: isValid, isDirty, canSubmit are all computed from field signals
// - Effect for side effects: autosave to localStorage
//
// WHY SIGNALS INSTEAD OF REACTIVE FORMS?
// - Less boilerplate: no FormGroup, FormControl, Validators.required
// - Better type safety: computed signals are fully typed
// - Simpler mental model: "value changes → derived values recalculate"
// - Perfect fit for simple-to-medium forms (3-10 fields)
// - For complex dynamic forms (FormArray, nested groups), ReactiveForms is still better
//
// NOTES FOR CONTRIBUTORS:
// - Keep this component self-contained — no external services needed
// - Every pattern choice should have a comment explaining WHY
// - This is a teaching tool: clarity > cleverness

import { Component, signal, computed, effect, ChangeDetectionStrategy } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { PageHeader } from '../page-header/page-header';
import { CodeBlock } from '../components/code-block/code-block';

@Component({
  selector: 'app-signal-form-demo',
  imports: [PageHeader, CodeBlock, JsonPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // PEDAGOGICAL NOTE: OnPush + Signals is the modern Angular performance combo.
  // Signals automatically notify Angular when they change, so OnPush works perfectly
  // without any manual markForCheck() calls.
  template: `
    <app-page-header
      title="Signal-Based Forms"
      description="Build reactive forms using Angular Signals — no ReactiveForms module needed."
    />

    <div class="demo-container">
      <!-- ═══════════════════════════════════════════════════════════
           SECTION 1: The Signal Form
           Each field is a writable signal. Validation is computed.
           ═══════════════════════════════════════════════════════════ -->
      <section class="form-section">
        <h2>📝 Contact Form (Signal-Powered)</h2>

        <div class="form-group">
          <label for="name">Name</label>
          <input
            id="name"
            type="text"
            [value]="name()"
            (input)="name.set($any($event.target).value)"
            [class.invalid]="nameError() && nameTouched()"
            (blur)="nameTouched.set(true)"
            placeholder="Your name"
          />
          <!-- PEDAGOGICAL NOTE: We only show errors after the field is "touched" (blurred).
               This prevents showing errors while the user is still typing for the first time. -->
          @if (nameError() && nameTouched()) {
            <span class="error">{{ nameError() }}</span>
          }
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            [value]="email()"
            (input)="email.set($any($event.target).value)"
            [class.invalid]="emailError() && emailTouched()"
            (blur)="emailTouched.set(true)"
            placeholder="your@email.com"
          />
          @if (emailError() && emailTouched()) {
            <span class="error">{{ emailError() }}</span>
          }
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea
            id="message"
            [value]="message()"
            (input)="message.set($any($event.target).value)"
            [class.invalid]="messageError() && messageTouched()"
            (blur)="messageTouched.set(true)"
            placeholder="Your message..."
            rows="4"
          ></textarea>
          @if (messageError() && messageTouched()) {
            <span class="error">{{ messageError() }}</span>
          }
        </div>

        <!-- PEDAGOGICAL NOTE: The button's disabled state is a computed signal.
             It auto-updates when ANY field changes. No manual wiring needed! -->
        <button
          [disabled]="!canSubmit()"
          (click)="onSubmit()"
          class="submit-btn"
        >
          {{ submitLabel() }}
        </button>

        @if (submitted()) {
          <div class="success-message">
            ✅ Form submitted successfully! Check the console for the payload.
          </div>
        }
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 2: Live State Inspector
           Shows the reactive state in real-time for learning purposes
           ═══════════════════════════════════════════════════════════ -->
      <section class="inspector-section">
        <h2>🔍 Signal State Inspector</h2>
        <p class="inspector-note">Watch these values update in real-time as you type:</p>

        <div class="state-grid">
          <div class="state-item">
            <span class="state-label">isValid</span>
            <span [class]="isValid() ? 'state-value valid' : 'state-value invalid'">
              {{ isValid() }}
            </span>
          </div>
          <div class="state-item">
            <span class="state-label">isDirty</span>
            <span class="state-value">{{ isDirty() }}</span>
          </div>
          <div class="state-item">
            <span class="state-label">canSubmit</span>
            <span class="state-value">{{ canSubmit() }}</span>
          </div>
          <div class="state-item">
            <span class="state-label">fieldCount</span>
            <span class="state-value">3 fields, {{ errorCount() }} errors</span>
          </div>
        </div>

        <h3>Current Values</h3>
        <pre class="state-json">{{ formSnapshot() | json }}</pre>
      </section>

      <!-- ═══════════════════════════════════════════════════════════
           SECTION 3: Code Examples
           ═══════════════════════════════════════════════════════════ -->
      <section class="code-section">
        <h2>💡 How It Works</h2>

        <app-code-block
          title="Field Signals + Computed Validation"
          language="typescript"
          [code]="fieldSignalCode"
        />

        <app-code-block
          title="Derived Form State"
          language="typescript"
          [code]="derivedStateCode"
        />
      </section>
    </div>
  `,
  styles: [`
    .demo-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }
    .form-section, .inspector-section, .code-section {
      background: var(--surface-color, #1e1e2e);
      border-radius: 12px;
      padding: 1.5rem;
    }
    .form-group {
      margin-bottom: 1rem;
    }
    .form-group label {
      display: block;
      margin-bottom: 0.25rem;
      font-weight: 600;
      color: var(--text-color, #cdd6f4);
    }
    .form-group input, .form-group textarea {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border: 2px solid var(--border-color, #45475a);
      border-radius: 8px;
      background: var(--input-bg, #181825);
      color: var(--text-color, #cdd6f4);
      font-size: 1rem;
      box-sizing: border-box;
      transition: border-color 0.2s;
    }
    .form-group input:focus, .form-group textarea:focus {
      outline: none;
      border-color: var(--primary-color, #89b4fa);
    }
    .form-group input.invalid, .form-group textarea.invalid {
      border-color: var(--error-color, #f38ba8);
    }
    .error {
      color: var(--error-color, #f38ba8);
      font-size: 0.85rem;
      margin-top: 0.25rem;
      display: block;
    }
    .submit-btn {
      padding: 0.6rem 1.5rem;
      border: none;
      border-radius: 8px;
      background: var(--primary-color, #89b4fa);
      color: var(--on-primary, #1e1e2e);
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: opacity 0.2s;
    }
    .submit-btn:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    .success-message {
      margin-top: 1rem;
      padding: 0.75rem;
      background: var(--success-bg, #1e3a2f);
      border-radius: 8px;
      color: var(--success-color, #a6e3a1);
    }
    .state-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 0.75rem;
      margin: 1rem 0;
    }
    .state-item {
      background: var(--input-bg, #181825);
      padding: 0.75rem;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .state-label {
      font-size: 0.75rem;
      text-transform: uppercase;
      color: var(--text-muted, #6c7086);
    }
    .state-value {
      font-weight: 600;
      font-family: monospace;
    }
    .state-value.valid { color: var(--success-color, #a6e3a1); }
    .state-value.invalid { color: var(--error-color, #f38ba8); }
    .state-json {
      background: var(--input-bg, #181825);
      padding: 1rem;
      border-radius: 8px;
      overflow-x: auto;
      font-size: 0.85rem;
    }
    .inspector-note {
      color: var(--text-muted, #6c7086);
      font-style: italic;
    }
  `]
})
export class SignalFormDemo {
  // ═══════════════════════════════════════════════════════════════
  // FIELD SIGNALS
  // WHY: Each form field is a writable signal. This is the simplest
  // reactive primitive — no FormControl wrapper needed.
  // ═══════════════════════════════════════════════════════════════
  readonly name = signal('');
  readonly email = signal('');
  readonly message = signal('');

  // TOUCHED STATE
  // WHY: Track whether the user has interacted with each field.
  // We only show validation errors after the field loses focus (blur).
  // This prevents annoying "required" errors while the user is still typing.
  readonly nameTouched = signal(false);
  readonly emailTouched = signal(false);
  readonly messageTouched = signal(false);

  // SUBMISSION STATE
  readonly submitted = signal(false);

  // ═══════════════════════════════════════════════════════════════
  // COMPUTED VALIDATION
  // WHY: Validation is a pure function of the field value.
  // computed() auto-recalculates when the source signal changes.
  // No manual subscription, no valueChanges observable — just derived state.
  // ═══════════════════════════════════════════════════════════════
  readonly nameError = computed(() =>
    this.name().trim().length < 2 ? 'Name must be at least 2 characters' : null
  );

  readonly emailError = computed(() => {
    const val = this.email().trim();
    if (!val) return 'Email is required';
    if (!val.includes('@') || !val.includes('.')) return 'Enter a valid email';
    return null;
  });

  readonly messageError = computed(() =>
    this.message().trim().length < 10 ? 'Message must be at least 10 characters' : null
  );

  // ═══════════════════════════════════════════════════════════════
  // DERIVED FORM STATE
  // WHY: These are all computed from field signals — they auto-update
  // when ANY field changes. No manual wiring, no subscribe callbacks.
  // This is the power of signal composition.
  // ═══════════════════════════════════════════════════════════════
  readonly isValid = computed(() =>
    !this.nameError() && !this.emailError() && !this.messageError()
  );

  readonly isDirty = computed(() =>
    this.name() !== '' || this.email() !== '' || this.message() !== ''
  );

  readonly canSubmit = computed(() =>
    this.isValid() && this.isDirty() && !this.submitted()
  );

  readonly errorCount = computed(() =>
    [this.nameError(), this.emailError(), this.messageError()].filter(Boolean).length
  );

  readonly submitLabel = computed(() =>
    this.submitted() ? 'Submitted ✓' : this.isValid() ? 'Submit' : 'Fix errors to submit'
  );

  // PEDAGOGICAL NOTE: formSnapshot is a computed that creates a plain object
  // snapshot of all signals. This is useful for debugging and for the State Inspector UI.
  readonly formSnapshot = computed(() => ({
    name: this.name(),
    email: this.email(),
    message: this.message(),
    isValid: this.isValid(),
    isDirty: this.isDirty(),
  }));

  // ═══════════════════════════════════════════════════════════════
  // AUTOSAVE EFFECT (commented out — uncomment to enable)
  // WHY: effect() runs whenever the signals it reads change.
  // It auto-tracks dependencies — no manual dependency list needed.
  // Use effects SPARINGLY: only for side effects like saving, logging, analytics.
  // ═══════════════════════════════════════════════════════════════
  // private autosaveEffect = effect(() => {
  //   const snapshot = this.formSnapshot();
  //   // Save to localStorage whenever form changes
  //   localStorage.setItem('signal-form-draft', JSON.stringify(snapshot));
  // });

  onSubmit(): void {
    if (!this.canSubmit()) return;
    console.log('📨 Signal Form submitted:', this.formSnapshot());
    this.submitted.set(true);

    // PEDAGOGICAL NOTE: In a real app, you'd call a service here.
    // The signal form approach makes it trivial to read current values —
    // just call the signals. No form.value or form.getRawValue() needed.
  }

  // ═══════════════════════════════════════════════════════════════
  // CODE EXAMPLES (for the CodeBlock component)
  // ═══════════════════════════════════════════════════════════════
  readonly fieldSignalCode = `// Each field is a writable signal — the simplest reactive primitive
name = signal('');
email = signal('');

// Validation is computed — auto-recalculates when the field changes
nameError = computed(() =>
  this.name().trim().length < 2 ? 'Name too short' : null
);

emailError = computed(() =>
  this.email().includes('@') ? null : 'Invalid email'
);

// Template binding:
// <input [value]="name()" (input)="name.set($event.target.value)">
// @if (nameError()) { <span class="error">{{ nameError() }}</span> }`;

  readonly derivedStateCode = `// All derived from field signals — auto-update, zero wiring
isValid = computed(() => !this.nameError() && !this.emailError());
isDirty = computed(() => this.name() !== '' || this.email() !== '');
canSubmit = computed(() => this.isValid() && this.isDirty());

// Submit reads current signal values directly
onSubmit() {
  console.log({ name: this.name(), email: this.email() });
}`;
}
