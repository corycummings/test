import ProductsGrid from '../products/products-grid'
import CollectionHero from './collection-hero'

export default function CollectionDetails({ collection }) {
  if (!collection) return null

  // Transform the products edges format to the format expected by ProductsGrid
  const products = collection.products.edges.map(({ node }) => node)

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <CollectionHero collection={collection} />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductsGrid products={products} />
      </div>
    </div>
  )
}