package dev.gitgotchi.pet

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.view.MotionEvent
import android.view.View
import android.view.ViewGroup
import dev.gitgotchi.interaction.TouchHandler
import dev.gitgotchi.physics.PhysicsEngine

/**
 * Custom View that renders the GitGotchi pet.
 * This is the actual pet that appears on screen - uses Canvas for custom drawing.
 */
class GitGotchiView(context: Context) : View(context) {
    
    companion object {
        private const val FRAME_DELAY_MS = 16L // 60fps
    }
    
    private val physicsEngine = PhysicsEngine()
    private val touchHandler = TouchHandler(this)
    private val petRenderer = PetRenderer()
    private val petStateMachine = PetStateMachine()
    
    private val updateRunnable = object : Runnable {
        override fun run() {
            // Update physics at 60fps
            physicsEngine.update(FRAME_DELAY_MS.toFloat())
            
            // Update animation state
            petStateMachine.update(FRAME_DELAY_MS.toFloat())
            
            // Redraw
            invalidate()
            
            // Schedule next update
            postDelayed(this, FRAME_DELAY_MS)
        }
    }
    
    init {
        // Set view size
        layoutParams = ViewGroup.LayoutParams(200, 200)
        
        // Start update loop
        post(updateRunnable)
    }
    
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        
        // Get current pet position from physics engine
        val position = physicsEngine.getPosition()
        
        // Get current animation frame
        val currentFrame = petStateMachine.getCurrentFrame()
        
        // Get current state
        val currentState = petStateMachine.getCurrentState()
        
        // Render the pet with procedural animation
        petRenderer.draw(canvas, position, currentFrame, currentState)
    }
    
    @SuppressLint("ClickableViewAccessibility")
    override fun onTouchEvent(event: MotionEvent): Boolean {
        return touchHandler.handleTouch(event) || super.onTouchEvent(event)
    }
    
    override fun onDetachedFromWindow() {
        super.onDetachedFromWindow()
        // Stop update loop when view is removed
        removeCallbacks(updateRunnable)
    }
    
    /**
     * Public API for external control
     */
    fun setPetState(state: PetState) {
        petStateMachine.setState(state)
    }
    
    fun getPetState(): PetState {
        return petStateMachine.getCurrentState()
    }
    
    fun updatePosition(x: Float, y: Float) {
        physicsEngine.setPosition(x, y)
    }
}
