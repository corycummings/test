import CartItem from './cart-item'
import { cn } from '../../lib/utils'

export default function CartItemList({ cart, updateCartItem, removeCartItem }) {
  return (
    <div className={"mt-8"}>
      <div className={"flow-root"}>
        <ul className={"-my-6 divide-y divide-gray-200"}>
          {cart.lines.edges.map((item) => (
            <CartItem 
              key={item.node.id} 
              item={item} 
              updateCartItem={updateCartItem}
              removeCartItem={removeCartItem}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}