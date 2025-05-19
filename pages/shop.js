import { useRouter } from 'next/router';
import Layout from '../components/layout/layout';
import ShoppingComponent from '../components/shopping/shopping-component';

export default function ShopPage() {
  const router = useRouter();
  const { query } = router;
  
  // Parse query parameters for initial filters
  const initialFilters = [];
  
  if (query.min_price || query.max_price) {
    initialFilters.push({
      price: {
        min: query.min_price ? parseFloat(query.min_price) : null,
        max: query.max_price ? parseFloat(query.max_price) : null
      }
    });
  }
  
  if (query.collection) {
    const collections = Array.isArray(query.collection) 
      ? query.collection 
      : [query.collection];
    
    initialFilters.push({ productType: collections });
  }
  
  // Determine initial sort
  const initialSortKey = query.sort || 'BEST_SELLING';
  const initialReverse = query.direction === 'desc';
  
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <ShoppingComponent 
          title="Shop All Products"
          initialSortKey={initialSortKey}
          initialFilters={initialFilters}
          productLimit={16}
          showFilters={true}
          showSorting={true}
        />
      </div>
    </div>
  );
}