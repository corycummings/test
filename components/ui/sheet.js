"use client"

import * as React from "react"
import * as SheetPrimitive from "@radix-ui/react-dialog"
import { X } from "lucide-react"
import { cva } from "class-variance-authority"
import { motion, AnimatePresence } from "framer-motion"

import { cn } from "../../lib/utils"

// Enhance Sheet with AnimatePresence for proper exit animations
const Sheet = React.forwardRef(({ children, ...props }, ref) => (
  <SheetPrimitive.Root {...props}>
    <AnimatePresence mode="wait">
      {props.open && children}
    </AnimatePresence>
  </SheetPrimitive.Root>
))
Sheet.displayName = SheetPrimitive.Root.displayName

const SheetTrigger = SheetPrimitive.Trigger

const SheetClose = SheetPrimitive.Close

const SheetPortal = SheetPrimitive.Portal

// Animated overlay with framer-motion
const SheetOverlay = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay asChild>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "fixed inset-0 z-50 bg-black/80",
        className,
      )}
      {...props}
      ref={ref}
    />
  </SheetPrimitive.Overlay>
))
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName

// Animation variants for the sheet content
const slideInVariants = {
  rightHidden: { x: "100%" },
  rightVisible: { x: 0 },
  rightExit: { x: "100%" },
  leftHidden: { x: "-100%" },
  leftVisible: { x: 0 },
  leftExit: { x: "-100%" },
  topHidden: { y: "-100%" },
  topVisible: { y: 0 },
  topExit: { y: "-100%" },
  bottomHidden: { y: "100%" },
  bottomVisible: { y: 0 },
  bottomExit: { y: "100%" },
}

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b",
        bottom: "inset-x-0 bottom-0 border-t",
        left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
        right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  },
)

// Enhanced SheetContent with framer-motion
const SheetContent = React.forwardRef(({ side = "right", className, children, ...props }, ref) => {
  // Determine which animation variants to use based on side
  const variants = {
    hidden: slideInVariants[`${side}Hidden`],
    visible: slideInVariants[`${side}Visible`],
    exit: slideInVariants[`${side}Exit`],
  }

  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content asChild ref={ref} {...props}>
        <motion.div
          className={cn(sheetVariants({ side }), className)}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            duration: 0.3
          }}
        >
          <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
          {children}
        </motion.div>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
})
SheetContent.displayName = SheetPrimitive.Content.displayName

const SheetHeader = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className,
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className,
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold text-foreground", className)}
    {...props}
  />
))
SheetTitle.displayName = SheetPrimitive.Title.displayName

const SheetDescription = React.forwardRef(({ className, ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
SheetDescription.displayName = SheetPrimitive.Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
