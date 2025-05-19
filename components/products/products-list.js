import { useState, useEffect } from 'react'
import { client } from '../../shopify/client'
import Spinner from '../ui/Spinner'
import ProductsGrid from './products-grid'

export default function ProductsList() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        
        // Define the products query
        const productsQuery = `
          query ProductsQuery($first: Int!, $sortKey: ProductSortKeys, $reverse: Boolean) {
            products(first: $first, sortKey: $sortKey, reverse: $reverse) {
              edges {
                node {
                  id
                  title
                  handle
                  description
                  priceRange {
                    minVariantPrice {
                      amount
                      currencyCode
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        id
                        url
                        altText
                      }
                    }
                  }
                }
              }
            }
          }
        `

        // Request products from Shopify
        const { data, errors } = await client.request(productsQuery, {
          variables: {
            first: 12,
            sortKey: 'CREATED_AT',
            reverse: true
          },
        })

        // Check for GraphQL errors
        if (errors) {
          console.error('GraphQL errors:', errors)
          setError('Failed to fetch products due to GraphQL errors')
          setLoading(false)
          return
        }

        // Set products state
        setProducts(data.products.edges.map(edge => edge.node))
        setLoading(false)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to fetch products')
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) {
    return (
      <div className={"text-center py-10"}>
        <Spinner size={8} className={"text-black inline-block mb-4"} />
        <p>Loading products...</p>
      </div>
    )
  }

  if (error) {
    return <div className={"text-center py-10 text-red-500"}>{error}</div>
  }

  if (products.length === 0) {
    return <div className={"text-center py-10"}>No products found</div>
  }

  return (
    <div className={"w-full"}>
      <ProductsGrid products={products} />
    </div>
  )
}