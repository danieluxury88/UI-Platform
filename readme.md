# UI Platform

UI Platform is a greenfield monorepo plan for a reusable design system and companion applications targeting web and mobile.

The project is intended to provide:

- A framework-agnostic component library built with Stencil
- A token-based visual system shared across products
- A web application shell for early integration and demos
- A mobile shell built with Ionic and Capacitor

The repository is currently in the planning stage. The documentation in `docs/` defines the proposed architecture, delivery plan, and key decisions before code scaffolding begins.

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

1. Bootstrap the monorepo workspace and shared tooling.
2. Implement the token pipeline and the first primitive components.
3. Stand up a minimal web app to validate integration.
4. Add the mobile shell after the web integration path is stable.

## Status

There is no production code in the repository yet. This documentation set is the implementation plan for the first buildout.
