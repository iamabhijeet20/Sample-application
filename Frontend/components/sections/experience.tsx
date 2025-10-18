"use client"

import { Briefcase, AlertCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useEffect, useState } from "react"

interface Role {
  id?: number
  company: string
  title: string
  period: string
  bullets: string[]
}

export function Experience() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        // Use relative path so nginx can proxy to backend
        const response = await fetch('/api/experiences')
        
        if (!response.ok) {
          throw new Error('Failed to fetch experiences from API')
        }
        
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to load experiences')
        }
        
        setRoles(data.data || [])
      } catch (err) {
        console.error('Error fetching experiences:', err)
        setError(err instanceof Error ? err.message : 'Failed to load experiences')
      } finally {
        setLoading(false)
      }
    }

    fetchExperiences()
  }, [])

  if (loading) {
    return (
      <section id="experience" aria-labelledby="experience-heading" className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex items-center gap-3">
            <Briefcase aria-hidden className="h-5 w-5 text-primary" />
            <h2 id="experience-heading" className="text-3xl font-semibold tracking-tight">
              Experience
            </h2>
          </div>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Loading experiences...
          </p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="experience" aria-labelledby="experience-heading" className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex items-center gap-3">
            <Briefcase aria-hidden className="h-5 w-5 text-primary" />
            <h2 id="experience-heading" className="text-3xl font-semibold tracking-tight">
              Experience
            </h2>
          </div>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Hands-on with CI/CD, Terraform, containers, and Kubernetes in production environments.
          </p>
          <div className="mt-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Experience</AlertTitle>
              <AlertDescription>
                {error}. Please check if the API server and database are running.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    )
  }

  if (roles.length === 0) {
    return (
      <section id="experience" aria-labelledby="experience-heading" className="border-b bg-card">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <div className="flex items-center gap-3">
            <Briefcase aria-hidden className="h-5 w-5 text-primary" />
            <h2 id="experience-heading" className="text-3xl font-semibold tracking-tight">
              Experience
            </h2>
          </div>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Hands-on with CI/CD, Terraform, containers, and Kubernetes in production environments.
          </p>
          <div className="mt-8">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Experience Found</AlertTitle>
              <AlertDescription>
                No experience entries are currently available in the database.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="experience" aria-labelledby="experience-heading" className="border-b bg-card">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="flex items-center gap-3">
          <Briefcase aria-hidden className="h-5 w-5 text-primary" />
          <h2 id="experience-heading" className="text-3xl font-semibold tracking-tight">
            Experience
          </h2>
        </div>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          Hands-on with CI/CD, Terraform, containers, and Kubernetes in production environments.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {roles.map((role) => (
            <Card key={role.company}>
              <CardHeader>
                <CardTitle className="text-lg">
                  {role.title} · {role.company}
                </CardTitle>
                <p className="text-sm text-muted-foreground">{role.period}</p>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 leading-relaxed">
                  {role.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
