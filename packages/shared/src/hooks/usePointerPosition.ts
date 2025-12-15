import { useState, useEffect, useRef, useCallback } from 'react'

interface PointerPosition {
  x: number
  y: number
}

interface UsePointerPositionOptions {
  /**
   * Enable smooth interpolation for organic movement
   * @default true
   */
  smoothing?: boolean
  /**
   * Smoothing factor (0-1). Lower = smoother but more lag
   * @default 0.15
   */
  smoothingFactor?: number
}

/**
 * Custom hook for unified mouse/touch tracking with performance optimization
 * Tracks pointer position with requestAnimationFrame and respects reduced-motion preferences
 */
export function usePointerPosition(options: UsePointerPositionOptions = {}) {
  const { smoothing = true, smoothingFactor = 0.15 } = options
  
  const [position, setPosition] = useState<PointerPosition>({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)
  
  const targetPosition = useRef<PointerPosition>({ x: 0, y: 0 })
  const currentPosition = useRef<PointerPosition>({ x: 0, y: 0 })
  const rafId = useRef<number | null>(null)
  const prefersReducedMotion = useRef(false)

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReducedMotion.current = mediaQuery.matches
    
    const handleChange = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Animation loop with interpolation
  const animate = useCallback(() => {
    if (!smoothing || prefersReducedMotion.current) {
      currentPosition.current = { ...targetPosition.current }
      setPosition({ ...targetPosition.current })
      return
    }

    const dx = targetPosition.current.x - currentPosition.current.x
    const dy = targetPosition.current.y - currentPosition.current.y
    
    // Apply smoothing
    currentPosition.current.x += dx * smoothingFactor
    currentPosition.current.y += dy * smoothingFactor
    
    setPosition({ ...currentPosition.current })
    
    // Continue animation if there's still significant movement
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance > 0.5) {
      rafId.current = requestAnimationFrame(animate)
    }
  }, [smoothing, smoothingFactor])

  // Handle mouse move
  const handleMouseMove = useCallback((e: MouseEvent) => {
    targetPosition.current = { x: e.clientX, y: e.clientY }
    
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(animate)
    }
    
    if (!isActive) {
      setIsActive(true)
    }
  }, [animate, isActive])

  // Handle touch move
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      targetPosition.current = { x: touch.clientX, y: touch.clientY }
      
      if (rafId.current === null) {
        rafId.current = requestAnimationFrame(animate)
      }
      
      if (!isActive) {
        setIsActive(true)
      }
    }
  }, [animate, isActive])

  // Handle touch start
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0]
      targetPosition.current = { x: touch.clientX, y: touch.clientY }
      currentPosition.current = { x: touch.clientX, y: touch.clientY }
      setPosition({ x: touch.clientX, y: touch.clientY })
      setIsActive(true)
    }
  }, [])

  useEffect(() => {
    // Use passive listeners for better scroll performance
    const options: AddEventListenerOptions = { passive: true }
    
    window.addEventListener('mousemove', handleMouseMove, options)
    window.addEventListener('touchmove', handleTouchMove, options)
    window.addEventListener('touchstart', handleTouchStart, options)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchstart', handleTouchStart)
      
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [handleMouseMove, handleTouchMove, handleTouchStart])

  return { position, isActive }
}
