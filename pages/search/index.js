import { useState, useEffect } from 'react';
import { client } from '../../shopify/client';
import ProductCard from '../../components/products/product-card';
import { QUERY_SEARCH } from '../../graphql/search';
import { QUERY_PRODUCTS } from '../../graphql/products';
import Spinner from '../../components/ui/Spinner';
import { useDebounce } from 'use-debounce';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  // Fetch products when search term changes
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        
        let data, errors;
        
        // If search term exists, use search query, otherwise fetch all products
        if (debouncedSearchTerm) {
          // Define search query variables
          const variables = {
            query: debouncedSearchTerm,
            productFilters: []
          };
          
          const { data: searchData, errors: searchErrors } = await client.request(QUERY_SEARCH, { variables })
          
          data = searchData;
          errors = searchErrors;
          
          // Check for GraphQL errors
          if (errors) {
            console.error('GraphQL errors:', errors);
            setError('Failed to search products');
            setLoading(false);
            return;
          }
          
          // Set products from search results
          setProducts(data.search.edges.map(edge => edge.node));
        } else {
          // Use regular products query if no search term
          const variables = {
            first: 24,
            sortKey: 'BEST_SELLING',
            reverse: true
          };
          
          const { data: productsData, errors: productsErrors } = await client.request(QUERY_PRODUCTS, { variables });
          
          data = productsData;
          errors = productsErrors;
          
          // Check for GraphQL errors
          if (errors) {
            console.error('GraphQL errors:', errors);
            setError('Failed to fetch products');
            setLoading(false);
            return;
          }
          
          // Set products state
          const productNodes = data.products.edges.map(edge => edge.node);
          setProducts(productNodes);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products');
        setLoading(false);
      }
    }

    fetchProducts();
  }, [debouncedSearchTerm]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen p-8 pb-20">
      <div className="max-w-7xl mx-auto mb-8 mt-12">
        
        <form onSubmit={handleSearchSubmit} className="mb-8">
          <div className="flex w-full max-w-md mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <button 
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              Search
            </button>
          </div>
        </form>
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-10">
            <div className="flex items-center justify-center">
              <Spinner size={8} className="mr-3 text-black" />
              <p>Loading products...</p>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="text-center py-10 text-red-500">{error}</div>
        )}
        
        {/* No Results */}
        {!loading && !error && products.length === 0 && (
          <div className="text-center py-10">
            <p className="text-lg">No products found</p>
            {debouncedSearchTerm && (
              <p className="text-gray-500 mt-2">
                Try a different search term or browse all products by clearing the search
              </p>
            )}
          </div>
        )}
        
        {/* Products Grid */}
        {!loading && !error && products.length > 0 && (
          <div>
            {debouncedSearchTerm && (
              <p className="mb-4 text-gray-500">
                Showing {products.length} result{products.length !== 1 ? 's' : ''} for "{debouncedSearchTerm}"
              </p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}