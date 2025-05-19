import ProductImageGallery from './product-image-gallery'
import ProductInfo from './product-info'
import ProductOptions from './product-options'
import ProductSubscriptionOptions from './product-subscription-options'
import AddToCartButton from './add-to-cart-button'
import ProductLoading from './product-loading'
import ProductError from './product-error'

export default function ProductDetails({
  product,
  loading,
  error,
  selectedVariant,
  selectedOptions,
  selectedSellingPlan,
  setSelectedSellingPlan,
  handleOptionChange,
  isCartLoading,
  addToCart
}) {
  // Loading state
  if (loading) {
    return <ProductLoading />
  }

  // Error state
  if (error) {
    return <ProductError error={error} />
  }

  // No product state
  if (!product) {
    return <ProductError error="Product not found" />
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
      {/* Product Images */}
      <ProductImageGallery 
        images={product.images} 
        productTitle={product.title}
        selectedVariant={selectedVariant} 
      />
      
      {/* Product Details */}
      <div className="space-y-4">
        <ProductInfo product={product} />
        
        {/* Product Options */}
        <ProductOptions 
          options={product.options} 
          selectedOptions={selectedOptions} 
          handleOptionChange={handleOptionChange}
        />
        
        {/* Subscription Options - Only show if product has selling plan groups */}
        <ProductSubscriptionOptions
          sellingPlanGroups={product.sellingPlanGroups}
          selectedSellingPlan={selectedSellingPlan}
          setSelectedSellingPlan={setSelectedSellingPlan}
        />
        
        {/* Add to Cart Button */}
        <AddToCartButton 
          selectedVariant={selectedVariant}
          selectedSellingPlan={selectedSellingPlan}
          isLoading={isCartLoading}
          addToCart={addToCart}
        />
      </div>
    </div>
  )
}