import { cn } from '../../lib/utils'
import { SheetClose } from '../ui/sheet'

export default function EmptyCart() {
  return (
    <div className={"mt-20 text-center"}>
      <svg
        className={"mx-auto h-12 w-12 text-gray-400"}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
      <h3 className={"mt-2 text-sm font-medium text-gray-900"}>Your cart is empty</h3>
      <p className={"mt-1 text-sm text-gray-500"}>Start shopping to add items to your cart.</p>
      <div className={"mt-6"}>
        <SheetClose className={cn(
          "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm",
          "text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        )}>
          Continue Shopping
        </SheetClose>
      </div>
    </div>
  )
}