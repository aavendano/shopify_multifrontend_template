# Atoms

Atoms are the foundational building blocks of the interface, representing the smallest units of UI functionality. They are designed to be dumb, presentational, and highly reusable.

## Button

A versatile button component that supports various styles, sizes, and states.

**File:** `src/atoms/Button.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `string` | `'primary'` | The visual style variant (e.g., 'primary', 'secondary', 'ghost'). |
| `size` | `string` | `'normal'` | The size of the button ('small', 'normal', 'medium', 'large'). |
| `href` | `string` | `undefined` | If provided, renders an anchor tag instead of a button. |
| `type` | `string` | `'button'` | The HTML button type ('button', 'submit', 'reset'). |
| `disabled` | `boolean` | `false` | Disables the button interaction. |
| `loading` | `boolean` | `false` | Shows a loading spinner. |
| `fullWidth` | `boolean` | `false` | Makes the button span the full width of its container. |
| `outlined` | `boolean` | `false` | Applies an outlined style. |
| `rounded` | `boolean` | `false` | Applies rounded corners. |

### Usage

```astro
<Button variant="primary" size="large" onClick={() => console.log('clicked')}>
  Click Me
</Button>
```

## Input

A standard text input field with support for validation states and sizing.

**File:** `src/atoms/Input.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `type` | `string` | `'text'` | The HTML input type. |
| `placeholder` | `string` | `undefined` | Placeholder text. |
| `value` | `string` | `undefined` | Current value. |
| `error` | `boolean` | `false` | Highlights the input in red to indicate an error. |
| `disabled` | `boolean` | `false` | Disables the input. |
| `rounded` | `boolean` | `false` | Applies rounded corners. |

## Badge

A small label used for status indicators or counts.

**File:** `src/atoms/Badge.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `variant` | `string` | `'primary'` | The color variant. |
| `label` | `string` | Required | The text to display. |

## Icon

A scalable SVG icon component.

**File:** `src/atoms/Icon.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `string` | Required | The name of the icon to render (e.g., 'cart', 'user'). |
| `size` | `number` | `24` | The width and height in pixels. |

## Image

A responsive image component that handles aspect ratios and loading states.

**File:** `src/atoms/Image.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | Required | The image source URL. |
| `alt` | `string` | Required | Alternative text for accessibility. |
| `aspectRatio` | `string` | `undefined` | The aspect ratio (e.g., 'square', '16/9'). |
| `objectFit` | `string` | `'cover'` | CSS object-fit property. |

## TextBlock

A typography component for headings, paragraphs, and other text elements.

**File:** `src/atoms/TextBlock.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `tag` | `string` | `'p'` | The HTML tag to render (e.g., 'h1', 'span', 'p'). |
| `size` | `string` | `'base'` | Font size token. |
| `weight` | `string` | `'normal'` | Font weight. |
| `color` | `string` | `'text'` | Text color token. |

## PriceLabel

Formats and displays a monetary value.

**File:** `src/atoms/PriceLabel.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `price` | `number` | Required | The numeric price value. |
| `currency` | `string` | `'USD'` | The currency code. |
| `locale` | `string` | `'en-US'` | The locale for formatting. |

## StockLabel

Displays stock availability status.

**File:** `src/atoms/StockLabel.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `quantity` | `number` | Required | The current stock quantity. |
| `lowStockThreshold` | `number` | `5` | The threshold below which to show a warning. |

## Container

A layout container that centers content and adds padding.

**File:** `src/atoms/Container.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `fluid` | `boolean` | `false` | If true, the container spans the full viewport width. |
| `breakpoint` | `string` | `'widescreen'` | The maximum breakpoint width. |

## Spacer

A utility component for adding vertical or horizontal space.

**File:** `src/atoms/Spacer.astro`

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `size` | `string` | `'medium'` | The amount of space (e.g., 'small', 'large'). |
| `axis` | `string` | `'vertical'` | The direction of the space ('vertical' or 'horizontal'). |
