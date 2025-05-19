import { createContext, useContext, useState, useEffect } from 'react';
import { client } from '../shopify/client';
import { 
  CART_CREATE, 
  CART_LINES_ADD, 
  CART_LINES_UPDATE, 
  CART_LINES_REMOVE,
  QUERY_CART
} from '../graphql/cart';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // On initial load, check for cart in localStorage
  useEffect(() => {
    const initializeCart = async () => {
      const cartId = localStorage.getItem('cartId');
      if (cartId) {
        try {
          const { data } = await client.request(QUERY_CART, {
            variables: { id: cartId },
          });
          if (data?.cart) {
            setCart(data.cart);
          } else {
            // Cart not found or expired, create a new one
            createCart();
          }
        } catch (error) {
          console.error("Error fetching cart:", error);
          createCart();
        }
      } else {
        createCart();
      }
    };

    initializeCart();
  }, []);

  // Create a new cart
  const createCart = async () => {
    try {
      setIsLoading(true);
      const { data } = await client.request(CART_CREATE, {
        variables: { input: {} },
      });
      
      if (data?.cartCreate?.cart) {
        const newCart = data.cartCreate.cart;
        setCart(newCart);
        localStorage.setItem('cartId', newCart.id);
      }
    } catch (error) {
      console.error("Error creating cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add an item to the cart
  const addToCart = async (variantId, quantity = 1, sellingPlanId = null) => {
    if (!cart?.id) {
      await createCart();
    }

    try {
      setIsLoading(true);
      
      // Create line item with or without selling plan
      const lineItem = {
        merchandiseId: variantId,
        quantity,
      };
      
      // Add selling plan if it exists
      if (sellingPlanId) {
        lineItem.sellingPlanId = sellingPlanId;
      }
      
      const { data } = await client.request(CART_LINES_ADD, {
        variables: {
          cartId: cart.id,
          lines: [lineItem],
        },
      });

      if (data?.cartLinesAdd?.cart) {
        setCart(data.cartLinesAdd.cart);
        setIsCartOpen(true);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update an item in the cart
  const updateCartItem = async (lineId, quantity) => {
    try {
      setIsLoading(true);
      const { data } = await client.request(CART_LINES_UPDATE, {
        variables: {
          cartId: cart.id,
          lines: [
            {
              id: lineId,
              quantity,
            },
          ],
        },
      });

      if (data?.cartLinesUpdate?.cart) {
        setCart(data.cartLinesUpdate.cart);
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Remove an item from the cart
  const removeCartItem = async (lineId) => {
    try {
      setIsLoading(true);
      const { data } = await client.request(CART_LINES_REMOVE, {
        variables: {
          cartId: cart.id,
          lineIds: [lineId],
        },
      });

      if (data?.cartLinesRemove?.cart) {
        setCart(data.cartLinesRemove.cart);
      }
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Open the cart drawer
  const openCart = () => {
    setIsCartOpen(true);
  };

  // Close the cart drawer
  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Calculate total items in cart
  const cartItemCount = cart?.lines?.edges?.reduce(
    (total, { node }) => total + node.quantity, 
    0
  ) || 0;

  const value = {
    cart,
    isCartOpen,
    isLoading,
    cartItemCount,
    addToCart,
    updateCartItem,
    removeCartItem,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}