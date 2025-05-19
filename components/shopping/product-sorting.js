import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export default function ProductSorting({ sortKey, reverse, onSortChange }) {
  const sortOptions = [
    { label: 'Featured', key: 'MANUAL', reverse: false },
    { label: 'Best Selling', key: 'BEST_SELLING', reverse: false },
    { label: 'Price: Low to High', key: 'PRICE', reverse: false },
    { label: 'Price: High to Low', key: 'PRICE', reverse: true },
    { label: 'Newest', key: 'CREATED', reverse: true },
    { label: 'Alphabetically: A-Z', key: 'TITLE', reverse: false },
    { label: 'Alphabetically: Z-A', key: 'TITLE', reverse: true },
  ];

  // Find the current sort option for display
  const currentSort = sortOptions.find(
    option => option.key === sortKey && option.reverse === reverse
  ) || sortOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <span>Sort by: </span>
          <span className="font-medium">{currentSort.label}</span>
          <i className="ri-arrow-down-s-line"></i>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={`${option.key}-${option.reverse}`}
            className={`cursor-pointer ${currentSort.label === option.label ? 'bg-gray-100' : ''}`}
            onClick={() => onSortChange(option.key, option.reverse)}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}