import Header from './header'
import Footer from './footer'
import { Toaster } from '../ui/sonner'
import { hasShopifyCredentials } from '../../shopify/client'
import ShopifyRequired from './shopify-required'

export default function Layout({ children }) {

  const shopifyConfigured = hasShopifyCredentials()

  if(!shopifyConfigured){ 
    return(
      <ShopifyRequired />
    )
  }

  return (
    <div className={"min-h-screen flex flex-col"}>
      <Header />
      <div className={"flex-grow"}>
        {children}
      </div>
      <Footer />
      <Toaster />
    </div>
  )
}