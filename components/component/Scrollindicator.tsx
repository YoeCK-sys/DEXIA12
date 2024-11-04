'use client'

import React, { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { FaCode, FaDatabase, FaServer, FaMobile, FaDesktop, FaCloud } from 'react-icons/fa'

const icons = [FaCode, FaDatabase, FaServer, FaMobile, FaDesktop, FaCloud]

export default function ScrollIndicator() {
  const [mounted, setMounted] = useState(false)
  const [totalHeight, setTotalHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
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

  return (
    <div ref={containerRef} className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <motion.div
          className="text-blue-400 font-mono text-sm"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {mounted && totalHeight > 0 && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {`Progreso: ${Math.round(transform.get() * 100)}%`}
            </motion.span>
          )}
        </motion.div>
        <div className="flex-1 mx-4">
          <div className="h-2 bg-blue-900 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-blue-500"
              style={{ scaleX, originX: 0 }}
            />
          </div>
          <div className="relative h-2">
            {icons.map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${(index / (icons.length - 1)) * 100}%`,
                  x: '-50%'
                }}
                whileHover={{ y: -2 }}
              >
                <motion.div
                  style={{
                    scale: useTransform(
                      transform,
                      [index / icons.length, (index + 1) / icons.length],
                      [0.8, 1.2]
                    ),
                    opacity: useTransform(
                      transform,
                      [index / icons.length, (index + 1) / icons.length],
                      [0.5, 1]
                    ),
                    transition: { duration: 0.3 }
                  }}
                >
                  <Icon className="text-blue-300 text-xl" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
        <motion.div
          className="text-blue-400 font-mono text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="hidden sm:inline">Desplázate para más</span>
          <span className="sm:hidden">Desplázate</span>
        </motion.div>
      </div>
    </div>
  )
        }
