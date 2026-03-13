/**
 * Barrel export per i componenti shared pedagogici.
 *
 * WHY barrel file (index.ts):
 * Il consumer importa da un unico punto:
 *   import { PedagogyCardComponent } from '@app/components/shared';
 * invece di conoscere la struttura interna delle directory.
 * Refactoring futuro = cambia solo questo file, zero impatto sui consumer.
 *
 * ANTI-PATTERN: Non importare dai file interni direttamente
 * (es: '../shared/pedagogy-card/pedagogy-card.component').
 * Rompe l'encapsulation e rende il refactoring doloroso.
 */

export { PedagogyCardComponent } from './pedagogy-card/pedagogy-card.component';
export { AntipatternBoxComponent } from './antipattern-box/antipattern-box.component';
export { ComparisonGridComponent } from './comparison-grid/comparison-grid.component';
export { SectionHeaderComponent } from './section-header/section-header.component';
