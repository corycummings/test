import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { client } from '../../shopify/client';
import { QUERY_COLLECTIONS } from '../../graphql/collections';

export default function ProductFilters({ filters = [], onFilterChange }) {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCollections();
    
    // Initialize from existing filters
    const existingPriceFilter = filters.find(f => f.price);
    if (existingPriceFilter) {
      const { min, max } = existingPriceFilter.price;
      setPriceRange({ min: min || '', max: max || '' });
    }
    
    const existingCollectionFilter = filters.find(f => f.productType);
    if (existingCollectionFilter) {
      setSelectedCollections(existingCollectionFilter.productType);
    }
  }, []);

  const fetchCollections = async () => {
    try {
      setLoading(true);
      const { data } = await client.request(QUERY_COLLECTIONS, {
        variables: { first: 20 }
      });
      
      if (data?.collections?.edges) {
        setCollections(data.collections.edges.map(edge => edge.node));
      }
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    // Only allow numeric input
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setPriceRange(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCollectionToggle = (handle) => {
    setSelectedCollections(prev => {
      if (prev.includes(handle)) {
        return prev.filter(h => h !== handle);
      } else {
        return [...prev, handle];
      }
    });
  };

  const applyFilters = () => {
    const newFilters = [];
    
    // Add price filter if values are set
    if (priceRange.min || priceRange.max) {
      newFilters.push({
        price: {
          min: priceRange.min ? parseFloat(priceRange.min) : null,
          max: priceRange.max ? parseFloat(priceRange.max) : null
        }
      });
    }
    
    // Add collection filter if collections are selected
    if (selectedCollections.length > 0) {
      newFilters.push({ productType: selectedCollections });
    }
    
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    setPriceRange({ min: '', max: '' });
    setSelectedCollections([]);
    onFilterChange([]);
  };

  return (
    <div className="border rounded-lg p-4 sticky top-24">
      <h2 className="font-medium text-lg mb-4">Filters</h2>
      
      <Accordion type="multiple" defaultValue={['price', 'collections']} className="space-y-4">
        <AccordionItem value="price">
          <AccordionTrigger className="text-sm font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2 space-y-4">
              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  name="min"
                  value={priceRange.min}
                  onChange={handlePriceChange}
                  placeholder="Min"
                  className="w-full"
                />
                <span className="text-gray-500">to</span>
                <Input
                  type="text"
                  name="max"
                  value={priceRange.max}
                  onChange={handlePriceChange}
                  placeholder="Max"
                  className="w-full"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="collections">
          <AccordionTrigger className="text-sm font-medium">Collections</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto pr-2">
              {loading ? (
                <div className="text-sm text-gray-500">Loading collections...</div>
              ) : collections.length > 0 ? (
                collections.map(collection => (
                  <div key={collection.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={collection.handle}
                      checked={selectedCollections.includes(collection.handle)}
                      onCheckedChange={() => handleCollectionToggle(collection.handle)}
                    />
                    <Label 
                      htmlFor={collection.handle}
                      className="text-sm cursor-pointer"
                    >
                      {collection.title}
                    </Label>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No collections found</div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <div className="mt-6 flex flex-col gap-2">
        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
        <Button 
          variant="outline" 
          onClick={clearFilters} 
          className="w-full mt-2"
        >
          Clear All
        </Button>
      </div>
    </div>
  );
}