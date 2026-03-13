// COMPONENT TYPE: Presentational Lab
// SECTION: Pattern Explorer
//
// ROLE:
// - Compare local state ergonomics between signals and observables
// - Keep a side-by-side interactive counter exercise for contributors
// - Highlight update semantics with compact UI feedback

import { Component, computed, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ReactiveMode = 'signal' | 'observable';

@Component({
  selector: 'app-signal-vs-observable-lab',
  imports: [],
  templateUrl: './signal-vs-observable-lab.html',
  styleUrl: './signal-vs-observable-lab.scss',
})
export class SignalVsObservableLab {
  readonly activeMode = signal<ReactiveMode>('signal');

  readonly signalCounter = signal(0);

  private readonly observableCounterSubject = new BehaviorSubject<number>(0);
  readonly observableCounter = signal(this.observableCounterSubject.value);

  readonly modeSummary = computed(() =>
    this.activeMode() === 'signal'
      ? 'Signal mode: synchronous reads via function call and local computed derivations.'
      : 'Observable mode: stream emissions via BehaviorSubject and explicit next() updates.'
  );

  selectMode(mode: ReactiveMode): void {
    this.activeMode.set(mode);
  }

  increment(): void {
    if (this.activeMode() === 'signal') {
      this.signalCounter.update((value) => value + 1);
      return;
    }

    const nextValue = this.observableCounterSubject.value + 1;
    this.observableCounterSubject.next(nextValue);
    this.observableCounter.set(nextValue);
  }

  decrement(): void {
    if (this.activeMode() === 'signal') {
      this.signalCounter.update((value) => value - 1);
      return;
    }

    const nextValue = this.observableCounterSubject.value - 1;
    this.observableCounterSubject.next(nextValue);
    this.observableCounter.set(nextValue);
  }

  syncCounters(): void {
    const baseline = this.signalCounter();
    this.observableCounterSubject.next(baseline);
    this.observableCounter.set(baseline);
  }

  reset(): void {
    this.signalCounter.set(0);
    this.observableCounterSubject.next(0);
    this.observableCounter.set(0);
  }
}
