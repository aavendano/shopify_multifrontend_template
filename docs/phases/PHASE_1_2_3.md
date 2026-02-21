# Phase 1, 2, 3 Implementation

## Overview
This document covers the implementation of the Foundation Architecture, Design Token System, and Atom Components for the Multi-Frontend Headless Ecommerce Platform.

## 1. Project Structure
The project follows a standard Astro structure with Atomic Design organization:

- `/sites`: Contains site configurations (`theme.config.json`, `routes.config.json`).
- `/src/atoms`: Atomic UI components (Buttons, Inputs, etc.).
- `/src/lib`: Core logic, including the Config Loader and Shopify Mock Client.
- `/src/styles`: SCSS styles and Design Tokens.
- `/src/pages`: Pages (currently includes a test page `/test-atoms`).

## 2. Design Token System
We use a SCSS-based token system integrated with Bulma.
Tokens are defined in `src/styles/tokens.scss` and mapped to Bulma variables in `src/styles/main.scss`.

### Key Tokens
- Colors: `$token-color-primary`, `$token-color-secondary`, etc.
- Typography: `$token-font-family`, `$token-font-size-base`.
- Spacing: `$token-spacing-xs` to `$token-spacing-xl`.

To update the theme, modify `src/styles/tokens.scss`.

## 3. Atom Components
All atoms are built as reusable Astro components accepting props for customization.

### Components
- `Button`: Supports `variant`, `size`, `loading`, `outlined`, etc.
- `Input`: Supports `type`, `error`, `rounded`, etc.
- `Badge`: Bulma tags.
- `Label`: Form labels with required indicator.
- `Icon`: SVG icons.
- `Image`: Responsive images with aspect ratios.
- `TextBlock`: Typography component.
- `PriceLabel`: Formats currency.
- `StockLabel`: Shows stock status based on quantity.
- `Container`: Layout container.
- `Spacer`: Spacing utility.

## 4. Mock Shopify Adapter
Located at `src/lib/shopify/mockClient.ts`.
Simulates product data retrieval with `getProductVariant(id)`.
Supports testing IDs: `'sale'`, `'out-of-stock'`, `'limited'`.

## 5. Testing
- Unit Tests: Run `pnpm test` (Vitest).
- E2E Tests: Run `npx playwright test`.

## Usage
To verify components, visit `/test-atoms` (run `pnpm dev`).
