import { useState, useEffect } from 'react'
import { cn } from '../../lib/utils'
import Zoom from 'react-medium-image-zoom'
import { X } from 'lucide-react'
import 'react-medium-image-zoom/dist/styles.css'

export default function ProductImageGallery({ images, productTitle, selectedVariant }) {
  const [selectedImage, setSelectedImage] = useState(
    images?.edges?.length > 0 ? images.edges[0].node : null
  )
  
  // Update selected image when variant changes (especially for color changes)
  useEffect(() => {
    if (selectedVariant?.image) {
      // Find matching image in the image gallery
      const variantImageNode = images?.edges?.find(
        edge => edge.node.id === selectedVariant.image.id
      )?.node
      
      // Set the selected image to the variant image if found
      if (variantImageNode) {
        setSelectedImage(variantImageNode)
      }
    }
  }, [selectedVariant, images])

  if (!images?.edges?.length) {
    return (
      <div className="aspect-square overflow-hidden rounded-lg border border-gray-200 bg-gray-100 flex items-center justify-center">
        <p className="text-gray-500">No image available</p>
      </div>
    )
  }

  const imageEdges = images.edges || []

  return (
    <div className="space-y-4">
      {/* Main Image with Zoom */}
      <div className="aspect-square overflow-hidden rounded-lg border border-gray-200">
        <Zoom IconUnzoom={() => <X className="w-5 h-5 text-white" style={{ marginLeft: '1px' }} />}>
          <img 
            src={selectedImage?.url || imageEdges[0]?.node.url} 
            alt={selectedImage?.altText || productTitle}
            className="w-full h-full object-cover aspect-square"
          />
        </Zoom>
      </div>
      
      {/* Thumbnail Gallery */}
      {imageEdges.length > 1 && (
        <div className="flex space-x-2 overflow-none py-2">
          {imageEdges.map(({ node }) => (
            <div 
              key={node.id} 
              className={cn(
                "cursor-pointer w-20 h-20 rounded-lg overflow-hidden",
                selectedImage?.id === node.id 
                  ? 'ring-1 ring-black border border-black' 
                  : 'border border-gray-200'
              )}
              onClick={() => setSelectedImage(node)}
            >
              <img 
                src={node.url} 
                alt={node.altText || productTitle}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}