'use client'

import React, { useState, useEffect, useRef, ReactNode} from 'react'
import { motion, useScroll, useInView } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaPalette, FaLightbulb, FaServer, FaDatabase, FaMobile, FaDesktop, FaCloud } from 'react-icons/fa'
import ScrollIndicator from './Scrollindicator'
import Image from 'next/image'

const AnimatedSection = ({ children, className = '' }: { children: ReactNode; className?: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.section>
  )
}

export default function Portfolio() {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const titles = [
    'Desarrollador Full Stack',
    'Ingeniero de Software',
    'Entusiasta de la Tecnología',
    'Solucionador de Problemas'
  ]
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    let timer: NodeJS.Timeout

    const handleTyping = () => {
      const i = loopNum % titles.length
      const fullText = titles[i]

      setDisplayText(isDeleting ? fullText.substring(0, displayText.length - 1) : fullText.substring(0, displayText.length + 1))

      setTypingSpeed(isDeleting ? 100 : 150)

      if (!isDeleting && displayText === fullText) {
        timer = setTimeout(() => setIsDeleting(true), 4000)
      } else if (isDeleting && displayText === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      } else {
        timer = setTimeout(handleTyping, typingSpeed)
      }
    }

    timer = setTimeout(handleTyping, typingSpeed)

    return () => clearTimeout(timer)
  }, [displayText, isDeleting, loopNum, titles, typingSpeed])

  const projects = [
    {
      title: "E-commerce Avanzado",
      description: "Plataforma de comercio electrónico con microservicios, procesamiento de pagos en tiempo real y análisis de datos de usuarios.",
      technologies: ["React", "Node.js", "MongoDB", "Docker", "AWS"],
      link: "https://github.com/YoelAG/ecommerce-avanzado"
    },
    {
      title: "Sistema de Gestión de Tareas",
      description: "Aplicación web para la gestión de proyectos y tareas con características de colaboración en tiempo real y análisis de productividad.",
      technologies: ["Vue.js", "Express", "PostgreSQL", "Socket.io", "Chart.js"],
      link: "https://github.com/YoelAG/task-manager"
    },
    {
      title: "API de Inteligencia Artificial",
      description: "API RESTful que integra modelos de aprendizaje automático para análisis de sentimientos y clasificación de texto.",
      technologies: ["Python", "Flask", "TensorFlow", "Docker", "Google Cloud"],
      link: "https://github.com/YoelAG/ai-api"
    }
  ]

  const skills = [
    { name: "Desarrollo Frontend", icon: FaDesktop, level: 90 },
    { name: "Desarrollo Backend", icon: FaServer, level: 85 },
    { name: "Bases de Datos", icon: FaDatabase, level: 80 },
    { name: "DevOps", icon: FaCloud, level: 75 },
    { name: "Desarrollo Móvil", icon: FaMobile, level: 70 },
    { name: "Inteligencia Artificial", icon: FaLightbulb, level: 65 }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8 relative z-10">
      <header className="text-center mb-16">
        <div className="flex justify-center mb-8">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500">
            <Image
              src="/placeholder.svg?height=160&width=160"
              alt="Yoel AG"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
        <motion.h1 
          className="text-4xl md:text-6xl font-bold mb-2 font-mono"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          {'> YoelAG:'}
        </motion.h1>
        <motion.div
          className="text-3xl md:text-5xl font-bold mb-4 font-mono h-[1.2em] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="inline-flex items-center h-full">
            {displayText}
            <span className="animate-pulse ml-1">|</span>
          </span>
        </motion.div>
        <motion.p 
          className="text-xl md:text-2xl text-blue-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Transformando ideas en soluciones tecnológicas innovadoras
        </motion.p>
      </header>

      <AnimatedSection className="mb-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Sobre mí</h2>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          Soy un ingeniero de software apasionado con más de 5 años de experiencia en el desarrollo de soluciones tecnológicas innovadoras. 
          Me especializo en arquitecturas de microservicios, desarrollo full-stack y la implementación de soluciones de IA. 
          Mi objetivo es crear software que no solo funcione, sino que también impacte positivamente en la vida de los usuarios.
        </p>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <h2 className="text-3xl font-bold mb-4">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-blue-200 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="bg-blue-500 bg-opacity-20 text-blue-300 px-2 py-1 rounded-full text-sm">
                    {tech}
                  </span>
                ))}
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                Ver proyecto
              </a>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <h2 className="text-3xl font-bold mb-4">Habilidades</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div 
              key={index}
              className="bg-white bg-opacity-10 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center mb-2">
                <skill.icon className="text-2xl mr-2 text-blue-300" />
                <h3 className="text-xl font-semibold">{skill.name}</h3>
              </div>
              <div className="w-full bg-blue-900 rounded-full h-2.5 mb-2">
                <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
              </div>
              <p className="text-sm text-blue-200">
                {skill.level >= 90 ? 'Experto' :
                 skill.level >= 70 ? 'Avanzado' :
                 skill.level >= 50 ? 'Intermedio' : 'Principiante'}
              </p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>

      <AnimatedSection className="mb-16">
        <h2 className="text-3xl font-bold mb-4">Experiencia Profesional</h2>
        <div className="bg-white bg-opacity-10 p-6 rounded-lg">
          <h3 className="text-xl font-semibold">Freelancer</h3>
          <p className="text-blue-300">Desarrollador Full Stack | 2016 - Presente</p>
          <p className="mt-2 text-blue-200">
            Desarrollo de proyectos variados para clientes internacionales, 
            abarcando desde aplicaciones web complejas hasta soluciones de 
            e-commerce y sistemas de gestión empresarial.
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="text-center mb-16">
        <h2 className="text-3xl font-bold mb-4">Contáctame</h2>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto mb-6">
          ¿Interesado en colaborar en un proyecto o tienes alguna pregunta? No dudes en contactarme a través de cualquiera de estos canales:
        </p>
        <div className="flex justify-center space-x-6">
          {[
            { icon: FaGithub, href: 'https://github.com/YoelAG', label: 'GitHub' },
            { icon: FaLinkedin, href: 'https://linkedin.com/in/YoelAG', label: 'LinkedIn' },
            { icon: FaEnvelope, href: 'mailto:yoel@example.com', label: 'Email' }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-blue-300 hover:text-blue-100 transition-colors duration-300"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <social.icon className="text-4xl mb-2" />
              <span>{social.label}</span>
            </motion.a>
          ))}
        </div>
      </AnimatedSection>

      <div
        className="fixed inset-0 flex items-center justify-center text-[20vw] font-bold text-blue-500 opacity-[0.03] pointer-events-none select-none overflow-hidden whitespace-nowrap"
        style={{ zIndex: 0 }}
      >
        YoelAG
      </div>

      <ScrollIndicator />
    </div>
  )
    }
