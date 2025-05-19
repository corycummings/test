import Link from 'next/link'
import { Card } from '../ui/card'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'

export default function CollectionSlide({ collection, fullWidth = false }) {
  const { title, handle, image } = collection
  
  const collectionLink = `/collections/${handle}`     
  
  return (
    <div className={cn("group", fullWidth && "w-full")}>
      <Card className={cn(
        "h-full min-h-[450px] overflow-hidden hover:shadow-md transition-shadow border-border relative",
        fullWidth ? "w-full" : "min-w-[160px]"
      )}>
        <div className={"absolute inset-0 w-full h-full"}>
          {image && (
            <img 
              src={image.url}
              alt={image.altText || title}
              className={cn(
                "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              )}
            />
          )}
          {!image && (
            <img 
              src={`https://placehold.co/600x600/E0E0E0/000000?text=${encodeURIComponent(title || 'Collection')}`}
              alt={title || 'Collection'}
              className={cn(
                "w-full h-full object-cover"
              )}
            />
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 py-12">
            <h3 className={"text-3xl md:text-4xl font-bold text-white text-center mb-6"}>{title}</h3>
            <Link href={collectionLink}>
              <Button variant="secondary" className="rounded-none text-white bg-black hover:bg-black/80 px-8 py-6 h-auto text-base">
                Shop All
              </Button>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}