export default function ProductSubscriptionOptions({ 
  sellingPlanGroups, 
  selectedSellingPlan, 
  setSelectedSellingPlan 
}) {
  // Skip rendering if there are no selling plan groups (subscriptions)
  if (!sellingPlanGroups || sellingPlanGroups.edges.length === 0) {
    return null
  }

  const handleSellingPlanChange = (e) => {
    const value = e.target.value
    setSelectedSellingPlan(value === 'one-time' ? null : value)
  }

  return (
    <div className="mt-6 space-y-2">
      <div className="font-medium">Purchase options</div>
      <div className="space-y-3">
        <div className="flex items-center">
          <input
            id="one-time-purchase"
            name="purchase-option"
            type="radio"
            className="h-4 w-4 border-gray-300 text-black focus:ring-black"
            checked={!selectedSellingPlan}
            value="one-time"
            onChange={handleSellingPlanChange}
          />
          <label htmlFor="one-time-purchase" className="ml-3 text-sm">
            One-time purchase
          </label>
        </div>

        {sellingPlanGroups.edges.map(({ node: group }) => (
          <div key={group.name} className="space-y-3">
            {group.sellingPlans.edges.map(({ node: plan }) => {
              // Extract price adjustment percentage if available
              let priceAdjustment = null
              if (plan.priceAdjustments && plan.priceAdjustments.length > 0) {
                const adjustment = plan.priceAdjustments[0].adjustmentValue
                if (adjustment.adjustmentPercentage) {
                  priceAdjustment = `Save ${adjustment.adjustmentPercentage}%`
                }
              }

              return (
                <div key={plan.id} className="flex items-center">
                  <input
                    id={plan.id}
                    name="purchase-option"
                    type="radio"
                    className="h-4 w-4 border-gray-300 text-black focus:ring-black"
                    checked={selectedSellingPlan === plan.id}
                    value={plan.id}
                    onChange={handleSellingPlanChange}
                  />
                  <label htmlFor={plan.id} className="ml-3 text-sm flex flex-col">
                    <span>{plan.name}</span>
                    {priceAdjustment && (
                      <span className="text-green-600 text-xs">{priceAdjustment}</span>
                    )}
                    {plan.description && (
                      <span className="text-gray-500 text-xs">{plan.description}</span>
                    )}
                  </label>
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}