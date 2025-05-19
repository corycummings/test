import { useState } from 'react'
import Link from 'next/link'
import { formatPrice } from './price-formatter'
import { Button } from '../ui/button'
import { X } from 'lucide-react'
import CartItemSkeleton from './cart-item-skeleton'

export default function CartItem({ item, updateCartItem, removeCartItem }) {
  const [isRemoving, setIsRemoving] = useState(false)
  const { node } = item
  const product = node.merchandise.product
  const variant = node.merchandise
  
  const handleRemove = async () => {
    setIsRemoving(true)
    await removeCartItem(node.id)
    // We don't need to set isRemoving to false since the component will unmount
  }
  
  if (isRemoving) {
    return <CartItemSkeleton />
  }
  
  return (
    <li className="py-6 flex items-center">
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        {variant.image ? (
          <img
            src={variant.image.url}
            alt={variant.image.altText || product.title}
            className="w-full h-full object-center object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No image
          </div>
        )}
      </div>

      <div className="ml-4 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/products/${product.handle}`}>
                {product.title}
              </Link>
            </h3>
            <p className="ml-4">
              {formatPrice(
                variant.price.amount * node.quantity,
                variant.price.currencyCode
              )}
            </p>
          </div>
          <p className="mt-1 text-sm text-gray-500">
            {variant.title !== 'Default Title' ? variant.title : ''}
          </p>
          <div className="flex-1 flex items-end text-sm mt-auto">
            <div className="flex items-center">
              <span className="mr-2 text-gray-500">Qty</span>
              <select
                value={node.quantity}
                onChange={(e) => 
                  updateCartItem(node.id, parseInt(e.target.value))
                }
                className="rounded border-gray-300"
                disabled={isRemoving}
              >
                {[...Array(10).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-6 w-6 p-0 rounded-full text-gray-400 hover:text-gray-600 ml-2 flex items-center justify-center cursor-pointer"
        onClick={handleRemove}
        disabled={isRemoving}
        aria-label="Remove item"
      >
        <X size={14} />
      </Button>
    </li>
  )
}