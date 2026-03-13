// GoF Pattern: Template Method — enforce lab workflow while allowing reactive-mode specific behavior.

import { Component, computed, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NotificationService } from '../../../../services/notification.service';
import { BasePatternLab } from '../base-pattern-lab';

type ReactiveMode = 'signal' | 'observable';

// WHY: OnPush riduce i cicli di change detection al minimo necessario
// QUANDO USARLO: sempre, su ogni componente
// ALTERNATIVA: Default CD — solo se usi librerie terze che richiedono CD globale
// ANTI-PATTERN: Default CD su tutti i componenti — spreca cicli CPU
@Component({
  selector: 'app-signal-vs-observable-lab',
  imports: [],
  templateUrl: './signal-vs-observable-lab.html',
  styleUrl: './signal-vs-observable-lab.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalVsObservableLab extends BasePatternLab {
  private readonly notificationService = inject(NotificationService);
  private hasAnnouncedMilestone = false;

  readonly activeMode = signal<ReactiveMode>('signal');
  readonly signalCounter = signal(0);

  private readonly observableCounterSubject = new BehaviorSubject<number>(0);
  readonly observableCounter = signal(this.observableCounterSubject.value);

  readonly modeSummary = computed(() =>
    this.activeMode() === 'signal'
      ? 'Signal mode: synchronous reads via function call and local computed derivations.'
      : 'Observable mode: stream emissions via BehaviorSubject and explicit next() updates.'
  );

  constructor() {
    super();
    this.init();
  }

  selectMode(mode: ReactiveMode): void {
    this.activeMode.set(mode);
  }

  increment(): void {
    if (this.activeMode() === 'signal') {
      this.signalCounter.update((value) => value + 1);
    } else {
      const nextValue = this.observableCounterSubject.value + 1;
      this.observableCounterSubject.next(nextValue);
      this.observableCounter.set(nextValue);
    }

    this.run();
  }

  decrement(): void {
    if (this.activeMode() === 'signal') {
      this.signalCounter.update((value) => value - 1);
    } else {
      const nextValue = this.observableCounterSubject.value - 1;
      this.observableCounterSubject.next(nextValue);
      this.observableCounter.set(nextValue);
    }

    this.run();
  }

  syncCounters(): void {
    const baseline = this.signalCounter();
    this.observableCounterSubject.next(baseline);
    this.observableCounter.set(baseline);
    this.run();
  }

  init(): void {
    this.hasAnnouncedMilestone = false;
    this.activeMode.set('signal');
    this.signalCounter.set(0);
    this.observableCounterSubject.next(0);
    this.observableCounter.set(0);
  }

  run(): void {
    if (this.score() >= 6 && !this.hasAnnouncedMilestone) {
      this.hasAnnouncedMilestone = true;
      this.notificationService.push('Signal vs Observable lab milestone reached ✅', 'info');
    }
  }

  score(): number {
    return Math.abs(this.signalCounter()) + Math.abs(this.observableCounter());
  }

  override reset(): void {
    super.reset();
  }
}
