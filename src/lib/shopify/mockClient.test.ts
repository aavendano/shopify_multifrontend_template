import { describe, it, expect } from 'vitest';
import { getProductVariant } from './mockClient';

describe('getProductVariant', () => {
  it('should return default variant', async () => {
    const variantId = 'test-id';
    const variant = await getProductVariant(variantId);

    expect(variant).not.toBeNull();
    expect(variant?.id).toBe(variantId);
    expect(variant?.title).toBe(`Product Variant ${variantId}`);
    expect(variant?.price).toEqual({ amount: '19.99', currencyCode: 'USD' });
    expect(variant?.availableForSale).toBe(true);
    expect(variant?.quantityAvailable).toBe(100);
  });

  it('should return sale variant', async () => {
    const variant = await getProductVariant('sale');

    expect(variant).not.toBeNull();
    expect(variant?.price).toEqual({ amount: '14.99', currencyCode: 'USD' });
    expect(variant?.compareAtPrice).toEqual({ amount: '19.99', currencyCode: 'USD' });
  });

  it('should return out of stock variant', async () => {
    const variant = await getProductVariant('out-of-stock');

    expect(variant).not.toBeNull();
    expect(variant?.availableForSale).toBe(false);
    expect(variant?.quantityAvailable).toBe(0);
  });

  it('should return limited variant', async () => {
    const variant = await getProductVariant('limited');

    expect(variant).not.toBeNull();
    expect(variant?.quantityAvailable).toBe(5);
  });
});
