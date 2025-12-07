import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface BentoGridProps {
  children: ReactNode
}

export function BentoGrid({ children }: BentoGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]"
    >
      {children}
    </motion.div>
  )
}

interface BentoCardProps {
  children: ReactNode
  size?: 'small' | 'medium' | 'large'
  className?: string
}

export function BentoCard({ children, size = 'medium', className = '' }: BentoCardProps) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const sizeClasses = {
    small: 'md:col-span-1 md:row-span-1',
    medium: 'md:col-span-1 md:row-span-2 lg:col-span-2 lg:row-span-1',
    large: 'md:col-span-2 md:row-span-2',
  }

  return (
    <motion.div
      variants={itemVariants}
      className={`${sizeClasses[size]} ${className}`}
    >
      {children}
    </motion.div>
  )
}
