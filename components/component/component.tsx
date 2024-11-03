'use client'

import React, { useState, useEffect } from 'react'
import { motion, useScroll } from 'framer-motion'
import { FaGithub, FaLinkedin, FaEnvelope, FaCode, FaPalette, FaLightbulb } from 'react-icons/fa'

export default function Portfolio() {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(150)
  const titles = [
    'Desarrollador',
    'Full Stack',
      'boludo',
    'mongolico'
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8 relative z-10">
      <header className="text-center mb-16">
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
          Transformando ideas en código elegante
        </motion.p>
      </header>

      <motion.section 
        className="mb-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Sobre mí</h2>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          Soy un apasionado desarrollador con experiencia en crear soluciones innovadoras. 
          Me especializo en tecnologías web modernas y disfruto enfrentando nuevos desafíos 
          para crear experiencias digitales excepcionales.
        </p>
      </motion.section>

      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2 }}
      >
        <h2 className="text-3xl font-bold mb-4">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {['Proyecto Alfa', 'Proyecto Beta', 'Proyecto Gamma'].map((project, index) => (
            <motion.div 
              key={index}
              className="bg-white bg-opacity-10 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="text-xl font-semibold mb-2">{project}</h3>
              <p className="text-blue-200">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum.</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        className="mb-16"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <h2 className="text-3xl font-bold mb-4">Habilidades</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            { icon: FaCode, text: 'Desarrollo Full-Stack' },
            { icon: FaPalette, text: 'Diseño UI/UX' },
            { icon: FaLightbulb, text: 'Resolución de Problemas' }
          ].map((skill, index) => (
            <motion.div 
              key={index}
              className="flex items-center bg-white bg-opacity-10 p-4 rounded-full"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <skill.icon className="text-2xl mr-2" />
              <span>{skill.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="text-center"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <h2 className="text-3xl font-bold mb-4">Contáctame</h2>
        <div className="flex justify-center space-x-6">
          {[
            { icon: FaGithub, href: 'https://github.com/YoelAG' },
            { icon: FaLinkedin, href: 'https://linkedin.com/in/YoelAG' },
            { icon: FaEnvelope, href: 'mailto:yoel@example.com' }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-4xl hover:text-blue-300 transition-colors duration-300"
              whileHover={{ scale: 1.2, rotate: 15 }}
            >
              <social.icon />
            </motion.a>
          ))}
        </div>
      </motion.section>

      <motion.div
        className="fixed bottom-0 left-0 right-0 h-2 bg-blue-500"
        style={{ scaleX: scrollYProgress }}
      />

      <div
        className="fixed inset-0 flex items-center justify-center text-[20vw] font-bold text-blue-500 opacity-[0.03] pointer-events-none select-none overflow-hidden whitespace-nowrap"
        style={{ zIndex: 0 }}
      >
        YoelAG
      </div>
    </div>
  )
      }
