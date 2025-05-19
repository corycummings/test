import { useState, useEffect } from 'react';
import { client } from '../../shopify/client';
import { QUERY_PRODUCTS } from '../../graphql/products';
import ProductGrid from '../products/products-grid';
import ProductFilters from './product-filters';
import ProductSorting from './product-sorting';
import ShoppingComponentSkeleton from './shopping-component-skeleton';
import { BlurFade } from '../magicui/blur-fade';

export default function ShoppingComponent({ 
  title = 'Shop All Products',
  initialSortKey = 'BEST_SELLING',
  initialFilters = [],
  productLimit = 12,
  showFilters = true,
  showSorting = true,
  className = ''
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [reverse, setReverse] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [endCursor, setEndCursor] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [sortKey, reverse, filters]);

  const fetchProducts = async (cursor = null) => {
    try {
      setLoading(true);
      
      const variables = {
        first: productLimit,
        sortKey: sortKey,
        reverse: reverse,
        filters: filters,
        after: cursor
      };
      
      const { data, errors } = await client.request(QUERY_PRODUCTS, { variables });
      
      if (errors) {
        console.error('GraphQL errors:', errors);
        setError('Failed to fetch products');
        setLoading(false);
        return;
      }
      
      if (!data.products) {
        setError('No product data returned');
        setLoading(false);
        return;
      }
      
      // Transform product edges to array of products
      const productNodes = data.products.edges.map(edge => edge.node);
      
      if (cursor) {
        // If loading more, append to existing products
        setProducts(prevProducts => [...prevProducts, ...productNodes]);
      } else {
        // If initial load or filter/sort changed, replace products
        setProducts(productNodes);
      }
      
      // Update pagination info
      setHasNextPage(data.products.pageInfo.hasNextPage);
      setEndCursor(data.products.pageInfo.endCursor);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleSortChange = (newSortKey, newReverse = false) => {
    setSortKey(newSortKey);
    setReverse(newReverse);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const loadMore = () => {
    if (hasNextPage && endCursor) {
      fetchProducts(endCursor);
    }
  };

  if (error) {
    return (
      <div className="my-8 p-4 text-center text-red-500">
        <p>{error}</p>
        <button 
          onClick={() => fetchProducts()}
          className="mt-4 px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      <BlurFade delay={0.1} inView>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          
          {showSorting && (
            <ProductSorting 
              sortKey={sortKey} 
              reverse={reverse} 
              onSortChange={handleSortChange} 
            />
          )}
        </div>
      </BlurFade>

      <div className="flex flex-col md:flex-row gap-8">
        {showFilters && (
          <BlurFade delay={0.2} inView className="w-full md:w-64 flex-shrink-0">
            <ProductFilters 
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </BlurFade>
        )}
        
        <div className="flex-1">
          {loading && products.length === 0 ? (
            <ShoppingComponentSkeleton />
          ) : (
            <>
              <BlurFade delay={0.3} inView>
                <ProductGrid products={products} />
              </BlurFade>
              
              {hasNextPage && (
                <div className="mt-8 text-center">
                  <button
                    onClick={loadMore}
                    disabled={loading}
                    className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                  </button>
                </div>
              )}
              
              {!loading && products.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No products found. Try adjusting your filters.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}