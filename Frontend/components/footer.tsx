export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">About</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              DevOps engineer focused on reliable delivery, automated infrastructure, and practical observability.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">Links</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className="text-sm hover:underline" href="#about">
                    About
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:underline" href="#skills">
                    Skills
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:underline" href="#experience">
                    Experience
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:underline" href="#projects">
                    Projects
                  </a>
                </li>
                <li>
                  <a className="text-sm hover:underline" href="#contact">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-muted-foreground">Connect</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <a className="text-sm hover:underline" href="mailto:your.email@example.com" aria-label="Email">
                    Email
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm hover:underline"
                    href="https://www.linkedin.com/in/your-handle"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm hover:underline"
                    href="https://github.com/your-username"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} DevOps Portfolio.</p>
            <p className="text-sm text-muted-foreground">Built with Next.js & shadcn/ui.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
