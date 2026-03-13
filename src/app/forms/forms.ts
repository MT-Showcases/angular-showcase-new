/**
 * PATTERN: Angular Reactive Forms
 *
 * WHY: I Reactive Forms (FormBuilder, FormGroup, FormControl) sono il modo
 *      "Angular way" per gestire form complessi con validazione. La logica
 *      del form vive nel TypeScript (testabile, esplicita) invece che nel template.
 *
 * QUANDO USARLO:
 *   - Form con validazione complessa (multi-field, async validators)
 *   - Form che devono essere testati con unit test
 *   - Form che cambiano struttura dinamicamente
 *   - Quando hai bisogno di osservare i cambiamenti del form (valueChanges observable)
 *
 * ALTERNATIVA — Template-driven Forms:
 *   - Più semplici per form piccoli (usa ngModel, simile ad Angular.js)
 *   - Meno testabili (la logica è nel template)
 *   - Usa FormsModule invece di ReactiveFormsModule
 *   - Esempio: <input [(ngModel)]="name" required minlength="3">
 *   - QUANDO USARLI: form semplici di 2-3 campi senza logica complessa
 *
 * ANTI-PATTERN:
 *   - Mescolare Template-driven e Reactive Forms nello stesso componente
 *   - Accedere direttamente all'input del DOM per leggere i valori
 *   - Creare FormControl manualmente invece di usare FormBuilder
 *   - Dimenticare di gestire lo stato "touched" per la validazione UI
 */

// COMPONENT TYPE: Container
// SECTION: Angular Basics
//
// ROLE:
// - Demonstrate Angular Reactive Forms with validation
// - Show FormBuilder, FormGroup, and FormControl usage
// - Provide real-time validation feedback with visual indicators
//
// PATTERNS USED:
// - Reactive Forms pattern (FormBuilder, FormGroup)
// - Built-in and custom validators
// - Real-time validation with visual feedback (icons, error messages)
//
// NOTES FOR CONTRIBUTORS:
// - Use Reactive Forms (not Template-driven) for consistency
// - Add validators inline when creating the form group
// - Keep validation logic simple and educational
// - Show validation states visually (check/error icons)

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PageHeader } from '../page-header/page-header';
import { Icon } from '../components/icon/icon';

@Component({
  selector: 'app-forms',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, PageHeader, Icon],
  templateUrl: './forms.html',
  styleUrl: './forms.scss',
})
export class Forms {
  // FormGroup: il contenitore del form — raccoglie tutti i FormControl
  // WHY: il FormGroup ci dà accesso allo stato globale del form (valid, dirty, touched)
  //      e ci permette di leggere tutti i valori in un unico oggetto con .value
  reactiveForm: FormGroup;

  // WHY FormBuilder: è un servizio helper che abbrevia la sintassi.
  // Invece di: new FormGroup({ name: new FormControl('', [Validators.required]) })
  // Scrivi:    this.fb.group({ name: ['', [Validators.required]] })
  // Il risultato è identico, ma più conciso e leggibile.
  constructor(private fb: FormBuilder) {
    // Crea il form con FormBuilder.group()
    // Ogni chiave è un FormControl: [valoreIniziale, validatori]
    this.reactiveForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,       // Campo obbligatorio
          Validators.minLength(3),   // Minimo 3 caratteri
          Validators.maxLength(20),  // Massimo 20 caratteri
          Validators.pattern('^[a-zA-Z]+$'), // Solo lettere (regex)
        ],
      ],
      surname: [
        '',
        Validators.required,  // Un solo validator: si passa direttamente (non array)
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,  // Valida formato email (base)
          // Pattern più restrittivo del validator email built-in:
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  onSubmit() {
    // WHY: controlliamo this.reactiveForm.valid prima di procedere.
    // Il button [disabled]="reactiveForm.invalid" previene il submit UI,
    // ma questa validazione lato TS è necessaria per sicurezza
    // (il button disabled può essere bypassato dagli utenti).
    if (this.reactiveForm.valid) {
      console.log('Form reattivo inviato:', this.reactiveForm.value);
      alert('Form reattivo inviato con successo!');
    } else {
      // markAllAsTouched() mostrerebbe gli errori su tutti i campi intoccati
      // this.reactiveForm.markAllAsTouched();
      console.log('Form reattivo non valido', this.reactiveForm.controls);
      alert('Form reattivo non valido. Controlla i campi e riprova.');
    }
  }

  onReset() {
    // reset() azzera tutti i valori E lo stato (touched, dirty, valid)
    // WHY: senza reset() i messaggi di errore rimarrebbero visibili
    // anche dopo aver svuotato i campi manualmente.
    this.reactiveForm.reset();
  }
}
