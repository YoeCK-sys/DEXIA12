"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronDown, GitBranch, Linkedin, Mail, Send, Code, Briefcase, User } from 'lucide-react'

const ProfessionalName = () => {
  return (
    <h1 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text animate-gradient">
      YoelAG
    </h1>
  )
}

const Section = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
      }}
      className="py-20"
    >
      {children}
    </motion.section>
  )
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState('home')

  const projects = [
    { title: 'AI Chat Bot', description: 'A conversational AI using GPT-3', icon: Code },
    { title: 'E-commerce Platform', description: 'Full-stack online store with React and Node.js', icon: Briefcase },
    { title: 'Data Visualization Dashboard', description: 'Interactive charts using D3.js', icon: User },
  ]

  const skills = ['JavaScript', 'React', 'Node.js', 'Python', 'GraphQL', 'AWS']

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-50 backdrop-blur-md">
        <nav className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <ProfessionalName />
          <ul className="flex flex-wrap justify-center space-x-2 md:space-x-4 mt-4 md:mt-0">
            {['home', 'projects', 'skills', 'contact'].map((section) => (
              <li key={section}>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setActiveSection(section)
                    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className={`text-sm ${activeSection === section ? 'text-green-400' : 'text-white'} hover:text-green-400 transition-colors`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 pt-24">
        <Section>
          <div id="home" className="flex flex-col items-center text-center">
            <motion.img
              src="/placeholder.svg?height=150&width=150"
              alt="YoelAG"
              className="w-32 h-32 sm:w-40 sm:h-40 rounded-full mb-6 sm:mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
            />
            <motion.h2
              className="text-3xl sm:text-5xl font-bold mb-3 sm:mb-4"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              YoelAG
            </motion.h2>
            <motion.p
              className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-xl sm:max-w-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Full-stack Developer passionate about creating innovative solutions and pushing the boundaries of web technology.
            </motion.p>
            <Button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3"
            >
              View My Work
            </Button>
          </div>
        </Section>

        <Section>
          <div id="projects">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Featured Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800 border-gray-700 hover:border-green-400 transition-colors h-full">
                    <CardHeader>
                      <project.icon className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-green-400" />
                      <CardTitle className="text-lg sm:text-xl">{project.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm sm:text-base">{project.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full text-sm sm:text-base">Learn More</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div id="skills">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Skills & Technologies</h2>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800 border-gray-700 hover:border-green-400 transition-colors">
                    <CardContent className="p-3 sm:p-4">
                      <span className="text-base sm:text-lg font-semibold">{skill}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Section>

        <Section>
          <div id="contact">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center">Get in Touch</h2>
            <Card className="max-w-md mx-auto bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Contact Me</CardTitle>
                <CardDescription className="text-sm sm:text-base">Have a question or want to work together?</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
                    <Input id="name" placeholder="Your name" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm sm:text-base">Email</Label>
                    <Input id="email" type="email" placeholder="Your email" className="mt-1" />
                  </div>
                  <div>
                    <Label htmlFor="message" className="text-sm sm:text-base">Message</Label>
                    <Textarea id="message" placeholder="Your message" className="mt-1" />
                  </div>
                </form>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  Send Message
                  <Send className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Section>
      </main>

      <footer className="bg-black bg-opacity-50 text-center py-6 sm:py-8 mt-16 sm:mt-20">
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-3 sm:mb-4">
          <a href="#" className="hover:text-green-400 transition-colors">
            <GitBranch className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href="#" className="hover:text-green-400 transition-colors">
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">LinkedIn</span>
          </a>
          <a href="#" className="hover:text-green-400 transition-colors">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="sr-only">Email</span>
          </a>
        </div>
        <p className="text-sm sm:text-base">&copy; 2023 YoelAG. All rights reserved.</p>
      </footer>

      <Button
        variant="outline"
        size="icon"
        className="fixed bottom-4 right-4 bg-gray-800 text-white hover:bg-gray-700"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ChevronDown className="h-4 w-4 rotate-180" />
        <span className="sr-only">Scroll to top</span>
      </Button>
    </div>
  )
    }
