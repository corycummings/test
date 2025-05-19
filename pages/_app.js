import { CartProvider } from '../context/cart-context'
import { AuthProvider } from '../context/auth-context'
import Layout from '../components/layout/layout'
import Cart from '../components/cart/cart'
import { Toaster } from '../components/ui/sonner'
import 'react-medium-image-zoom/dist/styles.css'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Cart />
          <Component {...pageProps} />
          <Toaster />
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}