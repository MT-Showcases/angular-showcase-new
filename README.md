# Angular Showcase

An open-source, **Angular-only** learning project focused on one mission:
**help developers learn and apply reusable Angular architecture patterns through interactive examples.**

## Mission
Angular Showcase exists to make pattern learning practical.

Instead of isolated snippets, this repo provides structured examples that show how patterns work in context:
- container vs presentational composition
- reactive state flows (Signals, RxJS, NgRx)
- service/facade boundaries
- scalable styling and component organization

If a contribution does not improve Angular pattern learning, it is out of scope.

## Scope (What This Project Is / Is Not)

### In scope
- Angular-first educational examples
- Progressive depth UX (learn basics first, then dive deeper)
- Production-shaped code organization for learning transfer

### Out of scope
- Multi-framework expansion
- Generic UI showcase unrelated to architecture patterns
- Feature work without explicit learning value

## Architecture & Quality Docs
- [Pattern-Learning Architecture](docs/architecture/pattern-learning-architecture.md)
- [Pattern-Learning Definition of Done](docs/quality/pattern-learning-definition-of-done.md)
- [Contributing Guide](CONTRIBUTING.md)

## Tech Stack
- Angular (standalone component model)
- TypeScript
- RxJS
- NgRx (where global state patterns are demonstrated)
- SCSS

## Quick Start

```bash
git clone https://github.com/Flame0510/angular-showcase.git
cd angular-showcase
npm install
npm start
```

Open `http://localhost:4200`.

## Development Commands

```bash
npm start       # dev server
npm run build   # production build
npm test        # unit tests
```

## Contribution Summary
Before opening a PR:
1. Align changes with the pattern-learning mission.
2. Follow Angular and styling conventions.
3. Run tests and basic manual checks.
4. Update docs when behavior or workflow changes.

See full workflow in [CONTRIBUTING.md](CONTRIBUTING.md).

## License
MIT
