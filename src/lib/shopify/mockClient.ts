export interface MoneyV2 {
  amount: string;
  currencyCode: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: MoneyV2;
  compareAtPrice?: MoneyV2;
  availableForSale: boolean;
  quantityAvailable?: number;
}

/**
 * Mock function to simulate fetching a product variant by ID.
 * Supports special IDs for testing:
 * - 'sale': Returns a product on sale.
 * - 'out-of-stock': Returns an unavailable product.
 * - 'limited': Returns a product with low stock.
 */
export async function getProductVariant(variantId: string): Promise<ProductVariant | null> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 50));

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
