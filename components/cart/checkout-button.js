import { useCart } from '../../context/cart-context'
import Spinner from '../../components/ui/Spinner'
import { Button } from '../../components/ui/button'
import { cn } from '../../lib/utils'

export default function CheckoutButton({ cart, className = "" }) {
  const { isLoading } = useCart()
  
  return (
    <Button 
      asChild 
      size="lg"       
      className={cn("cursor-pointer w-full", className)}
    >
      <a href={cart.checkoutUrl}>
        {isLoading ? (
          <>
            <Spinner size={5} />
            Processing...
          </>
        ) : (
          'Checkout'
        )}
      </a>
    </Button>
  )
}