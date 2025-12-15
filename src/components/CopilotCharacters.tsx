import { motion } from 'framer-motion'
import { CopilotCharacter } from './CopilotCharacter'
import { usePointerPosition } from '@/hooks/usePointerPosition'
import { useEffect, useState } from 'react'

interface CharacterConfig {
  x: number
  y: number
  size: number
  color: 'blue' | 'purple' | 'teal' | 'violet' | 'green'
  variant: 'copilot' | 'octocat' | 'robot'
  delay: number
}

// Character configurations for composition
const CHARACTERS: CharacterConfig[] = [
  // Front row - larger characters
  { x: 35, y: 55, size: 140, color: 'blue', variant: 'copilot', delay: 0 },
  { x: 65, y: 58, size: 130, color: 'purple', variant: 'octocat', delay: 0.1 },
  
  // Middle row
  { x: 20, y: 48, size: 110, color: 'teal', variant: 'robot', delay: 0.2 },
  { x: 50, y: 45, size: 115, color: 'violet', variant: 'copilot', delay: 0.15 },
  { x: 80, y: 50, size: 105, color: 'green', variant: 'octocat', delay: 0.25 },
  
  // Back row - smaller characters
  { x: 30, y: 35, size: 85, color: 'purple', variant: 'robot', delay: 0.3 },
  { x: 55, y: 32, size: 90, color: 'blue', variant: 'octocat', delay: 0.35 },
  { x: 75, y: 38, size: 80, color: 'teal', variant: 'copilot', delay: 0.4 },
]

// Floating code snippets
const CODE_SNIPPETS = [
  '{ }',
  '</>',
  '( )',
  'fn',
  '=>',
  '&&',
  '0x',
  '##',
]

export function CopilotCharacters() {
  const { position } = usePointerPosition({ smoothing: true, smoothingFactor: 0.12 })
  const [codeParticles, setCodeParticles] = useState<Array<{ id: number; x: number; y: number; text: string; delay: number }>>([])

  // Generate floating code particles
  useEffect(() => {
    const particles = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      text: CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)],
      delay: Math.random() * 2,
    }))
    setCodeParticles(particles)
  }, [])

  return (
    <section className="relative w-full min-h-[70vh] overflow-hidden">
      {/* Dark atmospheric background with gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.15_0.05_280)] via-[oklch(0.12_0.08_290)] to-[oklch(0.08_0.06_270)]" />
      
      {/* Radial gradient overlays for depth */}
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, oklch(0.35 0.15 250) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: 'radial-gradient(circle, oklch(0.30 0.12 290) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Floating code snippets */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {codeParticles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0, 0.3, 0.3, 0],
              y: [0, -100],
            }}
            transition={{
              duration: 8,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
            style={{
              position: 'absolute',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              fontSize: '1.5rem',
              fontFamily: 'monospace',
              color: 'oklch(0.65 0.18 240)',
              textShadow: '0 0 10px oklch(0.65 0.18 240 / 0.5)',
            }}
          >
            {particle.text}
          </motion.div>
        ))}
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(oklch(0.5 0.15 250) 1px, transparent 1px),
            linear-gradient(90deg, oklch(0.5 0.15 250) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full h-full min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
        {/* Title section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 z-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
            Meet the <span className="bg-gradient-to-r from-[oklch(0.65_0.25_240)] to-[oklch(0.75_0.18_90)] bg-clip-text text-transparent">Copilot Crew</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Your friendly AI-powered assistants, watching your every move
          </p>
        </motion.div>

        {/* Characters container */}
        <div className="relative w-full max-w-5xl h-[500px] mx-auto">
          {/* Glow effect behind characters */}
          <div 
            className="absolute inset-0 blur-3xl opacity-30"
            style={{
              background: 'radial-gradient(ellipse at center, oklch(0.65 0.25 240 / 0.4) 0%, transparent 70%)',
            }}
          />
          
          {/* Render all characters */}
          {CHARACTERS.map((char, index) => (
            <CopilotCharacter
              key={index}
              x={char.x}
              y={char.y}
              size={char.size}
              color={char.color}
              pointerX={position.x}
              pointerY={position.y}
              variant={char.variant}
              delay={char.delay}
            />
          ))}
        </div>

        {/* Bottom accent with animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex gap-2 mt-8 z-20"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-2 h-2 rounded-full"
              style={{
                background: 'oklch(0.65 0.25 240)',
                boxShadow: '0 0 10px oklch(0.65 0.25 240 / 0.6)',
              }}
            />
          ))}
        </motion.div>

        {/* Interactive hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0.6] }}
          transition={{ delay: 1.5, duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-sm text-muted-foreground mt-4 text-center z-20"
        >
          Move your cursor or touch to interact
        </motion.p>
      </div>

      {/* Bottom shadow for depth */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, oklch(0.08 0.06 270), transparent)',
        }}
      />
    </section>
  )
}
