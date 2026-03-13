// GoF Pattern: Template Method — define invariant lab lifecycle while delegating lab-specific steps.

export abstract class BasePatternLab {
  abstract init(): void;
  abstract run(): void;
  abstract score(): number;

  reset(): void {
    this.init();
  }
}
