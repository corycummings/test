import { cn } from '../../lib/utils'
import { SheetTitle } from '../ui/sheet'

export default function CartHeader() {
  return (
    <div className={"mb-5"}>
      <SheetTitle className={"text-left text-lg font-medium text-gray-900"}>
        Shopping cart
      </SheetTitle>
    </div>
  )
}