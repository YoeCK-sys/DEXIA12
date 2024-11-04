'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { FaCode, FaDatabase, FaServer, FaMobile, FaDesktop, FaCloud } from 'react-icons/fa'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

const icons = [FaCode, FaDatabase, FaServer, FaMobile, FaDesktop, FaCloud]

export default function ScrollIndicator() {
  const [mounted, setMounted] = useState(false)
  const [totalHeight, setTotalHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const scrollYProgress = useTransform(scrollY, [0, totalHeight], [0, 1])
  const transform = useTransform(scrollY, [0, totalHeight], [0, 1])
  const scaleX = useSpring(transform, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)

    const updateHeight = () => {
      if (containerRef.current) {
        const height = document.documentElement.scrollHeight - window.innerHeight
        setTotalHeight(height)
      }
    }

    // Actualizar la altura después de que todos los elementos se hayan cargado
    window.addEventListener('load', updateHeight)
    // También actualizar en caso de que cambie el tamaño de la ventana
    window.addEventListener('resize', updateHeight)

    // Llamar a updateHeight una vez después de un breve retraso
    const timer = setTimeout(updateHeight, 1000)

    return () => {
      window.removeEventListener('load', updateHeight)
      window.removeEventListener('resize', updateHeight)
      clearTimeout(timer)
    }
  }, [])

  const getSectionName = (index: number) => {
    const sections = ["Inicio", "Sobre mí", "Proyectos", "Habilidades", "Experiencia", "Contacto"];
    return sections[index] || `Sección ${index + 1}`;
  };

  return (
    <div ref={containerRef} className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900/70 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <motion.div
          className="text-blue-400 font-mono text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {mounted && totalHeight > 0 && (
            <motion.span>{`Progreso: ${Math.round(transform.get() * 100)}%`}</motion.span>
          )}
        </motion.div>
        <div className="flex-1 mx-4">
          <motion.div
            className="h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            style={{ scaleX, originX: 0 }}
          />
          <div className="relative h-2">
            {icons.map((Icon, index) => (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <motion.div
                      key={index}
                      className="absolute top-1/2 -translate-y-1/2"
                      style={{
                        left: `${(index / (icons.length - 1)) * 100}%`,
                        x: '-50%'
                      }}
                    >
                      <motion.div
                        style={{
                          scale: useSpring(
                            scrollYProgress.get() > index / icons.length ? 1.2 : 0.8,
                            { stiffness: 300, damping: 30 }
                          ),
                          opacity: useSpring(
                            scrollYProgress.get() > index / icons.length ? 1 : 0.5,
                            { stiffness: 300, damping: 30 }
                          )
                        }}
                        whileHover={{ scale: 1.3, transition: { duration: 0.2 } }}
                      >
                        <Icon className="text-blue-300 text-xl" />
                      </motion.div>
                    </motion.div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{getSectionName(index)}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>
        <motion.div
          className="text-blue-400 font-mono text-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <span className="hidden sm:inline">Desplázate para más</span>
          <span className="sm:hidden">Desplázate</span>
        </motion.div>
      </div>
    </div>
  )
  }
