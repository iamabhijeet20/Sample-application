"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface SkillGroup {
  id?: number
  title: string
  items: string[]
}

export function Skills() {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        // Use relative path so nginx can proxy to backend
        const response = await fetch('/api/skills')
        
        if (!response.ok) {
          throw new Error('Failed to fetch skills from API')
        }
        
        const data = await response.json()
        
        if (!data.success) {
          throw new Error(data.error || 'Failed to load skills')
        }
        
        setSkillGroups(data.data || [])
      } catch (err) {
        console.error('Error fetching skills:', err)
        setError(err instanceof Error ? err.message : 'Failed to load skills')
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  if (loading) {
    return (
      <section id="skills" aria-labelledby="skills-heading" className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight">
            Skills & Tools
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Loading skills...
          </p>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="skills" aria-labelledby="skills-heading" className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight">
            Skills & Tools
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Technologies and platforms used day-to-day.
          </p>
          <div className="mt-8">
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error Loading Skills</AlertTitle>
              <AlertDescription>
                {error}. Please check if the API server and database are running.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    )
  }

  if (skillGroups.length === 0) {
    return (
      <section id="skills" aria-labelledby="skills-heading" className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight">
            Skills & Tools
          </h2>
          <p className="mt-2 text-muted-foreground leading-relaxed">
            Technologies and platforms used day-to-day.
          </p>
          <div className="mt-8">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>No Skills Found</AlertTitle>
              <AlertDescription>
                No skills are currently available in the database.
              </AlertDescription>
            </Alert>
          </div>
        </div>
      </section>
    )
  }
  return (
    <section id="skills" aria-labelledby="skills-heading" className="border-b">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 id="skills-heading" className="text-3xl font-semibold tracking-tight">
          Skills & Tools
        </h2>
        <p className="mt-2 text-muted-foreground leading-relaxed">
          A pragmatic toolkit focused on automation, reliability, and speed to production.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group) => (
            <Card key={group.title}>
              <CardHeader>
                <CardTitle className="text-lg">{group.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Badge key={item} variant="secondary" className="px-2 py-1">
                      {item}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
