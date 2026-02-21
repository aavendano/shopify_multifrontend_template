# Molecules

Molecules are groups of atoms bonded together and are the smallest fundamental units of a compound. These molecules take on their own properties and serve as the backbone of our design systems.

## ProductPrice

Displays price and optional savings badge.

**File:** `src/molecules/ProductPrice.astro`
**Dependencies:** `PriceLabel` (Atom), `Badge` (Atom)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `price` | `number \| string` | Required | The current price. |
| `compareAtPrice` | `number \| string` | `undefined` | The original price (for sale). |
| `currency` | `string` | `'USD'` | Currency code. |
| `showSavings` | `boolean` | `false` | Whether to show percentage off badge. |

### Usage

```astro
<ProductPrice price={19.99} compareAtPrice={29.99} showSavings={true} />
```

## ProductStockIndicator

Displays stock status with color coding.

**File:** `src/molecules/ProductStockIndicator.astro`
**Dependencies:** `StockLabel` (Atom)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `quantity` | `number` | Required | Current stock quantity. |
| `lowStockThreshold` | `number` | `10` | Threshold for low stock warning. |

## CardMedia

Displays an image with an optional overlay badge.

**File:** `src/molecules/CardMedia.astro`
**Dependencies:** `Image` (Atom), `Badge` (Atom)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `src` | `string` | Required | Image source URL. |
| `alt` | `string` | Required | Image alt text. |
| `badgeText` | `string` | `undefined` | Text for overlay badge (e.g., "New"). |
| `aspectRatio` | `string` | `undefined` | Aspect ratio (e.g., 'square', '4by3'). |

## CardContent

Standard content block for product cards.

**File:** `src/molecules/CardContent.astro`
**Dependencies:** `TextBlock` (Atom), `ProductPrice` (Molecule), `ProductStockIndicator` (Molecule)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Required | Product title. |
| `subtitle` | `string` | `undefined` | Product subtitle/description. |
| `price` | `number \| string` | Required | Price. |
| `compareAtPrice` | `number \| string` | `undefined` | Compare at price. |
| `currency` | `string` | `'USD'` | Currency. |
| `quantity` | `number` | `undefined` | Stock quantity (optional). |
| `lowStockThreshold` | `number` | `undefined` | Low stock threshold. |

## BreadcrumbItem

A single item in a breadcrumb navigation.

**File:** `src/molecules/BreadcrumbItem.astro`
**Dependencies:** `Button` (Atom) OR `TextBlock` (Atom)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | Required | Link text. |
| `href` | `string` | Required | Link URL. |
| `isActive` | `boolean` | `false` | Whether this is the current page. |

## FormField

A form field with label, input, and error message.

**File:** `src/molecules/FormField.astro`
**Dependencies:** `Label` (Atom), `Input` (Atom), `TextBlock` (Atom)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `label` | `string` | Required | Field label. |
| `required` | `boolean` | `false` | Whether field is required. |
| `error` | `string` | `undefined` | Error message to display. |
| `...inputProps` | `InputHTMLAttributes` | - | Standard input attributes (name, type, etc). |

## VariantSelector

Allows selecting a product variant.

**File:** `src/molecules/VariantSelector.astro`
**Dependencies:** `Label` (Atom), `Button` (Atom)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `options` | `{ label: string; value: string }[]` | Required | List of options. |
| `selected` | `string` | `undefined` | Currently selected value. |
| `name` | `string` | `'Variant'` | Label for the group. |

### Events

- **`variant-change`**: Dispatched when an option is clicked.
    - **Detail:** `{ value: string, name: string }`

## QuantitySelector

Input with increment/decrement buttons.

**File:** `src/molecules/QuantitySelector.astro`
**Dependencies:** `Button` (Atom), `Input` (Atom)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `value` | `number` | `1` | Current value. |
| `min` | `number` | `1` | Minimum value. |
| `max` | `number` | `99` | Maximum value. |

### Events

- **`quantity-change`**: Dispatched when value changes.
    - **Detail:** `{ value: number }`
