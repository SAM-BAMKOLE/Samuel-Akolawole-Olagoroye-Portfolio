import About from "@/components/site/home/about"
import Contact from "@/components/site/home/contact"
import CurrentlyExploring from "@/components/site/home/currentlyExploring"
import Education from "@/components/site/home/education"
import Experience from "@/components/site/home/experience"
import Hero from "@/components/site/home/hero"
import Impact from "@/components/site/home/impact"
import PersonImage from "@/components/site/home/personImage"
import Process from "@/components/site/home/process"
import Projects from "@/components/site/home/projects"
import ResearchProject from "@/components/site/home/researchProject"
import SelectedProjects from "@/components/site/home/seletedProjects"
import Service from "@/components/site/home/service"
import Skills from "@/components/site/home/skills"
import TechStack from "@/components/site/home/techStack"
import { Button } from "@/components/ui/button"

export default function Page() {
  return (
    <>
      <Hero />
      <About />
      <Service />
      <Projects />
      <PersonImage />
      <Experience />
      <Education />
      <SelectedProjects />
      <Skills />
      <Process />
      <Impact />
      <ResearchProject />
      <CurrentlyExploring />
      <TechStack />
      <Contact />
    </>
  )
}
