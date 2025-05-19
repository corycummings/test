import { useState, useEffect } from 'react'
import { client } from '../../shopify/client'
import ProductCard from './product-card'
import { QUERY_PRODUCT_RECOMMENDATIONS } from '../../graphql/products'
import Spinner from '../../components/ui/Spinner'
import { cn } from '../../lib/utils'
import { BlurFade } from '../../components/magicui/blur-fade'

export default function RecommendedProducts({ productId }) {
  const [recommendedProducts, setRecommendedProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchRecommendedProducts() {
      if (!productId) {
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        
        const variables = {
          productId
        }
        
        const { data, errors } = await client.request(QUERY_PRODUCT_RECOMMENDATIONS, { variables })
        
        // Check for GraphQL errors
        if (errors) {
          console.error('GraphQL errors:', errors)
          setError('Failed to fetch recommended products')
          setLoading(false)
          return
        }
        
        // Set recommended products state
        setRecommendedProducts(data.productRecommendations || [])
        setLoading(false)
      } catch (err) {
        console.error('Error fetching recommended products:', err)
        setError('Failed to fetch recommended products')
        setLoading(false)
      }
    }

    fetchRecommendedProducts()
  }, [productId])

  if (loading) {
    return (
      <div className={"mt-12"}>
        <h2 className={"text-2xl font-bold mb-6"}>Recommended Products</h2>
        <div className={"text-center py-6"}>
          <Spinner size={6} className={"text-black inline-block mb-2"} />
          <p>Loading recommendations...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return null // Hide component on error
  }

  if (!recommendedProducts.length) {
    return null // Hide component if no recommendations
  }

  // Import the ProductCarousel component using dynamic import
  const ProductCarousel = require('../../components/product/product-carousel').default

  return (
    <div className={"mt-12"}>
      <h2 className={"text-2xl font-bold mb-6"}>Recommended Products</h2>
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"}>
        {recommendedProducts.map((product, idx) => (
          <BlurFade key={product.id} delay={0.1 + idx * 0.05} inView>
            <ProductCard product={product} />
          </BlurFade>
        ))}
      </div>
    </div>
  )
}