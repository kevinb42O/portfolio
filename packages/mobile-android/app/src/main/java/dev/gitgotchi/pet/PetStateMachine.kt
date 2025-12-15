package dev.gitgotchi.pet

/**
 * State machine that manages pet animation states and transitions.
 */
class PetStateMachine {
    
    private var currentState: PetState = PetState.IDLE_STAND
    private var currentFrame: Int = 0
    private var timeInState: Float = 0f
    
    fun update(deltaTime: Float) {
        timeInState += deltaTime
        
        // Simple animation - just cycle frames
        // TODO: Implement proper sprite sheet animation
        if (timeInState >= 100f) { // Update every 100ms
            currentFrame = (currentFrame + 1) % 8
            timeInState = 0f
        }
    }
    
    fun setState(newState: PetState) {
        if (currentState != newState) {
            currentState = newState
            currentFrame = 0
            timeInState = 0f
        }
    }
    
    fun getCurrentState(): PetState = currentState
    
    fun getCurrentFrame(): Int = currentFrame
}
