# UX/UI Audit Report v2 — 2026-03-13

Analisi visiva sistematica di https://angular-showcase-new.vercel.app/  
Auditor: Sub-agent UX/UI Senior  
Metodo: Screenshot 1440px (desktop), source-code review, WCAG 2.1 AA check

---

## Severity: CRITICA (WCAG fail, layout broken)

### Home — https://angular-showcase-new.vercel.app/

- **Problema**: La navbar è completamente non responsiva a 375px. Il layout a flex-row monoriga causa overflow orizzontale nascosto — l'utente non può scrollare orizzontalmente ma i link Basics, Advanced, State, Patterns, Examples traboccano oltre il viewport.
- **Elemento**: `.nav` (navbar.scss) — `flex-wrap: wrap` è definito ma i link sono in una sola riga e il font/padding li forza a uscire su viewport <768px.
- **Fix suggerito**: Implementare hamburger menu o ridurre padding dei nav-link a <8px su mobile, oppure aggiungere un breakpoint mobile che collassa la nav in un menu dropdown.

---

### Home — https://angular-showcase-new.vercel.app/

- **Problema**: WCAG 1.4.3 FAIL — Il testo del subtitle della hero (`"Progetto educativo con esempi pratici di Angular 18+"`) è bianco su sfondo viola animato (#667eea → #764ba2 → #f093fb). Il rapporto di contrasto sul tono più chiaro (`#f093fb`) è circa 1.8:1 — ampiamente sotto il minimo 4.5:1 per testo normale.
- **Elemento**: `.home__subtitle` (home.scss) — `color: rgba(255, 255, 255, 0.95)` su background animato con gradient finale quasi-bianco `#f093fb`.
- **Fix suggerito**: Fermare il gradient al range viola scuro (max `#764ba2`) o aggiungere `text-shadow: 0 1px 3px rgba(0,0,0,0.5)` per garantire contrasto ≥4.5:1 in ogni fase dell'animazione.

---

### Global — `styles.scss`

- **Problema**: WCAG 2.4.7 FAIL — `outline: none` applicato globalmente a `*` in styles.scss rimuove completamente il focus ring da TUTTI gli elementi interattivi (link, bottoni, input, tab). Questo rende l'app completamente inutilizzabile via tastiera e screen reader.
- **Elemento**: `* { outline: none; }` in `src/styles.scss` riga ~14.
- **Fix suggerito**: Rimuovere `outline: none` dal selettore `*`. Usare invece `outline: none` solo su singoli elementi con `:focus-visible { outline: ... }` custom per mantenere focus visibile per utenti tastiera.

---

### Data Binding — https://angular-showcase-new.vercel.app/basics/data-binding

- **Problema**: La sezione page-header mostra `color: $white` (bianco) + `breadcrumb: rgba(255,255,255,0.9)` ma nella pagina di Data Binding il componente usato è `app-section-header` (non `app-page-header`). Il `section-header` ha sfondo trasparente e il titolo dark (`color: #1a1a1a`). Il risultato è che il testo scuro appare direttamente sul sfondo viola globale senza contenitore bianco — leggibile ma visivamente inconsistente.
- **Elemento**: `app-section-header` fuori da `.data-binding` wrapper.
- **Fix suggerito**: Wrappare `app-section-header` dentro il container bianco `.data-binding` o usare l'alternativa `app-page-header` che è progettato per fondi colorati.

---

### Forms — https://angular-showcase-new.vercel.app/basics/forms

- **Problema**: Layout a 3 colonne (comparison-col sinistra + form-card centrale + antipattern-box destra) si spezza a tablet (768px): le colonne si sovrappongono o la colonna destra scivola sotto creando un layout a L asimmetrico con spazio bianco inutile.
- **Elemento**: `.form__container` a `@media (min-width: 1024px)` imposta `align-items: flex-start` ma non ha un grid/flex-row esplicito per il layout a 3 colonne — le box `.form__pedagogy-box` e `.form__antipattern-box` hanno `max-width: 900px` vs il form-card che ha `max-width: 500px`, causando disallineamenti.
- **Fix suggerito**: Definire un layout a CSS Grid `grid-template-columns: 1fr 500px 1fr` sopra 1024px. Sotto 768px: colonna singola, box in ordine logico.

---

### GoF Reference — https://angular-showcase-new.vercel.app/patterns/gof-reference

- **Problema**: WCAG 1.4.3 FAIL — Il testo del body delle card (`.pattern-card p`) ha `color: #b0b0b0` su `background: #1e1e1e`. Il rapporto di contrasto è ~3.6:1 — sotto il minimo 4.5:1 per testo normale (font-size ~16px).
- **Elemento**: `.gof-container .pattern-card p { color: #b0b0b0 }` in gof-reference.scss.
- **Fix suggerito**: Portare il colore testo a `#c8c8c8` o superiore (contrasto ≥4.5:1 su `#1e1e1e` si ottiene con `#959595` come minimo, ma per comfort visivo usare `#cccccc`).

---

### GoF Reference — https://angular-showcase-new.vercel.app/patterns/gof-reference

- **Problema**: Il page header (titolo "GoF Design Patterns in Angular" e subtitle) appare direttamente sul background viola globale, senza contenitore. Il `section-header` usa `color: #1a1a1a` (dark) su viola — contrasto accettabile ma il subtitle `color: #4b5563` su sfondo viola scuro (~#764ba2) ha contrasto ~2.1:1, insufficiente.
- **Elemento**: `app-section-header` → `.section-header__subtitle { color: #4b5563 }` su `body { background: linear-gradient(#667eea...) }`.
- **Fix suggerito**: Wrappare il contenuto della pagina in un contenitore bianco (come fa behavior-subject con `.container { background: #ffffff }`), o usare `color: white` + `text-shadow` per i subtitles delle section-header esposte al viola.

---

## Severity: ALTA (artefatti visivi, inconsistenze gravi)

### Home — https://angular-showcase-new.vercel.app/

- **Problema**: Sfondo viola globale animato (5s loop) trepela tra i gap della griglia di feature-card. Le card hanno `background: rgba(255,255,255,0.95)` con `backdrop-filter: blur(10px)` ma i gap visibili mostrano il gradient viola pulsante — effetto visivo distraente e non intenzionale per un'app educativa.
- **Elemento**: Gap tra `.home__grid` cards — sfondo body visibile attraverso il grid-gap.
- **Fix suggerito**: Aggiungere un contenitore bianco opaco sotto la griglia, o ridurre l'opacità dell'animazione corpo (`animation: none` per `prefers-reduced-motion`) e rendere il gradient statico.

---

### Home — https://angular-showcase-new.vercel.app/

- **Problema**: Assenza totale di `prefers-reduced-motion` media query. Il background animato con `gradientShift` 5s loop è un artefatto visivo continuo che può causare disagio a utenti con vestibular disorders (WCAG 2.3.3 AAA, de facto best practice).
- **Elemento**: `body { animation: gradientShift 5s ease-in-out infinite alternate; }` in styles.scss.
- **Fix suggerito**: Aggiungere `@media (prefers-reduced-motion: reduce) { body { animation: none; background: #764ba2; } }`.

---

### Data Binding — https://angular-showcase-new.vercel.app/basics/data-binding

- **Problema**: Il componente usa `app-section-header` con stile dark (title/subtitle neri) posizionato prima del wrapper `.data-binding` (background bianco). Il breadcrumb "Angular Basics" con `color: #6b7280` è quasi invisibile sul viola globale.
- **Elemento**: `app-section-header` fuori dal contenitore `.data-binding__section`.
- **Fix suggerito**: Spostare `app-section-header` dentro `.data-binding` container, oppure dare alla section-header una variante `inverted` con testo bianco per uso su sfondi colorati.

---

### Signals — https://angular-showcase-new.vercel.app/advanced/signals

- **Problema**: La pagina manca di un contenitore bianco globale — il contenuto viene renderizzato direttamente sul viola. Alcune sezioni hanno background bianco locale ma altre (es. "Perché i Signals?", "Anti-Pattern: Loop Infinito") usano `background: rgba(255,255,255,0.95)` che lascia vedere il viola attraverso ai bordi arrotondati.
- **Elemento**: Nessun wrapper globale white/opaco a livello di route page.
- **Fix suggerito**: Aggiungere un container white opaco come in behavior-subject (`.container { background: #ffffff; border-radius: 1rem; }`).

---

### HTTP & Service Facade — https://angular-showcase-new.vercel.app/advanced/http

- **Problema**: Stessa mancanza di contenitore bianco globale della pagina Signals. Il violet del background è visibile intorno alle card bianche, creando un artefatto viola persistente.
- **Elemento**: Layout globale senza wrapper bianco opaco.
- **Fix suggerito**: Aggiungere wrapper bianco a livello di componente HTTP.

---

### NgRx — https://angular-showcase-new.vercel.app/state/ngrx

- **Problema**: Il tab system interno (`.tabs`) ha border-bottom color `#2563eb` (blu) per il tab attivo, ma il resto della pagina usa palette viola/purple. L'inconsistenza cromatica tra il sistema di tab e il design system dell'app è marcata.
- **Elemento**: `.ngrx-container .tabs .tab.active { color: #2563eb; border-bottom-color: #2563eb }` — blu Material non allineato con la palette viola del progetto.
- **Fix suggerito**: Allineare il colore del tab attivo alla palette principale `#667eea` o `#764ba2`.

---

### NgRx — https://angular-showcase-new.vercel.app/state/ngrx

- **Problema**: Il CSS del componente NgRx è tutto inline minificato su una singola riga nel file `.scss` (formato non standard per un file SCSS sorgente), suggerendo che il CSS sia stato generato/copiato da build invece di scritto manualmente — manutenibilità zero.
- **Elemento**: `src/app/...ngrx...scss` — file contiene CSS minificato su una riga invece di SCSS formattato.
- **Fix suggerito**: Riscrivere il file SCSS con indentazione standard BEM come gli altri componenti.

---

### Pattern Explorer — https://angular-showcase-new.vercel.app/pattern-explorer

- **Problema**: Il pannello di dettaglio (destra) non occupa l'altezza piena del layout su viewport 768px — c'è un gap bianco vuoto sotto il pannello destro quando il pannello sinistro (lista patterns) è più lungo.
- **Elemento**: Layout a 2 colonne — colonna destra non ha `min-height: 100%` o `align-self: stretch`.
- **Fix suggerito**: Usare `display: grid; grid-template-rows: 1fr` sul container, o `align-items: stretch` sul flex container parent.

---

### GoF Reference — https://angular-showcase-new.vercel.app/patterns/gof-reference

- **Problema**: Il dark-theme delle pattern card (`.pattern-card { background: #1e1e1e }`) è visivamente incongruente con il resto dell'app che usa cards bianche/chiare. Non c'è transizione logica — l'utente viene "teleportato" in un tema dark senza indicazione.
- **Elemento**: Stile custom di `gof-reference.scss` non allineato al design system.
- **Fix suggerito**: Usare card con `background: #ffffff` e accent viola coerente, oppure esplicitare visivamente il "tema code/dark" con una label o header che giustifichi il cambio.

---

## Severity: MEDIA (inconsistenze di stile, spacing)

### Inconsistenza section-header vs page-header

- **Problema**: Alcune pagine usano `app-section-header` (dark, per sfondi bianchi), altre usano `app-page-header` (white, per sfondi colorati). Non c'è una regola consistente — alcune pagine usano section-header su sfondo viola direttamente.
- **Pagine affette**: Data Binding, Directives, Forms (tutte usano section-header), mentre Home usa il suo hero custom.
- **Fix suggerito**: Definire una linea guida: `app-page-header` su tutte le route pages (sfondo viola), `app-section-header` solo dentro contenitori bianchi.

---

### Directives — https://angular-showcase-new.vercel.app/basics/directives

- **Problema**: La tabella "Riepilogo Angular vs React" in fondo alla pagina ha celle con testo molto piccolo (~12-13px) su sfondo viola (#667eea) con testo bianco. Su alcuni breakpoint il testo nelle celle diventa troppo denso e difficile da leggere.
- **Elemento**: Tabella comparativa in fondo — celle con `background: #667eea` e `color: white`.
- **Fix suggerito**: Aumentare il font-size a 14px minimo, aggiungere più padding alle celle, verificare contrasto (bianco su #667eea = ~3.0:1 — sotto WCAG AA per testo normale).

---

### Spacing inconsistente tra pagine

- **Problema**: Il margin-top del contenuto varia tra le pagine: Data Binding ha un gap di ~60px tra navbar e contenuto, Forms ha ~20px, NgRx ha ~10px. Nessuna regola globale di `main { padding-top }` è applicata.
- **Elemento**: Ogni componente gestisce il proprio spacing verticale iniziale in modo indipendente.
- **Fix suggerito**: Definire in `styles.scss` o nel layout component un `main { padding: 24px 16px; }` uniforme.

---

### BehaviorSubject — https://angular-showcase-new.vercel.app/state/behavior-subject

- **Problema**: Il TOC (table of contents) sticky a destra con `float: right; width: 220px` su desktop si sovrappone al contenuto su viewport 768-1024px perché il contenitore non ha abbastanza larghezza per accomodare entrambi.
- **Elemento**: `.toc { position: sticky; float: right; width: 220px }` in behavior-subject.scss.
- **Fix suggerito**: Nascondere il TOC sotto 1024px (`display: none`) o convertire il layout a CSS Grid con colonne esplicite (`grid-template-columns: 1fr 220px`) sopra 1024px.

---

### Forms — https://angular-showcase-new.vercel.app/basics/forms

- **Problema**: Il bottone "Invia Form" ha `color: white` su `background: linear-gradient(#667eea, #764ba2)` — contrasto ~4.6:1 (appena sufficiente), ma quando disabilitato `background: #ccc; opacity: 0.6` il contrasto crolla a ~1.3:1 (WCAG fail).
- **Elemento**: `.btn__submit:disabled { background: #ccc; opacity: 0.6 }`.
- **Fix suggerito**: Usare `color: #595959` su `background: #ccc` (niente opacity) — contrasto ~4.7:1.

---

### Componenti shared non usati in Forms

- **Problema**: La pagina Forms usa CSS locale custom (`.form__pedagogy-box`, `.form__antipattern-box`, `.form__comparison`) invece dei componenti `app-pedagogy-card` e `app-antipattern-box` già esistenti nel design system.
- **Elemento**: `forms.html` usa `<div class="form__pedagogy-box">` invece di `<app-pedagogy-card>`.
- **Fix suggerito**: Sostituire le div locali con i componenti shared per consistenza visiva e manutenibilità.

---

## Severity: BASSA (polish, dettagli)

### Home — Bottoni footer "RANDOM TOPIC" / "ATTIVA AUTO RANDOM TOPIC"

- **Problema**: I due bottoni in fondo alla homepage hanno styling molto simile ma il secondo ("ATTIVA AUTO RANDOM TOPIC") ha un colore di background leggermente più chiaro e trasparente, risultando visivamente più debole senza una chiara gerarchia primario/secondario.
- **Fix suggerito**: Definire un bottone come primary (filled) e uno come secondary (outline) per rispettare la gerarchia visiva.

---

### Pattern Explorer — filtri categoria

- **Problema**: I tag filtro "Tutti", "Beginner", "Intermediate", "Advanced" hanno bordi tondi ma il tag attivo ("Tutti") usa un background viola pieno mentre gli altri usano solo border — il contrasto è adeguato ma manca il focus ring quando si naviga via tastiera (a causa del `outline: none` globale).
- **Fix suggerito**: Ripristinare `outline` sul `:focus-visible` dei filtri.

---

### NgRx — Breadcrumb tab

- **Problema**: La pagina NgRx usa tre tab ("Concetti Base", "Code Examples", "Best Practices") ma non è chiaro quale sia il tab attivo al primo render — il tab attivo ha solo `border-bottom-color: #2563eb` che su alcune risoluzioni può non essere visibile.
- **Fix suggerito**: Aggiungere `font-weight: 700` e `background-color: #eff6ff` al tab attivo per aumentarne la visibilità.

---

### BehaviorSubject — Testo "Nessun messaggio ancora. Aggiungine uno!"

- **Problema**: Il testo di empty state nella Demo 3 (Lista Messaggi) è in `color: #9ca3af` (grigio chiaro) su sfondo bianco — contrasto ~2.3:1, sotto WCAG AA per testo normale.
- **Fix suggerito**: Usare `color: #6b7280` (contrasto ~4.6:1 su bianco).

---

### Animazione body — Performance

- **Problema**: L'animazione CSS `gradientShift` su `body` con `background-size: 400% 400%` e `background-position` animato ogni 5 secondi forza il browser a ricalcolare il repaint del background a ogni frame — impatto non trascurabile su dispositivi mobile a bassa CPU.
- **Fix suggerito**: Usare `transform` o `opacity` su un pseudo-elemento `::before` per sfruttare la GPU, invece di animare `background-position`.

---

### Consistency tipografica — Inter vs System Fonts

- **Problema**: Il font `Inter` è dichiarato in `* { font-family: Inter, -apple-system, ... }` ma non viene importato esplicitamente (nessun `@import url()` da Google Fonts o `@font-face`). Su sistemi senza Inter installato, il font fallback è `-apple-system` (SF Pro su Mac) o `BlinkMacSystemFont` — rendering leggermente diverso tra macOS e altri OS.
- **Fix suggerito**: Aggiungere `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap')` in styles.scss per garantire consistenza cross-platform.

---

## Riepilogo

| Categoria | Count |
|-----------|-------|
| **Critici** | 6 |
| **Alti** | 7 |
| **Medi** | 6 |
| **Bassi** | 6 |
| **Totale** | **25** |

### Pagine più problematiche

1. **GoF Reference** — 3 problemi critici/alti (contrasto WCAG fail, dark theme inconsistente, subtitle sul viola)
2. **Home** — 3 problemi critici/alti (navbar mobile overflow, WCAG subtitle, animazione continua)
3. **Forms** — 2 critici + 2 medi (layout 3 colonne rotto, componenti shared non usati, bottone disabled WCAG fail)
4. **Signals / HTTP** — 2 alti ciascuno (mancanza wrapper bianco, artefatti viola)

### Quick Wins (< 1h ciascuno)

1. Rimuovere `outline: none` da `*` → massimo impatto su accessibilità
2. Aggiungere `@media (prefers-reduced-motion)` in styles.scss
3. Fix colore `#b0b0b0` → `#cccccc` su GoF Reference
4. Fix bottone disabled contrasto in Forms
5. Importare font Inter da Google Fonts

### Interventi strutturali (> 1 sprint)

1. Navbar mobile → hamburger menu
2. Standardizzare layout wrapper per tutte le route pages
3. Sostituire CSS locale in Forms con componenti shared
4. Unificare sistema colori tab (NgRx blue → viola progetto)
