"use client"

import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export function PageWrapper({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.36, ease: [0.4, 0, 0.2, 1] }}
      className={cn("flex-1", className)}
    >
      {children}
    </motion.main>
  )
}
