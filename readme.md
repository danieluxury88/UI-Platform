# UI Platform

UI Platform is a pnpm monorepo for a reusable design system and companion applications targeting web and mobile.

The repository currently contains:

- A framework-agnostic component library built with Stencil
- A token-based visual system shared across products
- A web demo shell for integration and component proving
- A thin mobile shell consuming the same shared packages

The project is past bootstrap. The token package, Stencil design system, web demo, and mobile shell are all in place. The design-system package now includes committed shared layers plus the first calendar widget family baseline.

## Current stack

- TypeScript
- Stencil for reusable Web Components
- CSS custom properties for design tokens and theming
- pnpm workspaces
- Ionic and Capacitor reserved for later mobile expansion

## Repository layout

```text
.
|-- apps/
|   |-- web/
|   `-- mobile/
|-- packages/
|   |-- tokens/
|   `-- design-system/
|-- docs/
`-- readme.md
```

## Current status

- Phases 1 through 7 are committed
- Shared layers in place:
  - primitives: `ui-button`
  - surfaces: `ui-card`, `ui-panel`
  - layout: `ui-stack`, `ui-page-section`
  - feedback: `ui-chip`, `ui-badge`
  - compositions: `ui-toolbar`
  - business widgets: `ui-calendar`, `ui-calendar-toolbar`, `ui-calendar-month-view`, `ui-calendar-day-view`, `ui-calendar-week-view`, `ui-calendar-day-cell`, `ui-calendar-event-chip`
- `apps/web` demonstrates the shared system with month, day, and week calendar views
- `apps/mobile` is a thin shared-package consumer
- The next phase is focused on tightening component hierarchy and layer boundaries

## Open On Another Machine

Tested locally with Node `22.x` and `pnpm@9.15.0`.

1. Install Node `22.x`.
2. Enable Corepack:

```bash
corepack enable
```

3. Install dependencies from the repo root:

```bash
pnpm install
```

4. Build the design system once before opening the demos:

```bash
pnpm build
```

5. Run the web demo:

```bash
pnpm dev:web
```

6. Optionally run the mobile shell:

```bash
pnpm dev:mobile
```

Default local URLs:

- Web demo: `http://127.0.0.1:4173/apps/web/`
- Mobile shell: `http://127.0.0.1:4174/apps/mobile/`

## VSCode / Codex

- Open the repository root in VSCode.
- Use the workspace root as the Codex working directory.
- Common tasks are available through root scripts and `.vscode/tasks.json`.
- The live coordination docs are `project-board.md` and `agents.md`.

## Documentation

- `docs/architecture.md`: target architecture, boundaries, testing, and workflow
- `docs/roadmap.md`: phased delivery plan and current phase focus
- `docs/decisions.md`: accepted architectural decisions and open questions
- `docs/calendar-brief.md`: calendar-family architecture brief and rollout guidance

## Engineering principles

- Keep the design system independent from application business logic
- Treat design tokens as the shared source of visual truth
- Prefer small, composable components over large feature widgets
- Keep web and mobile apps thin and focused on navigation, data wiring, and platform integration
- Add tooling only when it reduces friction for the current stage of the repo

## Common commands

```bash
pnpm install
pnpm build
pnpm dev:web
pnpm dev:mobile
pnpm dev:design-system
pnpm test
pnpm typecheck
```

## Next phase

The next implementation phase is not calendar breadth. It is hierarchy tightening:

- confirm the layer classification of existing components
- make dependency boundaries more explicit
- tighten the implementation order from lower shared layers upward
