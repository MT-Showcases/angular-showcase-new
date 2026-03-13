# Angular Tech Audit — 2026-03-13

## Fix Sistematici (da applicare a TUTTE le pagine)
1. **SCSS - `color: #fff` / `color: white` / `rgba(255,255,255,0.x)`**: Mappati hardcoded ovunque (es. `directives.scss`, `home.scss`, `navbar.scss`, `data-binding.scss`, `forms.scss`, `bouncing-logo.scss`, `signals.scss`, `http-example.scss`, `behavior-subject.scss`, ecc.). In alcune pagine sono già stati fatti dei "WCAG FIX", ma rimangono diffusi nei file di molti componenti principali.
2. **SCSS - `:host`**: Molti file scss principali (es. `home.scss`, `data-binding.scss`, `directives.scss`, `forms.scss`, `signals.scss`, `http-example.scss`, `ngrx-concepts.scss`, `behavior-subject.scss`, `gof-reference.scss`) **non** hanno il blocco `:host { display: block; background: #ffffff; min-height: 100vh; }` richiesto per l'isolamento del gradiente viola globale.
3. **SCSS - `overflow`**: Presenza massiccia di `overflow: hidden`, `overflow-x: auto`, e simili gestiti a livello di singolo componente o tag invece che in un layout globale strutturato, causando potenziale clipping di shadow o dropdown.
4. **SCSS - `!important`**: Utilizzato come hack in `data-binding.scss`, `behavior-subject.scss`, `message-demo.scss`, `comparison-grid.component.scss`, `antipattern-box.component.scss` e `feature-card.scss`.
5. **TypeScript - `ChangeDetectionStrategy.OnPush`**: Manca nella stragrande maggioranza dei componenti (presente solo in 5 shared components, `signal-form-demo`, e `pattern-explorer`). 
6. **TypeScript - Tipizzazione `any` espliciti**: Trovati in `signal-form-demo.ts`, `code-block.ts`, `search-bar.ts`, `link-modal.ts`, e `modal.service.ts`.
7. **TypeScript - `subscribe` senza `takeUntilDestroyed`**: Molteplici subscription manuali non pulite, in particolare in `http-example.ts`, `behavior-subject.ts`, `message-demo.ts`, `link-modal.ts` e `learning-content.service.ts`.
8. **TypeScript - `HttpClient` in Component**: Violazione del pattern service in `facade-anti-pattern-fixer-lab.ts` (lab/esercizio, ma da verificare). `learning-content.service` e `http-example` lo iniettano correttamente, ma i commenti indicano che il fix è necessario nei laboratori.
9. **Template - `app-page-header`**: Ancora presente e utilizzato in `signal-form-demo.ts` e definito in `page-header.ts`. Va migrato a `app-section-header`.
10. **Template - `trackBy` su `@for` con non-primitivi**: Molti cicli `@for` usano `$index` o iteratori semplici su oggetti complessi (es. `signals.html`, `guide-step.html`, `concept-card.html`, `todo-demo.html`).

## Fix per Pagina

### home
- [ ] SCSS: Manca il blocco `:host` richiesto per isolamento background.
- [ ] SCSS: Hardcoded `color: white;` riga 138.
- [ ] TS: Manca `ChangeDetectionStrategy.OnPush`.

### data-binding
- [ ] SCSS: Manca blocco `:host`.
- [ ] SCSS: Hardcoded `color: white;`.
- [ ] SCSS: Uso di `margin-top: 0.75rem !important;`.
- [ ] SCSS: Scroll gestito localmente (`overflow-x: auto`).
- [ ] TS: Manca `ChangeDetectionStrategy.OnPush`.

### directives
- [ ] SCSS: Manca blocco `:host`.
- [ ] SCSS: Hardcoded `color: white;` e `color: #fff;` diffuso.
- [ ] SCSS: `overflow: hidden;` a riga 172.
- [ ] TS: Manca `ChangeDetectionStrategy.OnPush`.

### forms
- [ ] SCSS: Manca blocco `:host`.
- [ ] SCSS: Hardcoded `color: white;`.
- [ ] SCSS: Scroll gestito localmente (`overflow-x: auto;`).
- [ ] TS: Manca `ChangeDetectionStrategy.OnPush`.

### signals
- [ ] SCSS: Manca blocco `:host`.
- [ ] SCSS: Hardcoded `color: white;` diffuso.
- [ ] SCSS: Eccessivo uso di `overflow-x: auto` e `overflow-y: auto`.
- [ ] TS: Manca `ChangeDetectionStrategy.OnPush`.
- [ ] Template: `@for (item of items(); track $index)` - usare ID se disponibile.

### http-example
- [ ] SCSS: Manca blocco `:host`.
- [ ] TS: Manca `ChangeDetectionStrategy.OnPush`.
- [ ] TS: `subscribe` multipli senza `takeUntilDestroyed` o `async` pipe.

### ngrx-concepts
- [ ] SCSS: Manca blocco `:host`.
- [ ] SCSS: Hardcoded `color: white;`.
- [ ] TS: Manca `ChangeDetectionStrategy.OnPush`.

### behavior-subject
- [ ] SCSS: Manca blocco `:host`.
- [ ] SCSS: Hardcoded `color: #ffffff;` e simili nonostante i fix WCAG parziali.
- [ ] SCSS: Ripetuti `overflow: hidden;` in tutto il file.
- [ ] SCSS: `transform: none !important;`.
- [ ] TS: `subscribe` multipli per assegnazione proprietà sync (`this.message$.subscribe((msg) => (this.currentMessage = msg));`).
- [ ] TS: Manca `ChangeDetectionStrategy.OnPush`.

### pattern-explorer
- [ ] SCSS: Ha il blocco `:host`! (L'unico corretto).
- [ ] TS: Usa già `ChangeDetectionStrategy.OnPush`.

### gof-reference
- [ ] SCSS: Manca blocco `:host`.
- [ ] SCSS: Hardcoded `color: #fff;`.
- [ ] TS: Manca `ChangeDetectionStrategy.OnPush`.

## Priorità di esecuzione
**Alta**:
- Inserire il blocco `:host` in tutte le pagine principali per sistemare i background.
- Aggiungere `ChangeDetectionStrategy.OnPush` in tutti i componenti (specialmente presentational).
- Rimuovere `app-page-header` sostituendolo con `app-section-header`.
- Sistemare i `subscribe` memory leak in `http-example` e `behavior-subject`.

**Media**:
- Sistemare le variabili di colore SCSS (`#fff` -> variabili di tema o classi utility).
- Fixare i `@for` tracks inefficienti (`track $index` -> `track item.id`).
- Tipizzare gli `any` in `search-bar`, `signal-form-demo`, `link-modal`.

**Bassa**:
- Pulire i fix `!important` nei CSS e regolarizzare i layout invece di usare `overflow: hidden` sparsi.

## Stima effort
- **Fix sistematici SCSS (Color/Host/Overflow/!important)**: ~25 file × 5 minuti = ~2 ore
- **Fix sistematici TS (OnPush/Any/Subscribe/Http)**: ~30 file × 5 minuti = ~2.5 ore
- **Fix sistematici Template (app-page-header/trackBy/classi CSS)**: ~15 file × 5 minuti = ~1.2 ore
- **Review e QA**: ~1.5 ore
- **Totale stimato**: ~7 ore
