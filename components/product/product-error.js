import Breadcrumbs from '../layout/breadcrumbs'

export default function ProductError({ error }) {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
        <div className="text-center py-10 text-red-500">{error}</div>
      </div>
    </div>
  )
}