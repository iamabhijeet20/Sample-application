"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export function Contact() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In production, use relative URL (proxied through Nginx)
      // In development, use direct backend URL
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || ''
      const response = await fetch(`${apiUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        toast({
          title: "Message sent! ✅",
          description: data.message || "Thank you for reaching out. We'll get back to you soon!",
        })
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        })
      } else {
        toast({
          title: "Failed to send message",
          description: data.message || "Please try again later.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Connection error",
        description: "Unable to reach the server. Please check your connection and try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }
  return (
    <section id="contact" aria-labelledby="contact-heading" className="border-t bg-background">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-20">
        <header>
          <h2 id="contact-heading" className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
            Let’s talk about your infrastructure.
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground leading-relaxed">
            Open to building reliable delivery pipelines, modernizing cloud infrastructure, and improving observability.
          </p>
        </header>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <Button asChild size="lg">
            <a href="mailto:your.email@example.com" aria-label="Email me">
              Email me
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://www.linkedin.com/in/your-handle"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my LinkedIn profile"
            >
              LinkedIn
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit my GitHub profile"
            >
              GitHub
            </a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" aria-label="Open my resume">
              Resume
            </a>
          </Button>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {/* Form Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Send a message</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div className="grid gap-2 sm:grid-cols-2">
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      autoComplete="name" 
                      placeholder="Your name" 
                      required 
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                  <div className="grid gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="subject">Subject</Label>
                  <Input 
                    id="subject" 
                    name="subject" 
                    placeholder="How can I help?" 
                    required 
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project or needs..."
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    disabled={loading}
                  />
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-muted-foreground">I usually respond within 24 hours.</p>
                  <Button type="submit" size="lg" disabled={loading}>
                    {loading ? 'Sending...' : 'Send'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Direct Contact (unchanged) */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Direct contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">Email</p>
                <a className="font-medium hover:underline" href="mailto:your.email@example.com">
                  your.email@example.com
                </a>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">LinkedIn</p>
                <a
                  className="font-medium hover:underline"
                  href="https://www.linkedin.com/in/your-handle"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  /your-handle
                </a>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">GitHub</p>
                <a
                  className="font-medium hover:underline"
                  href="https://github.com/your-username"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @your-username
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Availability moved to full width row */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle className="text-lg">Availability</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="text-sm text-muted-foreground">Engagements</p>
                <p className="mt-1 font-medium">Full-time or Contract</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Response time</p>
                <p className="mt-1 font-medium">Within 24 hours</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Location / TZ</p>
                <p className="mt-1 font-medium">Your City • UTC±X</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Preferred stack</p>
                <p className="mt-1 font-medium">AWS • Docker • Kubernetes • Terraform • CI/CD</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
