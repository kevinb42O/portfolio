package dev.gitgotchi.animation

import dev.gitgotchi.pet.PetState

/**
 * Controls animations and sprite sheet playback.
 * Manages frame timing and animation loops.
 */
class AnimationController {
    
    private var currentAnimation: Animation? = null
    private var currentFrame = 0
    private var timeAccumulator = 0f
    
    fun setAnimation(state: PetState, loop: Boolean = true) {
        // Create animation based on state
        currentAnimation = createAnimation(state, loop)
        currentFrame = 0
        timeAccumulator = 0f
    }
    
    fun update(deltaTime: Float) {
        val animation = currentAnimation ?: return
        
        timeAccumulator += deltaTime
        
        // Check if we should advance to next frame
        if (timeAccumulator >= animation.frameDuration) {
            timeAccumulator -= animation.frameDuration
            
            currentFrame++
            
            // Handle loop or end
            if (currentFrame >= animation.frameCount) {
                if (animation.loop) {
                    currentFrame = 0
                } else {
                    currentFrame = animation.frameCount - 1
                    // Animation ended
                }
            }
        }
    }
    
    fun getCurrentFrame(): Int = currentFrame
    
    fun isAnimationComplete(): Boolean {
        val animation = currentAnimation ?: return true
        return !animation.loop && currentFrame >= animation.frameCount - 1
    }
    
    private fun createAnimation(state: PetState, loop: Boolean): Animation {
        // Map pet states to animation configurations
        return when (state) {
            PetState.IDLE_STAND -> Animation(8, 100f, loop)
            PetState.WALKING -> Animation(6, 80f, loop)
            PetState.RUNNING -> Animation(8, 60f, loop)
            PetState.JUMPING -> Animation(6, 80f, false)
            PetState.SKATEBOARD_RIDE -> Animation(8, 70f, loop)
            PetState.SKATEBOARD_KICKFLIP -> Animation(10, 50f, false)
            PetState.ROPE_SWING -> Animation(8, 100f, loop)
            PetState.HAPPY_DANCE -> Animation(12, 80f, false)
            PetState.CELEBRATING -> Animation(16, 60f, false)
            PetState.WAVING -> Animation(8, 100f, false)
            else -> Animation(8, 100f, loop)
        }
    }
}

/**
 * Animation data class
 */
data class Animation(
    val frameCount: Int,
    val frameDuration: Float, // milliseconds
    val loop: Boolean
)
