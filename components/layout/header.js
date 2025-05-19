import { useCart } from '../../context/cart-context'
import { useAuth } from '../../hooks/use-auth'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { cn } from '../../lib/utils'
import { Button } from '../ui/button'
import AuthModal from '../auth/auth-modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'

export default function Header() {
  const { openCart, cartItemCount } = useCart()
  const { openAuthModal, isAuthenticated, customer, logout } = useAuth()
  const router = useRouter()

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-8 xl:px-0">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Logo
            </Link>
          </div>


          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/search')}
              aria-label="Search"
            >
              <i className="ri-search-line text-gray-400 group-hover:text-gray-500 text-xl"></i>
            </Button>

            {/* User button */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="User menu"
                  >
                    <i className="ri-user-line text-gray-400 group-hover:text-gray-500 text-xl"></i>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <div className="truncate text-sm">
                      {customer?.firstName} {customer?.lastName}
                    </div>
                    <div className="truncate text-xs text-muted-foreground">
                      {customer?.email}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <i className="ri-logout-box-line mr-2"></i>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                variant="ghost"
                size="icon"
                onClick={openAuthModal}
                aria-label="Login"
                title="Login / Sign up"
              >
                <i className="ri-user-line text-gray-400 group-hover:text-gray-500 text-xl"></i>
              </Button>
            )}

            {/* Cart button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={openCart}
              aria-label="Cart"
              className="relative"
            >
              <i className="ri-shopping-bag-2-line text-gray-400 group-hover:text-gray-500 text-xl"></i>
              {cartItemCount > 0 && (
                <span className={"absolute top-0 right-0 bg-black text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"}>
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Auth Modal */}
      <AuthModal />
    </header>
  )
}