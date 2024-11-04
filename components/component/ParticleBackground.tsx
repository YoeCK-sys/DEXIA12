'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = []

    const createParticles = () => {
      const particleCount = 50
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 2
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.strokeStyle = 'rgba(52, 152, 219, 0.3)'
      ctx.lineWidth = 0.8

      particles.forEach((particle, i) => {
        // Aplica las fuerzas
        applyForces(particle, i)

        // Actualiza la posición
        particle.x += particle.vx
        particle.y += particle.vy

        // Comprobación de límites para transición suave
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Dibuja la partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(52, 152, 219, 0.7)'
        ctx.fill()

        // Dibuja conexiones
        drawConnections(particle, i, particle.y)
      })
    }

    const applyForces = (particle: typeof particles[0], index: number) => {
      // Fuerza de repulsión
      particles.forEach((otherParticle, i) => {
        if (i !== index) {
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < 100) {
            const force = (100 - distance) / 100
            particle.vx -= dx / distance * force * 0.05
            particle.vy -= dy / distance * force * 0.05
          }
        }
      })

      // Atracción del mouse
      const dx = mousePosition.current.x - particle.x
      const dy = mousePosition.current.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 200) {
        particle.vx += dx / distance * 0.2
        particle.vy += dy / distance * 0.2
      }

      // Amortiguación
      particle.vx *= 0.98
      particle.vy *= 0.98

      // Límite de velocidad máxima
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
      if (speed > 2) {
        particle.vx = (particle.vx / speed) * 2
        particle.vy = (particle.vy / speed) * 2
      }
    }

    const drawConnections = (particle: typeof particles[0], index: number, y: number) => {
      particles.forEach((otherParticle, i) => {
        if (i > index) {
          const dx = otherParticle.x - particle.x
          const dy = otherParticle.y - y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.globalAlpha = 1 - distance / 150
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      })

      // Conexión al mouse
      const dx = mousePosition.current.x - particle.x
      const dy = mousePosition.current.y - y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 200) {
        ctx.beginPath()
        ctx.moveTo(particle.x, y)
        ctx.lineTo(mousePosition.current.x, mousePosition.current.y)
        ctx.globalAlpha = 1 - distance / 200
        ctx.stroke()
        ctx.globalAlpha = 1
      }
    }

    const animate = () => {
      drawParticles()
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = document.documentElement.scrollHeight // Ajusta el canvas a la altura total del documento
      particles.length = 0 // Vacía el array de partículas para evitar duplicados
      createParticles()
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY }
    }

    handleResize()
    animate()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    />
  )
} 

export default ParticleBackground
