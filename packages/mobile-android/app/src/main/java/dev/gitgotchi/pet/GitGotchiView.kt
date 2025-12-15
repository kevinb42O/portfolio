package dev.gitgotchi.pet

import android.annotation.SuppressLint
import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.view.MotionEvent
import android.view.View
import dev.gitgotchi.interaction.TouchHandler
import dev.gitgotchi.physics.PhysicsEngine

/**
 * Custom View that renders the GitGotchi pet.
 * This is the actual pet that appears on screen - uses Canvas for custom drawing.
 */
class GitGotchiView(context: Context) : View(context) {
    
    private val physicsEngine = PhysicsEngine()
    private val touchHandler = TouchHandler(this)
    private val petRenderer = PetRenderer()
    private val petStateMachine = PetStateMachine()
    
    private val paint = Paint().apply {
        color = Color.parseColor("#58A6FF") // GitHub blue
        style = Paint.Style.FILL
        isAntiAlias = true
    }
    
    private val updateRunnable = object : Runnable {
        override fun run() {
            // Update physics (16ms = 60fps)
            physicsEngine.update(16f)
            
            // Update animation state
            petStateMachine.update(16f)
            
            // Redraw
            invalidate()
            
            // Schedule next update
            postDelayed(this, 16)
        }
    }
    
    init {
        // Set view size
        layoutParams = LayoutParams(200, 200)
        
        // Start update loop
        post(updateRunnable)
    }
    
    override fun onDraw(canvas: Canvas) {
        super.onDraw(canvas)
        
        // Get current pet position from physics engine
        val position = physicsEngine.getPosition()
        
        // Get current animation frame
        val currentFrame = petStateMachine.getCurrentFrame()
        
        // Render the pet
        petRenderer.draw(canvas, position, currentFrame, paint)
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
