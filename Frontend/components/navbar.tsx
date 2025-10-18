"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav aria-label="Primary" className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="#" className="font-semibold text-lg text-foreground">
          DevOps Portfolio
        </Link>

        <div className="hidden gap-1 sm:flex">
          <NavLink href="#about" label="About" />
          <NavLink href="#skills" label="Skills" />
          <NavLink href="#experience" label="Experience" />
          <NavLink href="#projects" label="Projects" />
          <NavLink href="#contact" label="Contact" />
        </div>

        <div className="flex sm:hidden">
          <Button asChild variant="outline" size="sm">
            <a href="#contact">Contact</a>
          </Button>
        </div>
      </nav>
    </header>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Button asChild variant="ghost" size="sm" className="text-foreground">
      <a href={href}>{label}</a>
    </Button>
  )
}
