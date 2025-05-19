
export default function ShopifyRequired() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
            Getting Started with Shopify
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Connect shopify in your Frontend project settings
          </p>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-sm text-black mb-2 font-medium">
              Required environment variables:
            </p>
            <ul className="list-none pl-2 text-xs font-mono text-black space-y-1">
              <li>NEXT_PUBLIC_SHOPIFY_DOMAIN</li>
              <li>NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}