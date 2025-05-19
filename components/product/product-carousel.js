import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'

export default function ProductCarousel({ products }) {
  const [emblaRef] = useEmblaCarousel({ slidesToScroll: 'auto', align: 'start' })

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {products && products.map((product, index) => (
          <div key={product.id || index} className="flex-none max-w-[320px] min-w-0 px-2">
            {product}
          </div>
        ))}
      </div>
    </div>
  )
}