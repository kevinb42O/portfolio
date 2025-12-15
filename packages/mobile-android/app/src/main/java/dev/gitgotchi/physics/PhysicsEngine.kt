package dev.gitgotchi.physics

import android.graphics.PointF

/**
 * Core physics engine for the pet.
 * Handles gravity, velocity, and screen boundaries.
 */
class PhysicsEngine {
    
    private val position = PointF(100f, 100f)
    private val velocity = PointF(0f, 0f)
    private val gravity = 0.5f
    
    private var screenWidth = 1080f
    private var screenHeight = 2400f
    
    fun update(deltaTime: Float) {
        // Apply gravity
        velocity.y += gravity
        
        // Update position
        position.x += velocity.x * (deltaTime / 16f)
        position.y += velocity.y * (deltaTime / 16f)
        
        // Check screen boundaries
        handleBoundaryCollision()
        
        // Apply friction
        velocity.x *= 0.98f
        velocity.y *= 0.98f
    }
    
    private fun handleBoundaryCollision() {
        val petRadius = 50f
        
        // Left boundary
        if (position.x - petRadius < 0) {
            position.x = petRadius
            velocity.x = -velocity.x * 0.7f // Bounce with energy loss
        }
        
        // Right boundary
        if (position.x + petRadius > screenWidth) {
            position.x = screenWidth - petRadius
            velocity.x = -velocity.x * 0.7f
        }
        
        // Top boundary
        if (position.y - petRadius < 0) {
            position.y = petRadius
            velocity.y = -velocity.y * 0.7f
        }
        
        // Bottom boundary
        if (position.y + petRadius > screenHeight) {
            position.y = screenHeight - petRadius
            velocity.y = -velocity.y * 0.7f
        }
    }
    
    fun setPosition(x: Float, y: Float) {
        position.x = x
        position.y = y
    }
    
    fun getPosition(): PointF = position
    
    fun setVelocity(x: Float, y: Float) {
        velocity.x = x
        velocity.y = y
    }
    
    fun getVelocity(): PointF = velocity
    
    fun setScreenSize(width: Float, height: Float) {
        screenWidth = width
        screenHeight = height
    }
    
    fun applyForce(forceX: Float, forceY: Float) {
        velocity.x += forceX
        velocity.y += forceY
    }
}
