import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { client } from '../../shopify/client';
import { QUERY_COLLECTION_BY_HANDLE } from '../../graphql/collections';
import { CollectionDetails } from '../../components/collection';

export default function CollectionPage() {
  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { handle } = router.query;

  useEffect(() => {
    // Don't fetch until we have the handle from the router
    if (!handle) return;

    async function fetchCollection() {
      try {
        setLoading(true);
        
        // Request collection from Shopify using the existing query from graphql/collections.js
        const { data, errors } = await client.request(QUERY_COLLECTION_BY_HANDLE, {
          variables: {
            handle: handle,
            first: 24,
            sortKey: 'BEST_SELLING',
            reverse: false
          },
        });

        // Check for GraphQL errors
        if (errors) {
          console.error('GraphQL errors:', errors);
          setError('Failed to fetch collection due to GraphQL errors');
          setLoading(false);
          return;
        }

        // Handle collection not found
        if (!data.collectionByHandle) {
          setError('Collection not found');
          setLoading(false);
          return;
        }

        setCollection(data.collectionByHandle);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching collection:', err);
        setError('Failed to fetch collection');
        setLoading(false);
      }
    }

    fetchCollection();
  }, [handle]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium">Loading collection...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium text-red-500">{error}</div>
      </div>
    );
  }

  // No collection state
  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl font-medium text-red-500">Collection not found</div>
      </div>
    );
  }

  return <CollectionDetails collection={collection} />;
}