'use client'

import React, { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { FaCode, FaDatabase, FaServer, FaMobile, FaDesktop, FaCloud } from 'react-icons/fa'

const icons = [FaCode, FaDatabase, FaServer, FaMobile, FaDesktop, FaCloud]

export default function ScrollIndicator() {
  const [mounted, setMounted] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="fixed bottom-0 left-0 right-0 h-16 bg-gray-900 bg-opacity-80 backdrop-blur-sm z-50">
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        <motion.div
          className="text-blue-400 font-mono text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {mounted && (
            <motion.span>{`Progreso: ${Math.round(scrollYProgress.get() * 100)}%`}</motion.span>
          )}
        </motion.div>
        <div className="flex-1 mx-4">
          <motion.div
            className="h-2 bg-blue-500"
            style={{ scaleX, originX: 0 }}
          />
          <div className="relative h-2">
            {icons.map((Icon, index) => (
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
