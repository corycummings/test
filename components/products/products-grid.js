import ProductCard from './product-card'
import { cn } from '../../lib/utils'
import { BlurFade } from '../magicui/blur-fade'

export default function ProductGrid({ products }) {
  if (!products || products.length === 0) {
    return <div className={"text-center py-10"}>No products found</div>
  }

  return (
    <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"}>
      {products.map((product, idx) => (
        <BlurFade key={product.id} delay={0.1 + idx * 0.05} inView>
          <ProductCard product={product} />
        </BlurFade>
      ))}
    </div>
  )
}