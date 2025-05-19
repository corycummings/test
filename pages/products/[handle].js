import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { client } from '../../shopify/client'
import { QUERY_PRODUCT_BY_HANDLE } from '../../graphql/products'
import { useCart } from '../../context/cart-context'

// Import components
import Breadcrumbs from '../../components/layout/breadcrumbs'
import ProductDetails from '../../components/product/product-details'
import RecommendedProducts from '../../components/products/recommended-products'

export default function ProductPage() {
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedVariant, setSelectedVariant] = useState(null)
  const [selectedOptions, setSelectedOptions] = useState({})
  const [selectedSellingPlan, setSelectedSellingPlan] = useState(null)
  const router = useRouter()
  const { handle } = router.query
  const { addToCart, isLoading: isCartLoading } = useCart()

  useEffect(() => {
    // Don't fetch until we have the handle from the router
    if (!handle) return

    async function fetchProduct() {
      try {
        setLoading(true)
        
        // Request product from Shopify using the existing query from graphql/products.js
        const { data, errors } = await client.request(QUERY_PRODUCT_BY_HANDLE, {
          variables: {
            handle: handle
          },
        })

        // Check for GraphQL errors
        if (errors) {
          console.error('GraphQL errors:', errors)
          setError('Failed to fetch product due to GraphQL errors')
          setLoading(false)
          return
        }

        // Handle product not found
        if (!data.productByHandle) {
          setError('Product not found')
          setLoading(false)
          return
        }

        const product = data.productByHandle
        setProduct(product)
        
        // Set default selected options based on the first variant
        if (product.variants.edges.length > 0) {
          const firstVariant = product.variants.edges[0].node
          setSelectedVariant(firstVariant)
          
          // Initialize selected options with the first variant's options
          const initialOptions = {}
          firstVariant.selectedOptions.forEach(option => {
            initialOptions[option.name] = option.value
          })
          setSelectedOptions(initialOptions)
        }
        
        setLoading(false)
      } catch (err) {
        console.error('Error fetching product:', err)
        setError('Failed to fetch product')
        setLoading(false)
      }
    }

    fetchProduct()
  }, [handle])
  
  // Update the selected options and find the matching variant
  const handleOptionChange = (optionName, optionValue) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: optionValue
    }
    
    setSelectedOptions(newSelectedOptions)
    
    // Find the variant that matches all selected options
    const matchingVariant = product.variants.edges.find(({ node }) => {
      return node.selectedOptions.every(option => 
        newSelectedOptions[option.name] === option.value
      )
    })
    
    if (matchingVariant) {
      setSelectedVariant(matchingVariant.node)
    }
  }

  return (
    <div className="min-h-screen p-8 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs product={product} />
        
        <ProductDetails 
          product={product}
          loading={loading}
          error={error}
          selectedVariant={selectedVariant}
          selectedOptions={selectedOptions}
          selectedSellingPlan={selectedSellingPlan}
          setSelectedSellingPlan={setSelectedSellingPlan}
          handleOptionChange={handleOptionChange}
          isCartLoading={isCartLoading}
          addToCart={addToCart}
        />
        
        {/* Recommended Products Section */}
        {product?.id && (
          <div className="mt-16">
            <RecommendedProducts productId={product.id} />
          </div>
        )}
      </div>
    </div>
  )
}