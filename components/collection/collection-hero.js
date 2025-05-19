import { cn } from '../../lib/utils'

export default function CollectionHero({ collection }) {
  if (!collection) return null

  return (
    <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
      {collection.image ? (
        <div className="absolute inset-0 w-full">
          <img 
            src={collection.image.url} 
            alt={collection.image.altText || collection.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gray-900">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
        </div>
      )}
      
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
        <h1 className="text-white text-4xl md:text-6xl font-bold text-center mb-4">
          {collection.title}
        </h1>
        {collection.description && (
          <p className="text-white/80 text-center max-w-2xl text-lg md:text-xl">
            {collection.description}
          </p>
        )}
      </div>
    </div>
  )
}