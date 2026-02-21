# Organisms

Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms. They form distinct sections of an interface.

**Design Rule**: Organisms manage their own internal UI state (e.g., toggling a dropdown) via vanilla JavaScript but must **not** fetch data directly. All data must be passed via props.

## ProductCard

Displays product summary with quick add functionality.

**File:** `src/organisms/ProductCard.astro`
**Dependencies:** `CardMedia` (Molecule), `CardContent` (Molecule), `Button` (Atom)

### Events

- **`add-to-cart`**: Dispatched when the "Add" button is clicked.
    - **Detail:** `{ productId: string }`

## ProductGrid

A responsive grid layout for displaying a collection of products.

**File:** `src/organisms/ProductGrid.astro`
**Dependencies:** `Container` (Atom), `ProductCard` (Organism)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `products` | `Product[]` | Required | Array of product objects. |
| `columns` | `number` | `4` | Number of columns on desktop. |

## FiltersPanel

A form interface for filtering product lists.

**File:** `src/organisms/FiltersPanel.astro`
**Dependencies:** `FormField` (Molecule), `Button` (Atom)

### Events

- **`filter-change`**: Dispatched when any filter input changes.
    - **Detail:** `{ [key: string]: string | string[] }`

## Header

The main site navigation header.

**File:** `src/organisms/Header.astro`
**Dependencies:** `Container` (Atom), `TextBlock` (Atom), `Icon` (Atom), `Button` (Atom)

### Events

- **`menu-toggle`**: Toggles the mobile menu visibility.
- **`cart-open`**: Opens the Cart Drawer.

## Footer

The site footer containing links and copyright info.

**File:** `src/organisms/Footer.astro`
**Dependencies:** `Container` (Atom), `TextBlock` (Atom)

## ProductGallery

An interactive image gallery for product details.

**File:** `src/organisms/ProductGallery.astro`
**Dependencies:** `Image` (Atom)

### Events

- **`image-change`**: Dispatched when the main image changes.
    - **Detail:** `{ src: string }`

## ProductDetails

The full detail view for a product, including variant and quantity selection.

**File:** `src/organisms/ProductDetails.astro`
**Dependencies:** `ProductPrice` (Molecule), `ProductStockIndicator` (Molecule), `VariantSelector` (Molecule), `QuantitySelector` (Molecule), `Button` (Atom)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `product` | `Product` | Required | The full product object. |

### Events

- **`variant-change`**: Dispatched when a variant is selected.
    - **Detail:** `{ value: string, name: string, productId: string }`
- **`quantity-change`**: Dispatched when quantity is updated.
    - **Detail:** `{ value: number, productId: string }`
- **`add-to-cart`**: Dispatched when the "Add to Cart" button is clicked.
    - **Detail:** `{ productId: string, variantId: string, quantity: number }`

## CartDrawer

A slide-out drawer displaying the current cart contents.

**File:** `src/organisms/CartDrawer.astro`
**Dependencies:** `Container` (Atom), `TextBlock` (Atom), `Button` (Atom), `Image` (Atom), `Icon` (Atom)

### Events

- **`close`**: Dispatched when the close button or overlay is clicked.
- **`remove-item`**: Dispatched when an item removal is requested.
    - **Detail:** `{ id: string }`
- **`checkout`**: Dispatched when the checkout button is clicked.

## RelatedProducts

A section displaying products related to the current item.

**File:** `src/organisms/RelatedProducts.astro`
**Dependencies:** `ProductGrid` (Organism), `Container` (Atom), `TextBlock` (Atom)

### Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `products` | `Product[]` | Required | List of related products. |
