package dev.gitgotchi.animation

import android.graphics.Bitmap
import android.graphics.Rect

/**
 * Manages sprite sheet loading and frame extraction.
 * TODO: Implement actual sprite sheet loading from assets.
 */
class SpriteSheet(
    private val bitmap: Bitmap?,
    private val frameWidth: Int,
    private val frameHeight: Int
) {
    
    private val framesPerRow: Int
    private val totalFrames: Int
    
    init {
        framesPerRow = if (bitmap != null) bitmap.width / frameWidth else 0
        totalFrames = if (bitmap != null) (bitmap.width / frameWidth) * (bitmap.height / frameHeight) else 0
    }
    
    /**
     * Get the source rectangle for a specific frame
     */
    fun getFrameRect(frameIndex: Int): Rect {
        val row = frameIndex / framesPerRow
        val col = frameIndex % framesPerRow
        
        return Rect(
            col * frameWidth,
            row * frameHeight,
            (col + 1) * frameWidth,
            (row + 1) * frameHeight
        )
    }
    
    /**
     * Get the bitmap (if loaded)
     */
    fun getBitmap(): Bitmap? = bitmap
    
    /**
     * Get total number of frames
     */
    fun getTotalFrames(): Int = totalFrames
    
    companion object {
        /**
         * Load sprite sheet from assets
         * TODO: Implement actual asset loading
         */
        fun loadFromAssets(assetPath: String, frameWidth: Int, frameHeight: Int): SpriteSheet {
            // For now, return empty sprite sheet
            // In full implementation, use AssetManager to load bitmap
            return SpriteSheet(null, frameWidth, frameHeight)
        }
    }
}
