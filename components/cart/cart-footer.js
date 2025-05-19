import { formatPrice } from './price-formatter'
import CheckoutButton from './checkout-button'
import { cn } from '../../lib/utils'
import { SheetClose } from '../ui/sheet'

export default function CartFooter({ cart }) {
  return (
    <div className={"border-t border-gray-200 py-6 px-4 sm:px-6"}>
      <div className={"flex justify-between text-base font-medium text-gray-900"}>
        <p>Subtotal</p>
        <p>
          {formatPrice(
            cart.cost.subtotalAmount.amount,
            cart.cost.subtotalAmount.currencyCode
          )}
        </p>
      </div>
      <p className={"mt-0.5 text-sm text-gray-500"}>
        Shipping and taxes calculated at checkout.
      </p>
      <div className={"mt-6"}>
        <CheckoutButton cart={cart} />
      </div>
      <div className={"mt-6 flex justify-center text-sm text-center text-gray-500"}>
        <p>
          or{' '}
          <SheetClose className={"text-black font-medium hover:text-gray-700 cursor-pointer"}>
            Continue Shopping
            <span aria-hidden="true"> &rarr;</span>
          </SheetClose>
        </p>
      </div>
    </div>
  )
}