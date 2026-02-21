# Architecture Overview

## Technology Stack

The Multi-Frontend Headless Ecommerce Platform is built on a modern, performance-oriented stack:

- **Framework**: [Astro](https://astro.build) (v5.x)
    - Chosen for its "Islands Architecture" and zero-JS-by-default approach.
    - Components are rendered as static HTML unless hydration is explicitly requested.
- **Styling**: [Bulma](https://bulma.io) (SCSS) + CSS Variables
    - Utility-first CSS framework customized via SCSS variables.
    - Design tokens are defined in `src/styles/tokens.scss`.
- **Interactivity**: [Alpine.js](https://alpinejs.dev) + Vanilla JavaScript
    - Lightweight, declarative DOM manipulation.
    - Used for client-side state (e.g., toggling menus, updating cart UI) without the overhead of React/Vue.
- **Language**: TypeScript
    - Strict typing for props and business logic.
- **Testing**:
    - **Unit**: Vitest
    - **E2E**: Playwright

## Atomic Design

The codebase is organized following the [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) methodology:

1.  **Atoms** (`src/atoms/`): Basic building blocks (Buttons, Inputs, Icons). No dependencies.
2.  **Molecules** (`src/molecules/`): Groups of atoms (ProductPrice, FormField). simple logic.
3.  **Organisms** (`src/organisms/`): Complex UI sections (ProductCard, Header). Manage local state.
4.  **Templates/Layouts** (`src/layouts/`): Page wrappers defining the grid.
5.  **Pages** (`src/pages/`): The actual routes where organisms are assembled.

## Multi-Frontend Capability

The platform is designed to support multiple storefronts from a single codebase.
Site configurations are stored in `/sites/[siteId]/`:
- `theme.config.json`: Design token overrides.
- `routes.config.json`: Route mappings.

(Note: This feature is currently in early implementation).
