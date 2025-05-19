import { Skeleton } from '../ui/skeleton';

export default function ShoppingComponentSkeleton() {
  // Create an array of 8 items to show a grid of skeletons
  const skeletonItems = Array.from({ length: 8 }, (_, i) => i);
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {skeletonItems.map((item) => (
        <div key={item} className="border rounded-lg overflow-hidden">
          <Skeleton className="h-64 w-full" />
          <div className="p-4">
            <Skeleton className="h-6 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
}