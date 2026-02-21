# Shopify Mock Adapter

The project currently uses a mock adapter to simulate interactions with the Shopify Storefront API. This allows for development and testing without a live Shopify instance.

## Location
`src/lib/shopify/mockClient.ts`

## Key Functions

### `getProductVariant(id: string)`
Returns a `ProductVariant` object based on the provided ID.

- **Returns**: `Promise<ProductVariant | null>`
- **Mock Scenarios**:
    - `'sale'`: Returns a product with a `compareAtPrice` to trigger savings badge.
    - `'out-of-stock'`: Returns a product with `quantity: 0`.
    - `'limited'`: Returns a product with low stock (`quantity: 3`).
    - Default: Returns a standard product.

## Usage

```typescript
import { getProductVariant } from '../lib/shopify/mockClient';

const product = await getProductVariant('sale');
if (product) {
  console.log(product.title); // "Sample Product"
}
```

## Integration Strategy

The mock adapter is designed to be swapped out for a real Shopify client (e.g., using `@shopify/shopify-api`) by implementing the same interface. Future implementations will likely introduce an abstract `ShopifyClient` interface to formalize this contract.
