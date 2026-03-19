# UI Platform

UI Platform is a pnpm monorepo for a reusable design system and companion applications targeting web and mobile.

The project is intended to provide:

- A framework-agnostic component library built with Stencil
- A token-based visual system shared across products
- A web application shell for early integration and demos
- A mobile shell built with Ionic and Capacitor

The repository now contains the initial token package, the Stencil design-system package, and a web demo consuming shared components. The documentation in `docs/` defines the active architecture, delivery plan, and next implementation steps.

## Proposed stack

- TypeScript
- Stencil for reusable Web Components
- CSS custom properties for design tokens and theming
- Ionic for mobile-oriented application structure
- Capacitor for native packaging

## Proposed repository layout

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

## Documentation

- `docs/architecture.md`: target architecture, boundaries, testing, and workflow
- `docs/roadmap.md`: phased delivery plan and recommended first slice
- `docs/decisions.md`: architectural decisions and open questions

## Engineering principles

- Keep the design system independent from application business logic
- Treat design tokens as the shared source of visual truth
- Prefer small, composable components over large feature widgets
- Keep web and mobile apps thin and focused on navigation, data wiring, and platform integration
- Add tooling only when it reduces friction for the current stage of the repo

## Immediate next steps

1. Finish the Phase 2 layout-helper and cleanup pass.
2. Reduce transitional CSS around the shared components already in use.
3. Add the next layout helper only where the web demo proves real repetition.
4. Add the mobile shell after the web integration path is stable.

## Status

Phase 1 is complete and committed. Phase 2 is focused on layout-helper and cleanup work in the design-system package and `apps/web`.
