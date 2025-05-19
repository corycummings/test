import { cn } from '../../lib/utils'

export default function ProductOptions({ options, selectedOptions, handleOptionChange }) {
  // Skip rendering if there are no options or only the default option
  if (!options || options.length === 0) {
    return null
  }

  // Color mapping object (can be expanded as needed)
  const colorMap = {
    'black': '#000000',
    'white': '#FFFFFF',
    'red': '#FF0000',
    'blue': '#000000', // Changed from #0000FF to #000000
    'green': '#008000',
    'yellow': '#FFFF00',
    'purple': '#800080',
    'pink': '#FFC0CB',
    'orange': '#FFA500',
    'gray': '#808080',
    'grey': '#808080',
    'brown': '#A52A2A',
    'navy': '#000080',
    'teal': '#008080',
    'cyan': '#00FFFF'
  }

  return (
    <div className="space-y-6 mt-6">
      {options.map((option) => {
        // Skip options with just "Default Title" as the only value
        if (option.values.length === 1 && option.values[0] === "Default Title") {
          return null
        }
        
        return (
          <div key={option.id} className="space-y-2">
            <div className="font-medium">{option.name}</div>
            
            {option.name.toLowerCase() === 'color' ? (
              // Color selector
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const colorValue = colorMap[value.toLowerCase()] || '#CCCCCC'
                  const isSelected = selectedOptions[option.name] === value
                  
                  return (
                    <button
                      key={value}
                      className={cn(
                        'w-8 h-8 rounded-full flex items-center justify-center border-2 p-0.5',
                        isSelected ? 'border-black' : 'border-gray-300'
                      )}
                      onClick={() => handleOptionChange(option.name, value)}
                      title={value}
                      aria-label={`${option.name}: ${value}`}
                    >
                      <span 
                        className="w-full h-full rounded-full" 
                        style={{ backgroundColor: colorValue }}
                      />
                    </button>
                  )
                })}
              </div>
            ) : (
              // Regular option selector
              <div className="flex flex-wrap gap-2">
                {option.values.map((value) => {
                  const isSelected = selectedOptions[option.name] === value
                  
                  return (
                    <button
                      key={value}
                      className={cn(
                        'px-3 py-1.5 border rounded',
                        isSelected
                          ? 'bg-gray-200 border-black text-black'
                          : 'border-gray-300 hover:border-gray-400'
                      )}
                      onClick={() => handleOptionChange(option.name, value)}
                    >
                      {value}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}