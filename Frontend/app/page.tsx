import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/sections/hero"
import { Skills } from "@/components/sections/skills"
import { Experience } from "@/components/sections/experience"
import { Projects } from "@/components/sections/projects"
import { Contact } from "@/components/sections/contact"
import { Footer } from "@/components/footer"
import { Showcase } from "@/components/sections/showcase"

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Showcase /> {/* new sticky scroll section */}
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}
