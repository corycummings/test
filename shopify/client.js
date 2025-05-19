import {createStorefrontApiClient} from '@shopify/storefront-api-client';

export const hasShopifyCredentials = () => {
  return Boolean(
    process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN && 
    process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
  );
};

export const client = hasShopifyCredentials() 
  ? createStorefrontApiClient({
      storeDomain: `https://${process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN}`,
      apiVersion: '2025-01',
      publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN
    })
  : createMockClient();

function createMockClient() {
  return {
    query: () => Promise.resolve({ data: {} }),
    request: () => Promise.resolve({ data: {} }),
    runInstantSearch: () => Promise.resolve({ data: {} }),
  };
}