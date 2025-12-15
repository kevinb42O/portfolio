package dev.gitgotchi.interaction

import android.content.Context
import android.content.res.Resources
import android.graphics.Rect
import android.util.DisplayMetrics
import android.view.WindowManager

/**
 * Provides awareness of screen features like status bar and navigation bar.
 * Allows pet to interact with these UI elements (hang from status bar, grind on nav bar).
 */
class ScreenAwareness(private val context: Context) {
    
    private val windowManager = context.getSystemService(Context.WINDOW_SERVICE) as WindowManager
    
    /**
     * Get the status bar height
     */
    fun getStatusBarHeight(): Int {
        val resourceId = context.resources.getIdentifier("status_bar_height", "dimen", "android")
        return if (resourceId > 0) {
            context.resources.getDimensionPixelSize(resourceId)
        } else {
            0
        }
    }
    
    /**
     * Get the navigation bar height
     */
    fun getNavigationBarHeight(): Int {
        val resourceId = context.resources.getIdentifier("navigation_bar_height", "dimen", "android")
        return if (resourceId > 0) {
            context.resources.getDimensionPixelSize(resourceId)
        } else {
            0
        }
    }
    
    /**
     * Get screen dimensions
     */
    fun getScreenDimensions(): Pair<Int, Int> {
        val displayMetrics = DisplayMetrics()
        @Suppress("DEPRECATION")
        windowManager.defaultDisplay.getMetrics(displayMetrics)
        return Pair(displayMetrics.widthPixels, displayMetrics.heightPixels)
    }
    
    /**
     * Get the status bar region
     */
    fun getStatusBarRegion(): Rect {
        val (width, _) = getScreenDimensions()
        val height = getStatusBarHeight()
        return Rect(0, 0, width, height)
    }
    
    /**
     * Get the navigation bar region (assumes bottom nav bar)
     */
    fun getNavigationBarRegion(): Rect {
        val (width, height) = getScreenDimensions()
        val navHeight = getNavigationBarHeight()
        return Rect(0, height - navHeight, width, height)
    }
    
    /**
     * Check if a point is in the status bar
     */
    fun isInStatusBar(x: Float, y: Float): Boolean {
        return getStatusBarRegion().contains(x.toInt(), y.toInt())
    }
    
    /**
     * Check if a point is in the navigation bar
     */
    fun isInNavigationBar(x: Float, y: Float): Boolean {
        return getNavigationBarRegion().contains(x.toInt(), y.toInt())
    }
    
    /**
     * Get safe insets (areas not covered by system UI)
     */
    fun getSafeInsets(): Rect {
        val statusBarHeight = getStatusBarHeight()
        val navBarHeight = getNavigationBarHeight()
        return Rect(0, statusBarHeight, 0, navBarHeight)
    }
}
