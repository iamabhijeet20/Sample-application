"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface Project {
  id?: number
  name: string
  description: string
  tags: string[]
  github_url?: string
  demo_url?: string
}

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Use relative path so nginx can proxy to backend
        const response = await fetch('/api/projects')
        
        if (!response.ok) {
          throw new Error('Failed to fetch projects from API')
        }
        
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to load projects')
        }
        
        setProjects(data.data || [])
      } catch (err) {
        console.error('Error fetching projects:', err)
        setError(err instanceof Error ? err.message : 'Failed to load projects')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  if (loading) {
    return (
      <section id="projects" aria-labelledby="projects-heading" className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="projects-heading" className="text-3xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Loading projects...
          </p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="projects" aria-labelledby="projects-heading" className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="projects-heading" className="text-3xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Selected work demonstrating automation, infrastructure as code, and operational insight.
          </p>
          <div className="mt-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Projects</AlertTitle>
              <AlertDescription>
                {error}. Please check if the API server and database are running.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    )
  }

  if (projects.length === 0) {
    return (
      <section id="projects" aria-labelledby="projects-heading" className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="projects-heading" className="text-3xl font-semibold tracking-tight">
            Projects
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Selected work demonstrating automation, infrastructure as code, and operational insight.
          </p>
          <div className="mt-8">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Projects Found</AlertTitle>
              <AlertDescription>
                No projects are currently available in the database.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" aria-labelledby="projects-heading" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 id="projects-heading" className="text-3xl font-semibold tracking-tight">
          Projects
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Selected work demonstrating automation, infrastructure as code, and operational insight.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.id || p.name} className="flex flex-col">
              <CardHeader>
                <CardTitle className="text-lg">{p.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-muted-foreground leading-relaxed">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Badge key={t} variant="secondary" className="px-2 py-1">
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              {p.github_url && (
                <CardFooter>
                  <Button asChild size="sm">
                    <a href={p.github_url} target="_blank" rel="noopener noreferrer" aria-label={`Open ${p.name} on GitHub`}>
                      View Repo
                    </a>
                  </Button>
                </CardFooter>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
