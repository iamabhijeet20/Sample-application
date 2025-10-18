"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type Props = {
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "main"
  className?: string
  children: React.ReactNode
  delay?: number
}

export function ScrollReveal({ as = "div", className, children, delay = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry.isIntersecting) {
          // small timeout to stagger elements
          const id = window.setTimeout(() => setVisible(true), delay)
          return () => window.clearTimeout(id)
        }
      },
      { threshold: 0.2 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  const Component = as

  return (
    <Component
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out will-change-transform",
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-[0.995]",
        className,
      )}
    >
      {children}
    </Component>
  )
}
