import Spinner from '../../components/ui/Spinner'
import { Button } from '../../components/ui/button'

export default function AddToCartButton({ selectedVariant, selectedSellingPlan, isLoading, addToCart }) {
  const handleAddToCart = () => {
    if (selectedVariant) {
      addToCart(selectedVariant.id, 1, selectedSellingPlan)
    }
  }

  return (
    <Button 
      className="w-full mt-8 cursor-pointer" 
      size="lg"
      onClick={handleAddToCart}
      disabled={isLoading || !selectedVariant}
    >
      {isLoading ? (
        <>
          <Spinner size={5} />
          Adding...
        </>
      ) : (
        'Add to Cart'
      )}
    </Button>
  )
}