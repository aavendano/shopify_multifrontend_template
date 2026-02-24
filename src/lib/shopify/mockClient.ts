/**
 * Represents a monetary value with currency.
 */
export interface MoneyV2 {
  /** The decimal amount as a string. */
  amount: string;
  /** The ISO 4217 currency code. */
  currencyCode: string;
}

/**
 * Represents a product variant returned from the Storefront API.
 */
export interface ProductVariant {
  /** Unique identifier for the variant. */
  id: string;
  /** The title of the variant. */
  title: string;
  /** The current price. */
  price: MoneyV2;
  /** The original price (if on sale). */
  compareAtPrice?: MoneyV2;
  /** Whether the product is available for purchase. */
  availableForSale: boolean;
  /** The quantity currently in stock. */
  quantityAvailable?: number;
}

/**
 * Mock function to simulate fetching a product variant by ID.
 *
 * This function simulates a network request to the Shopify Storefront API
 * to retrieve product variant details. It supports specific IDs to trigger
 * different test scenarios.
 *
 * @param variantId - The ID of the variant to fetch.
 * @returns A Promise resolving to the `ProductVariant` or `null` if not found.
 *
 * @example
 * // Fetch a standard product
 * const product = await getProductVariant('123');
 *
 * @example
 * // Fetch a product on sale
 * const saleProduct = await getProductVariant('sale');
 *
 * @example
 * // Fetch an out-of-stock product
 * const outOfStockProduct = await getProductVariant('out-of-stock');
 */
export async function getProductVariant(variantId: string): Promise<ProductVariant | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 50));

  if (variantId === 'missing') {
    return null;
  }

  const base: ProductVariant = {
    id: variantId,
    title: `Product Variant ${variantId}`,
    price: { amount: "19.99", currencyCode: "USD" },
    availableForSale: true,
    quantityAvailable: 100,
  };

  if (variantId === 'sale') {
    base.price = { amount: "14.99", currencyCode: "USD" };
    base.compareAtPrice = { amount: "19.99", currencyCode: "USD" };
  } else if (variantId === 'out-of-stock') {
    base.availableForSale = false;
    base.quantityAvailable = 0;
  } else if (variantId === 'limited') {
    base.quantityAvailable = 5;
  }

  return base;
}
