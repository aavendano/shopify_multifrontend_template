# Phase 5 Organisms Audit Report

## Summary
- **Total files analyzed:** 13
- **Files fully compliant:** 3
- **Files with violations:** 10

Compliant files:
- `src/organisms/FiltersPanel.test.ts`
- `src/organisms/ProductCard.test.ts`
- `src/organisms/ProductDetails.test.ts`

Files with violations:
- `src/organisms/RelatedProducts.astro`
- `src/organisms/ProductGallery.astro`
- `src/organisms/Header.astro`
- `src/organisms/CartDrawer.astro`
- `src/organisms/Footer.astro`
- `src/organisms/ProductCard.astro`
- `src/organisms/Header.test.ts`
- `src/organisms/ProductGrid.astro`
- `src/organisms/FiltersPanel.astro`
- `src/organisms/ProductDetails.astro`

## Rules Compliance
- **Rule 1 (organisms may only import atoms and molecules): FAIL**  
  `RelatedProducts.astro` imports `./ProductGrid.astro`; `ProductGrid.astro` imports `./ProductCard.astro`; test files import organism components.
- **Rule 2 (no imports from pages/layouts): PASS**  
  No file in `src/organisms` imports from `src/pages` or `src/layouts`.
- **Rule 3 (no data fetching/API/Shopify clients): PASS**  
  No `fetch`, API client, Shopify client, or mock client usage found.
- **Rule 4 (no business logic/data transformation): FAIL**  
  Pricing math and transformations exist in `CartDrawer.astro`; variant/price/stock derivation in `ProductDetails.astro`; filter payload transformation in `FiltersPanel.astro`; truthy badge logic in `Header.astro`.
- **Rule 5 (all data via props, no internal business derivation): FAIL**  
  `ProductDetails.astro` derives selected variant, current price/compare price/stock and option arrays; `ProductGallery.astro` derives active image from props fallback.
- **Rule 6 (events via CustomEvent with detail + bubbles true): FAIL**  
  Several events omit `detail` payload (`menu-toggle`, `cart-open`, `close`, `checkout`).
- **Rule 7 (no hard-coded CSS values, only Bulma/theme tokens): FAIL**  
  Multiple files contain explicit px/rem/hex/rgba values and inline style attributes.
- **Rule 8 (no direct Shopify/storefront references): PASS**  
  No direct Shopify/storefront API references found.

## File Breakdown

### 1) `src/organisms/RelatedProducts.astro`
**Imports**
- `./ProductGrid.astro` — **forbidden import** (organism-to-organism)
- `../atoms/TextBlock.astro` — atom
- `../atoms/Container.astro` — atom

**Violations**
- Rule 1: Imports organism (`ProductGrid`) instead of only atoms/molecules.

**Evidence**
- `import ProductGrid from './ProductGrid.astro';`

**Events**
- None emitted.

**Recommendations**
- Replace `ProductGrid` dependency with molecules/atoms composition directly inside this file, or demote `ProductGrid` to a molecule if architecture allows.

---

### 2) `src/organisms/ProductGallery.astro`
**Imports**
- `../atoms/Image.astro` — atom

**Violations**
- Rule 5: Derives `currentImage` internally (`selectedImage || images[0]`).
- Rule 7: Hard-coded CSS values (`-0.25rem`, `20%`, `0.2s`, `1.05`, `2px`).

**Evidence**
- `const currentImage = selectedImage || images[0];`
- CSS block with explicit numeric values in local `<style>`.

**Events**
- `image-change`
  - payload: `{ src }`
  - bubbles: `true`

**Recommendations**
- Receive `currentImage` as a required prop instead of deriving fallback.
- Replace local style values with Bulma utility classes or theme tokens.

---

### 3) `src/organisms/Header.astro`
**Imports**
- `../atoms/Container.astro` — atom
- `../atoms/TextBlock.astro` — atom
- `../atoms/Icon.astro` — atom
- `../atoms/Button.astro` — atom

**Violations**
- Rule 4: UI/business conditional for cart count badge (`cartCount > 0`).
- Rule 6: Emitted events omit `detail` object.
- Rule 7: Hard-coded CSS values (`1px`, `#dbdbdb`, `-8px`, `1.25rem`, `0.75rem`).

**Evidence**
- `{cartCount > 0 && (...)}`
- `new CustomEvent('menu-toggle', { bubbles: true })`
- `new CustomEvent('cart-open', { bubbles: true })`
- Local `<style>` with explicit values.

**Events**
- `menu-toggle` — payload: **none** (missing `detail`), bubbles `true`
- `cart-open` — payload: **none** (missing `detail`), bubbles `true`

**Recommendations**
- Pass a boolean prop like `showCartBadge` (computed upstream).
- Emit `{ detail: {} }` at minimum.
- Replace local CSS with Bulma helpers/token-based classes.

---

### 4) `src/organisms/CartDrawer.astro`
**Imports**
- `../atoms/Container.astro` — atom (**unused**)
- `../atoms/TextBlock.astro` — atom
- `../atoms/Button.astro` — atom
- `../atoms/Image.astro` — atom
- `../atoms/Icon.astro` — atom

**Violations**
- Rule 4: Price math and formatting (`Number(item.price) * item.quantity`, subtotal formatting); empty-state and disabled-state logic.
- Rule 6: `close` and `checkout` events emitted without `detail`.
- Rule 7: Inline style (`width: 80px;`) and local hard-coded CSS values (`rgba(...)`, `400px`, `1px`, `#dbdbdb`, timing values).

**Evidence**
- `{...format(Number(item.price) * item.quantity)}`
- `{...format(Number(subtotal))}`
- `style="width: 80px;"`
- `new CustomEvent('close', { bubbles: true })`
- `new CustomEvent('checkout', { bubbles: true })`

**Events**
- `close` — payload: **none** (missing `detail`), bubbles `true`
- `remove-item` — payload: `{ id }`, bubbles `true`
- `checkout` — payload: **none** (missing `detail`), bubbles `true`

**Recommendations**
- Move all currency formatting and line-total computation upstream; pass preformatted strings as props.
- Emit `detail` for all events.
- Remove inline style and hard-coded CSS values in favor of Bulma/token classes.
- Remove unused `Container` import.

---

### 5) `src/organisms/Footer.astro`
**Imports**
- `../atoms/Container.astro` — atom
- `../atoms/TextBlock.astro` — atom

**Violations**
- Rule 7: Hard-coded CSS value (`1px solid #dbdbdb`).

**Evidence**
- `.border-top { border-top: 1px solid #dbdbdb; }`

**Events**
- None emitted.

**Recommendations**
- Replace custom border style with Bulma border utility or tokenized class.

---

### 6) `src/organisms/ProductCard.astro`
**Imports**
- `../molecules/CardMedia.astro` — molecule
- `../molecules/CardContent.astro` — molecule
- `../atoms/Button.astro` — atom

**Violations**
- Rule 7: Hard-coded CSS values (`0.2s`, `-4px`, `0 4px 12px rgba(...)`).

**Evidence**
- Local `<style>` transition/transform/box-shadow values.

**Events**
- `add-to-cart`
  - payload: `{ productId }`
  - bubbles: `true`

**Recommendations**
- Move hover/transition/shadow styling to theme token classes or approved utility classes.

---

### 7) `src/organisms/FiltersPanel.test.ts`
**Imports**
- `astro/container` — external dependency
- `vitest` — external dependency
- `./FiltersPanel.astro` — local organism import (test context)

**Violations**
- None.

**Evidence**
- Test-only render assertions; no architectural rule breaches in runtime organism behavior.

**Events**
- None.

**Recommendations**
- Keep as-is.

---

### 8) `src/organisms/ProductCard.test.ts`
**Imports**
- `astro/container` — external dependency
- `vitest` — external dependency
- `./ProductCard.astro` — local organism import (test context)

**Violations**
- None.

**Evidence**
- Test-only render assertions.

**Events**
- None.

**Recommendations**
- Keep as-is.

---

### 9) `src/organisms/ProductDetails.test.ts`
**Imports**
- `astro/container` — external dependency
- `vitest` — external dependency
- `./ProductDetails.astro` — local organism import (test context)

**Violations**
- None.

**Evidence**
- Test-only render assertions.

**Events**
- None.

**Recommendations**
- Keep as-is.

---

### 10) `src/organisms/Header.test.ts`
**Imports**
- `astro/container` — external dependency
- `vitest` — external dependency
- `./Header.astro` — local organism import (test context)

**Violations**
- Rule 1 (strict interpretation): test imports organism component.

**Evidence**
- `import Header from './Header.astro';`

**Events**
- None.

**Recommendations**
- If rule scope includes tests, move these to a separate integration-test area outside `src/organisms` or exempt tests explicitly in architecture policy.

---

### 11) `src/organisms/ProductGrid.astro`
**Imports**
- `../atoms/Container.astro` — atom
- `./ProductCard.astro` — **forbidden import** (organism-to-organism)

**Violations**
- Rule 1: Imports organism (`ProductCard`).

**Evidence**
- `import ProductCard from './ProductCard.astro';`

**Events**
- None emitted.

**Recommendations**
- Replace with molecules/atoms composition directly, or reclassify `ProductCard` as molecule and relocate accordingly.

---

### 12) `src/organisms/FiltersPanel.astro`
**Imports**
- `../molecules/FormField.astro` — molecule
- `../atoms/Button.astro` — atom
- `../atoms/Label.astro` — atom (**unused**)

**Violations**
- Rule 4: Internal transformation from `FormData` into grouped object for payload.
- Rule 6: `filter-change` uses correct bubbling/detail (pass for event shape).

**Evidence**
- `const formData = new FormData(form);`
- Loop building `data` object and array coercion before dispatch.

**Events**
- `filter-change`
  - payload: `Record<string, any>` from transformed form state
  - bubbles: `true`

**Recommendations**
- Emit raw `FormData` or field-level events and delegate transformation to parent/application layer.
- Remove unused `Label` import.

---

### 13) `src/organisms/ProductDetails.astro`
**Imports**
- `../atoms/TextBlock.astro` — atom
- `../molecules/ProductPrice.astro` — molecule
- `../molecules/ProductStockIndicator.astro` — molecule
- `../molecules/VariantSelector.astro` — molecule
- `../molecules/QuantitySelector.astro` — molecule
- `../atoms/Button.astro` — atom

**Violations**
- Rule 4: Internal derivation of selected variant and computed current values; parses quantity from DOM.
- Rule 5: Business data derived internally (`selectedVariant`, `currentPrice`, `currentComparePrice`, `currentStock`, `variantOptions`).
- Rule 6: `add-to-cart` event includes detail+bubbles (pass), `variant-change`/`quantity-change` include detail+bubbles (pass).

**Evidence**
- `const selectedVariant = product.variants.find(...) || product.variants[0];`
- `const currentPrice = ...`
- `const variantOptions = product.variants.map(...)`
- `const quantity = qtyInput ? parseInt(qtyInput.value) : 1;`

**Events**
- `variant-change`
  - payload: merged child event detail + `productId`
  - bubbles: `true`
- `quantity-change`
  - payload: merged child event detail + `productId`
  - bubbles: `true`
- `add-to-cart`
  - payload: `{ productId }`
  - bubbles: `true`

**Recommendations**
- Push variant resolution, stock/price selection, and option mapping to parent layer; pass resolved values via props.
- Avoid DOM parsing for quantity in organism; require current quantity via props/event detail forwarded from parent state.

## Conclusion
Phase 5 Organisms are **not fully compliant** with the target architecture. The largest recurring problems are:
1. organism-to-organism imports,
2. internal business/data derivation,
3. non-uniform event payloads (missing `detail`), and
4. hard-coded CSS values.
