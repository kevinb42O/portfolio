import { Position, Velocity, Bounds, WindowInfo } from '../types'

// Physics constants
const GRAVITY = 0.5 // Pixels per frame squared
const AIR_RESISTANCE = 0.98 // Velocity multiplier per frame
const BOUNCE_DAMPENING = 0.6 // Energy retained after bounce
const GROUND_FRICTION = 0.85 // Friction when on surface
const MAX_FALL_SPEED = 15 // Terminal velocity
const WALK_SPEED = 2 // Horizontal walk speed
const JUMP_FORCE = -12 // Initial upward velocity for jump
const ROPE_LENGTH = 100 // Maximum rope swing distance

interface RoamingState {
  position: Position
  velocity: Velocity
  isGrounded: boolean
  isSwinging: boolean
  ropeAnchor: Position | null
}

export class RoamingEngine {
  private state: RoamingState
  private screenBounds: Bounds
  private characterSize: { width: number; height: number }
  private windows: WindowInfo[] = []

  constructor(
    screenBounds: Bounds,
    initialPosition: Position,
    characterSize: { width: number; height: number } = { width: 200, height: 200 }
  ) {
    this.screenBounds = screenBounds
    this.characterSize = characterSize
    this.state = {
      position: initialPosition,
      velocity: { x: 0, y: 0 },
      isGrounded: false,
      isSwinging: false,
      ropeAnchor: null,
    }
  }

  /**
   * Update physics simulation by one frame
   */
  update(_deltaTime: number = 1): RoamingState {
    if (this.state.isSwinging && this.state.ropeAnchor) {
      this.updateSwinging()
    } else {
      this.updateFalling()
    }

    this.enforceScreenBounds()
    this.checkWindowCollisions()

    return { ...this.state }
  }

  /**
   * Update physics when swinging from a rope
   */
  private updateSwinging(): void {
    if (!this.state.ropeAnchor) return

    const anchor = this.state.ropeAnchor
    const pos = this.state.position

    // Calculate rope vector
    const dx = pos.x - anchor.x
    const dy = pos.y - anchor.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    // Apply tension force if rope is stretched
    if (distance > ROPE_LENGTH) {
      // Normalize and apply constraint
      const ratio = ROPE_LENGTH / distance
      this.state.position.x = anchor.x + dx * ratio
      this.state.position.y = anchor.y + dy * ratio

      // Apply centripetal force
      const angle = Math.atan2(dy, dx)
      const speed = Math.sqrt(
        this.state.velocity.x ** 2 + this.state.velocity.y ** 2
      )

      // Tangential velocity perpendicular to rope
      const tangentAngle = angle + Math.PI / 2
      this.state.velocity.x = Math.cos(tangentAngle) * speed * 0.95
      this.state.velocity.y = Math.sin(tangentAngle) * speed * 0.95
    }

    // Apply gravity even when swinging
    this.state.velocity.y += GRAVITY * 0.7 // Reduced gravity while swinging

    // Apply air resistance
    this.state.velocity.x *= AIR_RESISTANCE
    this.state.velocity.y *= AIR_RESISTANCE

    // Update position
    this.state.position.x += this.state.velocity.x
    this.state.position.y += this.state.velocity.y
  }

  /**
   * Update physics when falling/jumping
   */
  private updateFalling(): void {
    // Apply gravity
    if (!this.state.isGrounded) {
      this.state.velocity.y += GRAVITY
      // Cap fall speed
      if (this.state.velocity.y > MAX_FALL_SPEED) {
        this.state.velocity.y = MAX_FALL_SPEED
      }
    }

    // Apply air resistance
    this.state.velocity.x *= this.state.isGrounded ? GROUND_FRICTION : AIR_RESISTANCE
    this.state.velocity.y *= AIR_RESISTANCE

    // Update position
    this.state.position.x += this.state.velocity.x
    this.state.position.y += this.state.velocity.y
  }

  /**
   * Enforce screen boundaries with bounce physics
   */
  private enforceScreenBounds(): void {
    const { width, height } = this.characterSize
    const halfWidth = width / 2
    const halfHeight = height / 2

    // Left boundary
    if (this.state.position.x - halfWidth < 0) {
      this.state.position.x = halfWidth
      this.state.velocity.x *= -BOUNCE_DAMPENING
    }

    // Right boundary
    if (this.state.position.x + halfWidth > this.screenBounds.width) {
      this.state.position.x = this.screenBounds.width - halfWidth
      this.state.velocity.x *= -BOUNCE_DAMPENING
    }

    // Top boundary
    if (this.state.position.y - halfHeight < 0) {
      this.state.position.y = halfHeight
      this.state.velocity.y *= -BOUNCE_DAMPENING
    }

    // Bottom boundary (ground)
    if (this.state.position.y + halfHeight >= this.screenBounds.height) {
      this.state.position.y = this.screenBounds.height - halfHeight
      this.state.velocity.y = 0
      this.state.isGrounded = true
    } else {
      this.state.isGrounded = false
    }
  }

  /**
   * Check for collisions with window title bars
   */
  private checkWindowCollisions(): void {
    const { width, height } = this.characterSize
    const charBounds = {
      left: this.state.position.x - width / 2,
      right: this.state.position.x + width / 2,
      top: this.state.position.y - height / 2,
      bottom: this.state.position.y + height / 2,
    }

    for (const window of this.windows) {
      const windowBounds = {
        left: window.x,
        right: window.x + window.width,
        top: window.y,
        bottom: window.y + window.height,
      }

      // Check if character is overlapping window title bar (top 30px)
      const titleBarHeight = 30
      if (
        charBounds.right > windowBounds.left &&
        charBounds.left < windowBounds.right &&
        charBounds.bottom > windowBounds.top &&
        charBounds.top < windowBounds.top + titleBarHeight
      ) {
        // Land on title bar
        if (this.state.velocity.y > 0) {
          this.state.position.y = windowBounds.top - height / 2
          this.state.velocity.y = 0
          this.state.isGrounded = true
        }
      }
    }
  }

  /**
   * Attach a rope for swinging mechanics
   */
  attachRope(anchorPoint: Position): void {
    this.state.isSwinging = true
    this.state.ropeAnchor = { ...anchorPoint }
    this.state.isGrounded = false
  }

  /**
   * Release the rope
   */
  releaseRope(): void {
    this.state.isSwinging = false
    this.state.ropeAnchor = null
  }

  /**
   * Make the character jump
   */
  jump(): void {
    if (this.state.isGrounded) {
      this.state.velocity.y = JUMP_FORCE
      this.state.isGrounded = false
    }
  }

  /**
   * Walk in a direction (-1 = left, 1 = right)
   */
  walk(direction: -1 | 1): void {
    if (this.state.isGrounded) {
      this.state.velocity.x = direction * WALK_SPEED
    } else {
      // Allow air control
      this.state.velocity.x += direction * WALK_SPEED * 0.3
    }
  }

  /**
   * Update the list of windows for collision detection
   */
  updateWindows(windows: WindowInfo[]): void {
    this.windows = windows
  }

  /**
   * Get current position
   */
  getPosition(): Position {
    return { ...this.state.position }
  }

  /**
   * Get current state
   */
  getState(): RoamingState {
    return { ...this.state }
  }

  /**
   * Set position directly (for teleporting)
   */
  setPosition(position: Position): void {
    this.state.position = { ...position }
  }

  /**
   * Apply an impulse force
   */
  applyForce(force: Velocity): void {
    this.state.velocity.x += force.x
    this.state.velocity.y += force.y
  }
}
