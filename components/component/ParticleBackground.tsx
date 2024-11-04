'use client'

import React, { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const scrollOffset = useRef(0)

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
        // Apply forces
        applyForces(particle, i)

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy

        // Adjust for scroll
        const adjustedY = particle.y - scrollOffset.current

        // Boundary check with smooth transition
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (adjustedY < 0) particle.y = scrollOffset.current + canvas.height
        if (adjustedY > canvas.height) particle.y = scrollOffset.current

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, adjustedY, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(52, 152, 219, 0.7)'
        ctx.fill()

        // Draw connections
        drawConnections(particle, i, adjustedY)
      })
    }

    const applyForces = (particle: typeof particles[0], index: number) => {
      // Repulsion force
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

      // Mouse attraction
      const dx = mousePosition.current.x - particle.x
      const dy = (mousePosition.current.y + scrollOffset.current) - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      if (distance < 200) {
        particle.vx += dx / distance * 0.2
        particle.vy += dy / distance * 0.2
      }

      // Damping
      particle.vx *= 0.98
      particle.vy *= 0.98

      // Max speed limit
      const speed = Math.sqrt(particle.vx * particle.vx + particle.vy * particle.vy)
      if (speed > 2) {
        particle.vx = (particle.vx / speed) * 2
        particle.vy = (particle.vy / speed) * 2
      }
    }

    const drawConnections = (particle: typeof particles[0], index: number, adjustedY: number) => {
      particles.forEach((otherParticle, i) => {
        if (i > index) {
          const dx = otherParticle.x - particle.x
          const dy = (otherParticle.y - scrollOffset.current) - adjustedY
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 150) {
            ctx.beginPath()
            ctx.moveTo(particle.x, adjustedY)
            ctx.lineTo(otherParticle.x, otherParticle.y - scrollOffset.current)
            ctx.globalAlpha = 1 - distance / 150
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      })

      // Connect to mouse
      const dx = mousePosition.current.x - particle.x
      const dy = mousePosition.current.y - adjustedY
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 200) {
        ctx.beginPath()
        ctx.moveTo(particle.x, adjustedY)
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
      canvas.height = window.innerHeight
      createParticles()
    }

    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current = { x: event.clientX, y: event.clientY }
    }

    const handleScroll = () => {
      scrollOffset.current = window.pageYOffset
    }

    handleResize()
    animate()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll)
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
