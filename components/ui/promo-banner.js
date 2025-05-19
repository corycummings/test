import * as React from "react"
import { cn } from "../../lib/utils"

const PromoBanner = React.forwardRef(({ className, text, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "h-[50px] bg-primary text-white w-full flex items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="text-center font-medium text-sm">
        {text}
      </div>
    </div>
  )
})

PromoBanner.displayName = "PromoBanner"

export { PromoBanner }