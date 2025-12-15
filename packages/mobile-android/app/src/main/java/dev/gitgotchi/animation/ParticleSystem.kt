package dev.gitgotchi.animation

import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.PointF
import kotlin.random.Random

/**
 * Particle system for visual effects (confetti, sparkles, stars).
 * Used for celebrations and reactions.
 */
class ParticleSystem {
    
    private val particles = mutableListOf<Particle>()
    private val maxParticles = 100
    
    /**
     * Emit particles from a position
     */
    fun emit(
        x: Float,
        y: Float,
        count: Int,
        type: ParticleType = ParticleType.CONFETTI
    ) {
        repeat(count) {
            if (particles.size < maxParticles) {
                particles.add(createParticle(x, y, type))
            }
        }
    }
    
    private fun createParticle(x: Float, y: Float, type: ParticleType): Particle {
        val velocity = PointF(
            Random.nextFloat() * 10f - 5f, // Random X velocity
            Random.nextFloat() * -10f      // Upward Y velocity
        )
        
        val color = when (type) {
            ParticleType.CONFETTI -> confettiColors.random()
            ParticleType.SPARKLE -> sparkleColors.random()
            ParticleType.STAR -> starColors.random()
        }
        
        return Particle(
            position = PointF(x, y),
            velocity = velocity,
            color = color,
            lifetime = 2000f, // 2 seconds
            type = type
        )
    }
    
    /**
     * Update all particles
     */
    fun update(deltaTime: Float) {
        val iterator = particles.iterator()
        while (iterator.hasNext()) {
            val particle = iterator.next()
            
            // Update position
            particle.position.x += particle.velocity.x * (deltaTime / 16f)
            particle.position.y += particle.velocity.y * (deltaTime / 16f)
            
            // Apply gravity
            particle.velocity.y += 0.5f
            
            // Decrease lifetime
            particle.lifetime -= deltaTime
            
            // Remove dead particles
            if (particle.lifetime <= 0) {
                iterator.remove()
            }
        }
    }
    
    /**
     * Draw all particles
     */
    fun draw(canvas: Canvas, paint: Paint) {
        particles.forEach { particle ->
            val alpha = (particle.lifetime / 2000f * 255).toInt().coerceIn(0, 255)
            paint.alpha = alpha
            paint.color = particle.color
            
            when (particle.type) {
                ParticleType.CONFETTI -> {
                    // Draw as small rectangle
                    canvas.drawRect(
                        particle.position.x - 3f,
                        particle.position.y - 3f,
                        particle.position.x + 3f,
                        particle.position.y + 3f,
                        paint
                    )
                }
                ParticleType.SPARKLE, ParticleType.STAR -> {
                    // Draw as circle
                    canvas.drawCircle(
                        particle.position.x,
                        particle.position.y,
                        4f,
                        paint
                    )
                }
            }
        }
        
        // Reset paint alpha
        paint.alpha = 255
    }
    
    /**
     * Clear all particles
     */
    fun clear() {
        particles.clear()
    }
    
    companion object {
        private val confettiColors = listOf(
            android.graphics.Color.parseColor("#FF6B6B"),
            android.graphics.Color.parseColor("#4ECDC4"),
            android.graphics.Color.parseColor("#FFE66D"),
            android.graphics.Color.parseColor("#95E1D3"),
            android.graphics.Color.parseColor("#F38181")
        )
        
        private val sparkleColors = listOf(
            android.graphics.Color.parseColor("#FFD700"),
            android.graphics.Color.parseColor("#FFA500"),
            android.graphics.Color.parseColor("#FFFF00")
        )
        
        private val starColors = listOf(
            android.graphics.Color.parseColor("#FFFFFF"),
            android.graphics.Color.parseColor("#F0F0F0"),
            android.graphics.Color.parseColor("#E0E0E0")
        )
    }
}

/**
 * Types of particles
 */
enum class ParticleType {
    CONFETTI,
    SPARKLE,
    STAR
}

/**
 * Individual particle
 */
data class Particle(
    val position: PointF,
    val velocity: PointF,
    val color: Int,
    var lifetime: Float,
    val type: ParticleType
)
