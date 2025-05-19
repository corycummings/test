import { useState, useEffect, useCallback } from 'react'
import { client } from '../../shopify/client'
import { QUERY_COLLECTIONS } from '../../graphql/collections'
import useEmblaCarousel from 'embla-carousel-react'
import CollectionSlide from './collection-slide'
import Spinner from '../ui/Spinner'
import { cn } from '../../lib/utils'
import { BlurFade } from '../magicui/blur-fade'

export default function CollectionsSlideshow() {
  const [collections, setCollections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = useCallback(
    (index) => {
      if (emblaApi) emblaApi.scrollTo(index)
    },
    [emblaApi]
  )

  useEffect(() => {
    async function fetchCollections() {
      try {
        setLoading(true)
                        
        const { data, errors } = await client.request(QUERY_COLLECTIONS, { 
          variables: { first: 10 } 
        })
        
        if (errors) {
          console.error('GraphQL errors:', errors)
          setError('Failed to fetch collections')
          setLoading(false)
          return
        }
        
        setCollections(data.collections.edges.map(edge => edge.node))
        setLoading(false)
      } catch (err) {
        console.error('Error fetching collections:', err)
        setError('Failed to fetch collections')
        setLoading(false)
      }
    }

    fetchCollections()
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setActiveIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on('select', onSelect)
    onSelect() // Initialize with the current selected index

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  if (loading) {
    return (
      <div className={"flex justify-center items-center py-16 w-full"}>
        <Spinner size={6} className={"text-black inline-block mb-2"} />
      </div>
    )
  }

  if (error) {
    return null
  }

  if (!collections.length) {
    return null
  }

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {collections.map((collection, idx) => (
            <div key={collection.id} className="flex-none w-full">
              <BlurFade delay={0.1 + idx * 0.05} inView>
                <CollectionSlide collection={collection} fullWidth={true} />
              </BlurFade>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-center mt-4">
        {collections.map((_, idx) => (
          <button
            key={idx}
            onClick={() => scrollTo(idx)}
            className={cn(
              "w-2 h-2 rounded-full mx-1 transition-all",
              idx === activeIndex ? "bg-black w-4" : "bg-gray-300"
            )}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  )
}