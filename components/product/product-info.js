export default function ProductInfo({ product }) {
  // Format price
  const price = product.priceRange?.minVariantPrice?.amount || '0'
  const currencyCode = product.priceRange?.minVariantPrice?.currencyCode || 'USD'
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price)

  return (
    <div className="pb-4">
      {product.vendor && (
        <p className="text-sm text-gray-500 mb-1">{product.vendor}</p>
      )}
      <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
      <p className="text-2xl font-medium">{formattedPrice}</p>
      
      <div className="text-primary bg-background not-prose mt-4">
        {product.description}
      </div>
    </div>
  )
}