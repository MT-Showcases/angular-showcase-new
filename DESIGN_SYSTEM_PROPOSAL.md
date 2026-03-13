## Design System Proposal

### Componenti Angular da creare
Si propongono i seguenti componenti standalone da inserire in `src/app/components/shared/`:
- `app-pedagogy-card` — props: `title` (string), `content` (string/ng-content), `type` (enum: success, info, warning, error), `icon` (string opzionale)
- `app-antipattern-box` — props: `title` (string), `items` (string[]), `description` (string opzionale)
- `app-comparison-grid` — props: `leftTitle` (string), `rightTitle` (string), `leftSubtitle` (string opzionale), `rightSubtitle` (string opzionale), `leftItems` (string[]), `rightItems` (string[])

### Stili globali da aggiungere in `src/styles/_globals.scss` (o file di pertinenza)
Attualmente gli stili sono duplicati in quasi tutti i file di componente (es. `.pedagogy-box`, `.data-binding__pedagogy-box`, `.form__pedagogy-box`, `.section--pedagogy`, ecc.). Occorre centralizzare:
- `.pedagogy-section` { layout container per le sezioni didattiche }
- `.pedagogy-card` { stile base delle card, con varianti per stato }
- `.antipattern-box` { stile specifico per gli antipattern }
- `.comparison-grid` { layout a griglia/colonne per i confronti }
- `.comparison-card` { stile per le colonne di confronto }

### Palette colori proposta
Basandosi sulle variabili in `_colors.scss`, si propone di standardizzare i background per garantire un contrasto elevato con il testo scuro, evitando testo bianco su sfondi colorati chiari:

- **Pedagogy box (Info/Success):** bg `#e3f2fd` (usa `$blue-bg-light`), text `#1f2937` (usa `$neutral-darker`)
- **Anti-pattern (Error):** bg `#fee2e2` (nuova variabile `$red-bg-light`), text `#7f1d1d` (nuova variabile `$red-text-dark`)
- **Comparison:** bg `#f8f9fa` (usa `$neutral-bg`), text `#333333` (usa `$neutral`)

**Variabili SCSS da aggiungere in `_colors.scss`:**
```scss
// STATUS BACKGROUNDS & TEXT (High Contrast)
$red-bg-light: #fee2e2;
$red-text-dark: #7f1d1d;

$green-bg-light: #d1fae5;
$green-text-dark: #064e3b;

$yellow-bg-light: #fef3c7;
$yellow-text-dark: #78350f;
```

### Piano di migrazione
1. Creare i 3 componenti standalone in `src/app/components/shared/`
2. Aggiornare `src/styles/_colors.scss` con le nuove variabili ad alto contrasto
3. Aggiungere le classi globali in uno stylesheet centralizzato importato in `styles.scss` (es. creando `src/styles/_components.scss`)
4. Aggiornare le sezioni una alla volta (Directives, Data Binding, Forms, Signals, Http, BehaviorSubject, NgRx) rimuovendo le classi CSS duplicate locali e adottando i nuovi componenti
5. Verificare la leggibilità e l'accessibilità (contrasto) su tutte le pagine migrate