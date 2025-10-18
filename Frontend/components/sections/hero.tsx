"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollReveal } from "@/components/animation/scroll-reveal"

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="border-b bg-card">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="flex flex-col items-start gap-6">
          <ScrollReveal>
            <Badge variant="outline" className="rounded-full px-3 py-1">
              DevOps Engineer · ~2 years
            </Badge>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1
              id="hero-heading"
              className="text-balance text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl"
            >
              Build. Ship. Scale.
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={140}>
            <p className="text-pretty max-w-2xl text-muted-foreground leading-relaxed text-lg">
              I design CI/CD pipelines, codify infrastructure with Terraform, and operate Kubernetes on AWS.
              Reliability, observability, and speed to production—by default.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="#contact">Get in touch</a>
              </Button>
              <Button asChild variant="outline">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  Download Resume
                </a>
              </Button>
              <Button asChild variant="ghost">
                <Link href="#projects">View Projects</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
