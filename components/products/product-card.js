import Link from 'next/link'
import { Card, CardContent, CardFooter } from '../../components/ui/card'
import { cn } from '../../lib/utils'

export default function ProductCard({ product }) {
  const { title, handle, images, priceRange } = product
  
  // Get the first image or use a placeholder
  const imageUrl = images?.edges[0]?.node.url || 'https://placehold.co/600x400'
  
  // Get the price from price range
  const price = priceRange?.minVariantPrice?.amount || '0'
  const currencyCode = priceRange?.minVariantPrice?.currencyCode || 'USD'
  
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode,
  }).format(price)

  // Determine product link based on Shopify configuration
  const productLink = `/products/${handle}`    

  return (
    <Link href={productLink} className="group">
      <Card className={"h-full min-h-[300px] min-w-[200px] overflow-hidden hover:shadow-md transition-shadow border-border"}>
        <div className={"relative aspect-square overflow-hidden"}>
          <img 
            src={imageUrl}
            alt={title}
            className={"w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"}
          />
        </div>
        <CardContent className={"p-4 flex flex-col flex-grow"}>
          <div className="h-14">
            <h3 className={"text-lg font-medium line-clamp-2"}>{title}</h3>
          </div>
        </CardContent>
        <CardFooter className={"pt-0 p-4"}>
          <p className={"font-bold"}>{formattedPrice}</p>
        </CardFooter>
      </Card>
    </Link>
  )
}