package dev.gitgotchi.physics

import android.graphics.PointF

/**
 * Simulates skateboard physics.
 * Handles rolling, tricks, and grinding along navigation bar.
 */
class SkateboardPhysics {
    
    private val position = PointF(0f, 0f)
    private var speed = 0f
    private var isGrinding = false
    
    var isActive = false
        private set
    
    /**
     * Start skateboarding at the given position
     */
    fun start(x: Float, y: Float, initialSpeed: Float = 5f) {
        position.set(x, y)
        speed = initialSpeed
        isActive = true
    }
    
    /**
     * Stop skateboarding
     */
    fun stop() {
        isActive = false
        speed = 0f
    }
    
    /**
     * Update skateboard physics
     */
    fun update(deltaTime: Float, tilt: Float = 0f) {
        if (!isActive) return
        
        // Speed is affected by phone tilt (accelerometer)
        speed += tilt * 0.1f
        
        // Apply friction
        speed *= 0.98f
        
        // Update position
        position.x += speed * (deltaTime / 16f)
        
        // Check if grinding along navigation bar
        checkGrinding()
    }
    
    private fun checkGrinding() {
        // TODO: Implement navigation bar detection
        // If Y position is at navigation bar height, set isGrinding = true
    }
    
    fun getPosition(): PointF = position
    
    fun getSpeed(): Float = speed
    
    fun isGrinding(): Boolean = isGrinding
    
    /**
     * Perform a trick (kickflip, ollie, etc.)
     */
    fun performTrick(): TrickType {
        // Random trick selection
        return TrickType.values().random()
    }
}

enum class TrickType {
    KICKFLIP,
    OLLIE,
    GRIND
}
