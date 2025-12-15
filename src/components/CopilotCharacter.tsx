import { useRef, useEffect, useState, memo } from 'react'
import { motion } from 'framer-motion'

interface CopilotCharacterProps {
  x: number
  y: number
  size: number
  color: 'blue' | 'purple' | 'teal' | 'violet' | 'green'
  pointerX: number
  pointerY: number
  variant: 'copilot' | 'octocat' | 'robot'
  delay?: number
}

// Eye tracking constants
const EYE_TRACKING_DISTANCE_SENSITIVITY = 200 // Distance in pixels for full eye movement intensity
const MIN_BLINK_INTERVAL = 2000 // Minimum time between blinks (ms)
const MAX_BLINK_INTERVAL = 4000 // Maximum time between blinks (ms)
const BLINK_DURATION = 150 // Duration of blink animation (ms)

const COLOR_SCHEMES = {
  blue: {
    primary: 'oklch(0.65 0.25 240)',
    secondary: 'oklch(0.55 0.20 250)',
    highlight: 'oklch(0.75 0.18 230)',
    eye: 'oklch(0.85 0.20 90)',
    glow: 'oklch(0.65 0.25 240 / 0.4)',
  },
  purple: {
    primary: 'oklch(0.60 0.25 290)',
    secondary: 'oklch(0.50 0.20 300)',
    highlight: 'oklch(0.70 0.18 280)',
    eye: 'oklch(0.80 0.22 85)',
    glow: 'oklch(0.60 0.25 290 / 0.4)',
  },
  teal: {
    primary: 'oklch(0.65 0.18 200)',
    secondary: 'oklch(0.55 0.15 210)',
    highlight: 'oklch(0.75 0.15 190)',
    eye: 'oklch(0.85 0.18 90)',
    glow: 'oklch(0.65 0.18 200 / 0.4)',
  },
  violet: {
    primary: 'oklch(0.62 0.25 310)',
    secondary: 'oklch(0.52 0.20 320)',
    highlight: 'oklch(0.72 0.18 300)',
    eye: 'oklch(0.83 0.20 85)',
    glow: 'oklch(0.62 0.25 310 / 0.4)',
  },
  green: {
    primary: 'oklch(0.65 0.20 150)',
    secondary: 'oklch(0.55 0.18 160)',
    highlight: 'oklch(0.75 0.16 140)',
    eye: 'oklch(0.85 0.18 90)',
    glow: 'oklch(0.65 0.20 150 / 0.4)',
  },
}

export const CopilotCharacter = memo(function CopilotCharacter({
  x,
  y,
  size,
  color,
  pointerX,
  pointerY,
  variant,
  delay = 0,
}: CopilotCharacterProps) {
  const characterRef = useRef<HTMLDivElement>(null)
  const [eyePosition, setEyePosition] = useState({ left: { x: 0, y: 0 }, right: { x: 0, y: 0 } })
  const [isHovered, setIsHovered] = useState(false)
  const [isBlinking, setIsBlinking] = useState(false)
  const blinkTimeoutRef = useRef<number | undefined>(undefined)
  
  const colors = COLOR_SCHEMES[color]

  // Calculate eye position based on pointer with perfect circular constraints
  useEffect(() => {
    if (!characterRef.current) return

    const rect = characterRef.current.getBoundingClientRect()
    const characterCenterX = rect.left + rect.width / 2
    const characterCenterY = rect.top + rect.height / 2

    // Calculate angle from character to pointer
    const angle = Math.atan2(pointerY - characterCenterY, pointerX - characterCenterX)
    
    // Calculate distance from character center to pointer
    const distanceToPointer = Math.sqrt(
      Math.pow(pointerX - characterCenterX, 2) + 
      Math.pow(pointerY - characterCenterY, 2)
    )

    // Define eye-specific parameters based on variant
    let eyeWhiteRadius: number
    let pupilRadius: number
    
    switch (variant) {
      case 'copilot':
        eyeWhiteRadius = 7 * (size / 100) // White part of eye
        pupilRadius = 4 * (size / 100) // Pupil size
        break
      case 'octocat':
        eyeWhiteRadius = 8 * (size / 100)
        pupilRadius = 5 * (size / 100)
        break
      case 'robot':
        eyeWhiteRadius = 5 * (size / 100) // Rectangle eye, use as radius equivalent
        pupilRadius = 3 * (size / 100)
        break
    }

    // Calculate maximum movement: radius of eye white minus radius of pupil
    // This ensures pupil stays completely inside the eye white
    const maxPupilMovement = eyeWhiteRadius - pupilRadius

    // Calculate how much the pupil should move based on pointer distance
    // Use a smooth falloff function for more natural movement
    const movementIntensity = Math.min(distanceToPointer / EYE_TRACKING_DISTANCE_SENSITIVITY, 1)
    
    // Apply easing for more natural eye movement
    const easedIntensity = 1 - Math.pow(1 - movementIntensity, 2) // Quadratic ease-out
    
    // Calculate desired movement
    const desiredMoveX = Math.cos(angle) * easedIntensity * maxPupilMovement
    const desiredMoveY = Math.sin(angle) * easedIntensity * maxPupilMovement
    
    // CRITICAL: Enforce circular boundary constraint
    // Calculate the distance from center of the movement
    const movementDistance = Math.sqrt(desiredMoveX * desiredMoveX + desiredMoveY * desiredMoveY)
    
    // Clamp the movement to stay within the circular boundary
    let finalMoveX = desiredMoveX
    let finalMoveY = desiredMoveY
    
    if (movementDistance > maxPupilMovement) {
      // Normalize and scale back to maximum allowed movement
      finalMoveX = (desiredMoveX / movementDistance) * maxPupilMovement
      finalMoveY = (desiredMoveY / movementDistance) * maxPupilMovement
    }

    setEyePosition({
      left: { x: finalMoveX, y: finalMoveY },
      right: { x: finalMoveX, y: finalMoveY },
    })
  }, [pointerX, pointerY, size, variant])

  // Random blinking animation
  useEffect(() => {
    const scheduleNextBlink = () => {
      const nextBlinkDelay = MIN_BLINK_INTERVAL + Math.random() * MAX_BLINK_INTERVAL
      blinkTimeoutRef.current = window.setTimeout(() => {
        setIsBlinking(true)
        window.setTimeout(() => {
          setIsBlinking(false)
          scheduleNextBlink()
        }, BLINK_DURATION)
      }, nextBlinkDelay)
    }

    scheduleNextBlink()

    return () => {
      if (blinkTimeoutRef.current !== undefined) {
        clearTimeout(blinkTimeoutRef.current)
        blinkTimeoutRef.current = undefined
      }
    }
  }, [])

  const renderCharacter = () => {
    switch (variant) {
      case 'copilot':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            {/* Shadow */}
            <ellipse cx="50" cy="92" rx="30" ry="4" fill="black" opacity="0.3" />
            
            {/* Body */}
            <defs>
              <linearGradient id={`body-gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.highlight} />
                <stop offset="50%" stopColor={colors.primary} />
                <stop offset="100%" stopColor={colors.secondary} />
              </linearGradient>
              <radialGradient id={`highlight-${color}`} cx="30%" cy="30%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3" />
                <stop offset="100%" stopColor="white" stopOpacity="0" />
              </radialGradient>
            </defs>
            
            {/* Main body shape */}
            <ellipse cx="50" cy="55" rx="35" ry="40" fill={`url(#body-gradient-${color})`} />
            <ellipse cx="50" cy="55" rx="35" ry="40" fill={`url(#highlight-${color})`} />
            
            {/* Head */}
            <circle cx="50" cy="30" r="22" fill={`url(#body-gradient-${color})`} />
            <circle cx="50" cy="30" r="22" fill={`url(#highlight-${color})`} />
            
            {/* Visor/glasses effect */}
            <rect x="28" y="24" width="44" height="12" rx="6" fill="rgba(0,0,0,0.4)" />
            
            {/* Clip paths for eyes - ensures pupils NEVER escape */}
            <defs>
              <clipPath id={`left-eye-clip-${color}-${variant}`}>
                <circle cx="38" cy="30" r="7" />
              </clipPath>
              <clipPath id={`right-eye-clip-${color}-${variant}`}>
                <circle cx="62" cy="30" r="7" />
              </clipPath>
            </defs>
            
            {/* Eyes container */}
            <g className="eyes">
              {/* Left eye white */}
              <circle cx="38" cy="30" r="7" fill="white" opacity={isBlinking ? 0 : 1} />
              
              {/* Left eye pupil with clip path constraint */}
              <g clipPath={`url(#left-eye-clip-${color}-${variant})`}>
                <circle 
                  cx={38 + eyePosition.left.x} 
                  cy={30 + eyePosition.left.y} 
                  r="4" 
                  fill={colors.eye}
                  opacity={isBlinking ? 0 : 1}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.8;1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
              
              {/* Right eye white */}
              <circle cx="62" cy="30" r="7" fill="white" opacity={isBlinking ? 0 : 1} />
              
              {/* Right eye pupil with clip path constraint */}
              <g clipPath={`url(#right-eye-clip-${color}-${variant})`}>
                <circle 
                  cx={62 + eyePosition.right.x} 
                  cy={30 + eyePosition.right.y} 
                  r="4" 
                  fill={colors.eye}
                  opacity={isBlinking ? 0 : 1}
                >
                  <animate
                    attributeName="opacity"
                    values="1;0.8;1"
                    dur="2s"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
            
            {/* Arms */}
            <ellipse cx="22" cy="60" rx="8" ry="18" fill={colors.secondary} />
            <ellipse cx="78" cy="60" rx="8" ry="18" fill={colors.secondary} />
            
            {/* Accent details */}
            <circle cx="50" cy="75" r="3" fill={colors.eye} opacity="0.6" />
          </svg>
        )
      
      case 'octocat':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`octo-gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.highlight} />
                <stop offset="100%" stopColor={colors.secondary} />
              </linearGradient>
              <clipPath id={`octo-left-eye-clip-${color}`}>
                <circle cx="38" cy="37" r="8" />
              </clipPath>
              <clipPath id={`octo-right-eye-clip-${color}`}>
                <circle cx="62" cy="37" r="8" />
              </clipPath>
            </defs>
            
            {/* Shadow */}
            <ellipse cx="50" cy="92" rx="25" ry="4" fill="black" opacity="0.3" />
            
            {/* Body */}
            <ellipse cx="50" cy="60" rx="28" ry="32" fill={`url(#octo-gradient-${color})`} />
            
            {/* Head with ears */}
            <ellipse cx="50" cy="35" rx="30" ry="28" fill={`url(#octo-gradient-${color})`} />
            <circle cx="30" cy="22" r="8" fill={colors.primary} />
            <circle cx="70" cy="22" r="8" fill={colors.primary} />
            
            {/* Visor */}
            <rect x="25" y="30" width="50" height="14" rx="7" fill="rgba(0,0,0,0.5)" />
            
            {/* Eyes */}
            <circle cx="38" cy="37" r="8" fill="white" opacity={isBlinking ? 0 : 1} />
            <g clipPath={`url(#octo-left-eye-clip-${color})`}>
              <circle 
                cx={38 + eyePosition.left.x} 
                cy={37 + eyePosition.left.y} 
                r="5" 
                fill={colors.eye}
                opacity={isBlinking ? 0 : 1}
              />
            </g>
            
            <circle cx="62" cy="37" r="8" fill="white" opacity={isBlinking ? 0 : 1} />
            <g clipPath={`url(#octo-right-eye-clip-${color})`}>
              <circle 
                cx={62 + eyePosition.right.x} 
                cy={37 + eyePosition.right.y} 
                r="5" 
                fill={colors.eye}
                opacity={isBlinking ? 0 : 1}
              />
            </g>
            
            {/* Paws */}
            <ellipse cx="35" cy="80" rx="10" ry="8" fill={colors.primary} />
            <ellipse cx="65" cy="80" rx="10" ry="8" fill={colors.primary} />
          </svg>
        )
      
      case 'robot':
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <defs>
              <linearGradient id={`robot-gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={colors.highlight} />
                <stop offset="100%" stopColor={colors.secondary} />
              </linearGradient>
              <clipPath id={`robot-left-eye-clip-${color}`}>
                <rect x="40" y="27" width="8" height="10" rx="2" />
              </clipPath>
              <clipPath id={`robot-right-eye-clip-${color}`}>
                <rect x="52" y="27" width="8" height="10" rx="2" />
              </clipPath>
            </defs>
            
            {/* Shadow */}
            <rect x="20" y="88" width="60" height="6" rx="3" fill="black" opacity="0.3" />
            
            {/* Body */}
            <rect x="25" y="45" width="50" height="45" rx="8" fill={`url(#robot-gradient-${color})`} />
            
            {/* Head */}
            <rect x="30" y="15" width="40" height="35" rx="6" fill={colors.primary} />
            
            {/* Antenna */}
            <line x1="50" y1="15" x2="50" y2="8" stroke={colors.eye} strokeWidth="2" />
            <circle cx="50" cy="6" r="3" fill={colors.eye}>
              <animate attributeName="opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite" />
            </circle>
            
            {/* Screen/Visor */}
            <rect x="35" y="22" width="30" height="20" rx="4" fill="rgba(0,0,0,0.6)" />
            
            {/* Eyes */}
            <rect x="40" y="27" width="8" height="10" rx="2" fill="white" opacity={isBlinking ? 0 : 1} />
            <g clipPath={`url(#robot-left-eye-clip-${color})`}>
              <rect 
                x={40 + eyePosition.left.x} 
                y={27 + eyePosition.left.y} 
                width="5" 
                height="7" 
                rx="1"
                fill={colors.eye}
                opacity={isBlinking ? 0 : 1}
              />
            </g>
            
            <rect x="52" y="27" width="8" height="10" rx="2" fill="white" opacity={isBlinking ? 0 : 1} />
            <g clipPath={`url(#robot-right-eye-clip-${color})`}>
              <rect 
                x={52 + eyePosition.right.x} 
                y={27 + eyePosition.right.y} 
                width="5" 
                height="7" 
                rx="1"
                fill={colors.eye}
                opacity={isBlinking ? 0 : 1}
              />
            </g>
            
            {/* Arms */}
            <rect x="15" y="50" width="8" height="30" rx="4" fill={colors.secondary} />
            <rect x="77" y="50" width="8" height="30" rx="4" fill={colors.secondary} />
            
            {/* Chest panel */}
            <circle cx="50" cy="65" r="4" fill={colors.eye} opacity="0.5" />
          </svg>
        )
    }
  }

  return (
    <motion.div
      ref={characterRef}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ 
        opacity: 1, 
        scale: isHovered ? 1.1 : 1, 
        y: 0,
      }}
      transition={{ 
        duration: 0.6, 
        delay,
        scale: { duration: 0.3 },
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        filter: isHovered ? `drop-shadow(0 0 ${size * 0.4}px ${colors.glow})` : `drop-shadow(0 0 ${size * 0.2}px ${colors.glow})`,
        transition: 'filter 0.3s ease',
      }}
      className="character-container"
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3,
          delay: delay * 0.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {renderCharacter()}
      </motion.div>
      
      {/* Sparkle effects on hover */}
      {isHovered && (
        <>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 0.4 }}
            style={{
              position: 'absolute',
              top: '10%',
              right: '10%',
              width: size * 0.1,
              height: size * 0.1,
              background: colors.eye,
              borderRadius: '50%',
              filter: 'blur(2px)',
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
            transition={{ duration: 0.6, delay: 0.3, repeat: Infinity, repeatDelay: 0.4 }}
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '5%',
              width: size * 0.08,
              height: size * 0.08,
              background: colors.eye,
              borderRadius: '50%',
              filter: 'blur(2px)',
            }}
          />
        </>
      )}
    </motion.div>
  )
})
