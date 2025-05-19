import { useCart } from '../../context/cart-context'
import { cn } from '../../lib/utils'
import { Sheet, SheetContent } from '../ui/sheet'
import CartHeader from './cart-header'
import EmptyCart from './empty-cart'
import CartItemList from './cart-item-list'
import CartFooter from './cart-footer'

export default function Cart() {
  const { 
    cart, 
    isCartOpen, 
    closeCart, 
    isLoading,
    updateCartItem,
    removeCartItem
  } = useCart()

  const hasItems = cart?.lines?.edges?.length > 0

  return (
    <Sheet open={isCartOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className={"w-full sm:max-w-md pt-6 flex flex-col"}>
        <div className="flex-1 overflow-y-auto px-1 sm:px-2">
          <CartHeader />
          
          {!hasItems ? (
            <EmptyCart />
          ) : (
            <CartItemList 
              cart={cart} 
              updateCartItem={updateCartItem}
              removeCartItem={removeCartItem}
              isLoading={isLoading}
            />
          )}
        </div>

        {hasItems && (
          <CartFooter cart={cart} />
        )}
      </SheetContent>
    </Sheet>
  )
}