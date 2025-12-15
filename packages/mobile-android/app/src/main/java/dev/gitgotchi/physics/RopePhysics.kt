package dev.gitgotchi.physics

import android.graphics.PointF
import kotlin.math.cos
import kotlin.math.sin

/**
 * Simulates rope swinging physics using pendulum mechanics.
 * Creates the "grab onto status bar and swing down" effect.
 */
class RopePhysics {
    
    private var anchorPoint = PointF(0f, 0f)
    private var ropeLength = 200f
    private var angle = 0f // In radians
    private var angularVelocity = 0f
    
    private val gravity = 0.5f
    private val damping = 0.995f // Energy loss
    
    var isActive = false
        private set
    
    /**
     * Attach rope to a point (e.g., status bar)
     */
    fun attach(x: Float, y: Float, length: Float) {
        anchorPoint.set(x, y)
        ropeLength = length
        isActive = true
    }
    
    /**
     * Release the rope and return the launch velocity
     */
    fun release(): PointF {
        isActive = false
        
        // Convert angular velocity to linear velocity
        val velocityX = angularVelocity * ropeLength * cos(angle)
        val velocityY = angularVelocity * ropeLength * sin(angle)
        
        return PointF(velocityX, velocityY)
    }
    
    /**
     * Update rope physics
     */
    fun update(deltaTime: Float) {
        if (!isActive) return
        
        // Pendulum physics: angular acceleration = -g/L * sin(θ)
        val angularAcceleration = -(gravity / ropeLength) * sin(angle)
        
        // Update angular velocity
        angularVelocity += angularAcceleration * (deltaTime / 16f)
        angularVelocity *= damping
        
        // Update angle
        angle += angularVelocity * (deltaTime / 16f)
    }
    
    /**
     * Get current position of the pet at the end of the rope
     */
    fun getPosition(): PointF {
        val x = anchorPoint.x + ropeLength * sin(angle)
        val y = anchorPoint.y + ropeLength * cos(angle)
        return PointF(x, y)
    }
    
    /**
     * Apply external force to swing the rope (e.g., user drag)
     */
    fun applyForce(force: Float) {
        angularVelocity += force
    }
}
