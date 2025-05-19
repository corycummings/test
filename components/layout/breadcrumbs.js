import Link from 'next/link'

export default function Breadcrumbs({ product }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex items-center space-x-2 text-sm">
        <li>
          <Link href="/" className="text-black hover:text-gray-700">
            Home
          </Link>
        </li>
        {product && (
          <>
            <li className="text-gray-500">/</li>
            <li className="text-gray-700 truncate max-w-[200px]" aria-current="page">
              {product.title}
            </li>
          </>
        )}
      </ol>
    </nav>
  )
}