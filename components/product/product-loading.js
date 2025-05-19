import Breadcrumbs from '../layout/breadcrumbs'
import Spinner from '../../components/ui/Spinner'

export default function ProductLoading() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-7xl mx-auto">
        <Breadcrumbs />
        <div className="text-center py-10">
          <Spinner size={8} className="text-black inline-block mb-4" />
          <p>Loading product...</p>
        </div>
      </div>
    </div>
  )
}