/**
 * MaterialDemoComponent
 *
 * WHY questo componente?
 * Serve come "smoke test" visivo di Angular Material con il tema M3 custom.
 * Dimostra i componenti più comuni (button, card, chip, progress-bar) e
 * permette di verificare visivamente che la palette viola (#6d4aff) sia
 * applicata correttamente.
 *
 * Tutti i componenti Material sono standalone e si importano singolarmente —
 * WHY? Perché con standalone components non esiste più un NgModule globale:
 * ogni componente dichiara esattamente le sue dipendenze, migliorando il
 * tree-shaking del bundle.
 */
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { PedagogyCardComponent, AntipatternBoxComponent, ComparisonGridComponent, SectionHeaderComponent } from '../shared';

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-material-demo',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressBarModule,
    MatIconModule,
    PedagogyCardComponent,
    AntipatternBoxComponent,
    ComparisonGridComponent,
    SectionHeaderComponent,
  ],
  templateUrl: './material-demo.html',
  styleUrl: './material-demo.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialDemo {
  /** Progresso demo per mat-progress-bar */
  progress = 65;

  /** Chip selezionati (demo di interazione) */
  selectedChips = new Set<string>();

  /** Preview della palette viola custom */
  paletteShades = [
    { label: '50', color: '#f0edff', contrast: '#000' },
    { label: '100', color: '#d6ccff', contrast: '#000' },
    { label: '200', color: '#b8a8ff', contrast: '#000' },
    { label: '300', color: '#9a84ff', contrast: '#000' },
    { label: '400', color: '#8368ff', contrast: '#fff' },
    { label: '500', color: '#6d4aff', contrast: '#fff' },
    { label: '600', color: '#5f3edb', contrast: '#fff' },
    { label: '700', color: '#5133b7', contrast: '#fff' },
    { label: '800', color: '#432893', contrast: '#fff' },
    { label: '900', color: '#2f1c6f', contrast: '#fff' },
  ];

  toggleChip(chip: string): void {
    if (this.selectedChips.has(chip)) {
      this.selectedChips.delete(chip);
    } else {
      this.selectedChips.add(chip);
    }
  }

  decreaseProgress(): void {
    this.progress = Math.max(0, this.progress - 10);
  }

  increaseProgress(): void {
    this.progress = Math.min(100, this.progress + 10);
  }
}
