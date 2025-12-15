package dev.gitgotchi.interaction

import android.view.GestureDetector
import android.view.MotionEvent
import android.view.View
import dev.gitgotchi.pet.GitGotchiView
import dev.gitgotchi.pet.PetState

/**
 * Handles all touch interactions with the pet:
 * - Tap: Pet reacts (wave, jump, spin)
 * - Double-tap: Trigger special animation
 * - Long press: Open quick menu
 * - Drag: Move the pet
 * - Fling: Throw the pet across screen
 */
class TouchHandler(private val gitGotchiView: GitGotchiView) {
    
    private var lastX = 0f
    private var lastY = 0f
    private var isDragging = false
    
    private val gestureDetector = GestureDetector(
        gitGotchiView.context,
        object : GestureDetector.SimpleOnGestureListener() {
            
            override fun onSingleTapConfirmed(e: MotionEvent): Boolean {
                handleTap()
                return true
            }
            
            override fun onDoubleTap(e: MotionEvent): Boolean {
                handleDoubleTap()
                return true
            }
            
            override fun onLongPress(e: MotionEvent) {
                handleLongPress()
            }
            
            override fun onFling(
                e1: MotionEvent?,
                e2: MotionEvent,
                velocityX: Float,
                velocityY: Float
            ): Boolean {
                handleFling(velocityX, velocityY)
                return true
            }
        }
    )
    
    fun handleTouch(event: MotionEvent): Boolean {
        // Let gesture detector handle first
        gestureDetector.onTouchEvent(event)
        
        when (event.action) {
            MotionEvent.ACTION_DOWN -> {
                lastX = event.rawX
                lastY = event.rawY
                isDragging = true
                return true
            }
            
            MotionEvent.ACTION_MOVE -> {
                if (isDragging) {
                    val deltaX = event.rawX - lastX
                    val deltaY = event.rawY - lastY
                    
                    // Update position (parent service will handle actual move)
                    handleDrag(deltaX, deltaY)
                    
                    lastX = event.rawX
                    lastY = event.rawY
                    return true
                }
            }
            
            MotionEvent.ACTION_UP, MotionEvent.ACTION_CANCEL -> {
                isDragging = false
                return true
            }
        }
        
        return false
    }
    
    private fun handleTap() {
        // Pet reacts to tap
        val reactions = listOf(
            PetState.WAVING,
            PetState.JUMPING,
            PetState.EXCITED_BOUNCE
        )
        gitGotchiView.setPetState(reactions.random())
    }
    
    private fun handleDoubleTap() {
        // Trigger special animation
        gitGotchiView.setPetState(PetState.HAPPY_DANCE)
    }
    
    private fun handleLongPress() {
        // TODO: Open quick menu
        // For now, just celebrate
        gitGotchiView.setPetState(PetState.CELEBRATING)
    }
    
    private fun handleDrag(deltaX: Float, deltaY: Float) {
        // TODO: Notify parent service to update overlay position
        // For now, just update internal position
    }
    
    private fun handleFling(velocityX: Float, velocityY: Float) {
        // TODO: Apply velocity to physics engine
        // Pet should fly across screen and bounce off edges
    }
}
