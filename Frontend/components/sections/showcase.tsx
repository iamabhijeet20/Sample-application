"use client"

import type React from "react"

import { useEffect, useMemo, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { Code, Server, LineChart } from "lucide-react"

type Panel = {
  title: string
  kicker: string
  body: string
  icon: React.ElementType
}

const PANELS: Panel[] = [
  {
    title: "CI/CD, refined.",
    kicker: "Automation",
    body: "Caching that just works. Matrix builds. Preview environments. Security scanning in the loop. Fast feedback, fewer surprises.",
    icon: Code,
  },
  {
    title: "Cloud you can trust.",
    kicker: "Infrastructure",
    body: "AWS VPC + EKS via Terraform. Immutable infrastructure, least-privilege IAM, and clear module boundaries for every environment.",
    icon: Server,
  },
  {
    title: "See everything.",
    kicker: "Observability",
    body: "Prometheus, Grafana, and Loki—actionable dashboards, noise-free alerting, and traces that help you fix issues before they matter.",
    icon: LineChart,
  },
]

export function Showcase() {
  const [active, setActive] = useState(0)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const sentinels = useMemo(
    () => Array.from({ length: PANELS.length }, () => ({ ref: { current: null as null | HTMLDivElement } })),
    [],
  )

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setActive(0)
      return
    }

    const observers: IntersectionObserver[] = []
    sentinels.forEach((s, idx) => {
      const el = s.ref.current
      if (!el) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActive(idx)
          })
        },
        { root: null, threshold: 0.6 },
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [sentinels])

  return (
    <section aria-labelledby="showcase-heading" className="relative border-b">
      <div ref={containerRef} className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="py-16 sm:py-24">
          <h2 id="showcase-heading" className="text-3xl font-semibold tracking-tight">
            A system that scales with you
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed max-w-2xl">
            Apple-like clarity and focus. Fewer distractions, more momentum.
          </p>
        </div>

        {/* Sticky viewport */}
        <div className="relative">
          <div className="sticky top-16 z-10 -mx-4 sm:-mx-6 border-y bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
              {PANELS.map((panel, i) => {
                const Icon = panel.icon
                const isActive = i === active
                return (
                  <div
                    key={panel.title}
                    className={cn(
                      "absolute inset-0 transition-all duration-700 ease-out",
                      "opacity-0 translate-y-6 scale-[0.98]",
                      isActive && "opacity-100 translate-y-0 scale-100",
                    )}
                    aria-hidden={!isActive}
                  >
                    <div className="flex flex-col gap-6">
                      <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon className="h-4 w-4 text-primary" aria-hidden />
                        <span>{panel.kicker}</span>
                      </div>
                      <h3 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                        {panel.title}
                      </h3>
                      <p className="text-pretty max-w-3xl text-muted-foreground leading-relaxed text-lg">
                        {panel.body}
                      </p>
                    </div>
                  </div>
                )
              })}
              {/* Fallback for reduced-motion: show first panel statically */}
              <div className="sr-only" aria-live="polite">
                {PANELS[active]?.title}
              </div>
              {/* Spacer to ensure height in case of absolute stacking */}
              <div className="invisible h-0">.</div>
            </div>
          </div>

          {/* Scroll zones (one per panel) */}
          <div className="relative">
            {PANELS.map((_, i) => (
              <div
                key={i}
                ref={(el) => {
                  sentinels[i].ref.current = el
                }}
                className="h-[85vh] sm:h-[100vh]"
                aria-hidden
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
