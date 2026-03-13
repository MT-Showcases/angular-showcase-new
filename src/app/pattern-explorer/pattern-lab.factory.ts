// GoF Pattern: Factory Method — centralize lab component creation by lab identifier.

import { Type } from '@angular/core';
import { FacadeAntiPatternFixerLab } from './components/labs/facade-anti-pattern-fixer-lab/facade-anti-pattern-fixer-lab';
import { SignalVsObservableLab } from './components/labs/signal-vs-observable-lab/signal-vs-observable-lab';
import { SmartDumbRefactorLab } from './components/labs/smart-dumb-refactor-lab/smart-dumb-refactor-lab';

const labComponentMap: Record<string, Type<unknown>> = {
  'smart-dumb': SmartDumbRefactorLab,
  'signal-vs-observable': SignalVsObservableLab,
  'facade-fixer': FacadeAntiPatternFixerLab,
};

export function getLabComponent(patternId: string): Type<unknown> {
  return labComponentMap[patternId] ?? SmartDumbRefactorLab;
}
