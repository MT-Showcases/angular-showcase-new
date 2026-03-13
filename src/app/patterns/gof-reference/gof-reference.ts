import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionHeaderComponent } from '../../components/shared/section-header/section-header.component';

@Component({
  selector: 'app-gof-reference',
  standalone: true,
  imports: [CommonModule, SectionHeaderComponent],
  templateUrl: './gof-reference.html',
  styleUrls: ['./gof-reference.scss'],
  // WHY OnPush: questo componente è puramente presentational, i dati (patterns) sono statici.
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GofReference {
  patterns = [
    {
      name: 'Observer',
      angularEquivalent: 'RxJS / Signals',
      description: 'Gestisce flussi di dati asincroni e notifiche di cambiamenti di stato.',
      whenToUse: 'Event handling, chiamate HTTP, stato reattivo.'
    },
    {
      name: 'Facade',
      angularEquivalent: 'Service Layer',
      description: 'Nasconde la complessità di API o logica di business dietro un\'interfaccia semplice.',
      whenToUse: 'Per astrarre chiamate HTTP o logica complessa dai componenti.'
    },
    {
      name: 'Strategy',
      angularEquivalent: 'Dependency Injection (Providers)',
      description: 'Permette di scambiare algoritmi o implementazioni a runtime.',
      whenToUse: 'Configurazioni specifiche per ambiente, testing (mocking).'
    },
    {
      name: 'Decorator',
      angularEquivalent: 'Angular Decorators / Directives',
      description: 'Aggiunge comportamento a classi o elementi DOM senza modificarne la struttura.',
      whenToUse: '@Component, @Injectable, Attribute Directives.'
    },
    {
      name: 'Factory',
      angularEquivalent: 'Angular DI Providers (useFactory)',
      description: 'Crea oggetti complessi con logica condizionale.',
      whenToUse: 'Inizializzazione complessa di servizi, configurazioni dinamiche.'
    },
    {
      name: 'Singleton',
      angularEquivalent: 'Injectable Root Services ({ providedIn: \'root\' })',
      description: 'Garantisce un\'unica istanza di una classe in tutta l\'app.',
      whenToUse: 'Stato globale, cache, gestione autenticazione.'
    },
    {
      name: 'Template Method',
      angularEquivalent: 'Abstract Base Components',
      description: 'Definisce lo scheletro di un algoritmo lasciando i dettagli alle sottoclassi.',
      whenToUse: 'Componenti con logica comune ma template o comportamenti specifici.'
    }
  ];
}
