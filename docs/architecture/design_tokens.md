# Design Token System

The project uses a structured Design Token system implemented via SCSS, which maps to Bulma variables and CSS Custom Properties.

## File Structure

- **`src/styles/tokens.scss`**: Defines the base tokens (colors, typography, spacing).
- **`src/styles/main.scss`**: Imports tokens and maps them to Bulma variables, then initializes Bulma.

## Key Tokens

### Colors
Defined with semantic names:
- `$token-color-primary`: Main brand color.
- `$token-color-secondary`: Accent color.
- `$token-color-text`: Default text color.
- `$token-color-background`: Default background color.

### Typography
- `$token-font-family`: Font family (e.g., system-ui).
- `$token-font-size-base`: Base font size (e.g., 16px).
- `$token-line-height-base`: Base line height (e.g., 1.5).

### Spacing
Uses a t-shirt sizing scale:
- `$token-spacing-xs`: 0.25rem
- `$token-spacing-sm`: 0.5rem
- `$token-spacing-md`: 1rem
- `$token-spacing-lg`: 1.5rem
- `$token-spacing-xl`: 3rem

## Usage in Components

Components should import tokens using SCSS modules or access them via the Bulma classes they generate.

```scss
@use '../styles/tokens' as *;

.my-component {
  padding: $token-spacing-md;
  color: $token-color-primary;
}
```

## Theme Customization

To create a new theme:
1.  Create a new `theme.config.json` in `/sites/[siteId]/`.
2.  Override the SCSS variables in a site-specific stylesheet (future feature).
Currently, themes are managed by modifying `src/styles/tokens.scss` directly.
