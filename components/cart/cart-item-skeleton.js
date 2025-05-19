import { Skeleton } from '../ui/skeleton'

export default function CartItemSkeleton() {
  return (
    <li className="py-6 flex items-start">
      <Skeleton className="flex-shrink-0 w-24 h-24 rounded-md" />
      <div className="ml-4 flex-1 flex flex-col justify-start items-start">
        <div className="w-full">
          <div className="flex justify-start">
            <Skeleton className="h-4 w-40 mb-2 rounded-sm" />
          </div>
          <Skeleton className="h-4 w-24 mt-1 rounded-sm" />
        </div>
      </div>
    </li>
  )
}