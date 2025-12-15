package dev.gitgotchi.overlay

import android.app.Service
import android.content.Intent
import android.graphics.PixelFormat
import android.os.Build
import android.os.IBinder
import android.view.Gravity
import android.view.WindowManager
import dev.gitgotchi.GitGotchiApp
import dev.gitgotchi.pet.GitGotchiView

/**
 * THE CORE SERVICE - Creates a system-wide overlay that persists across all apps.
 * This is what makes the pet "live on your screen 24/7".
 */
class OverlayService : Service() {
    
    companion object {
        var isRunning = false
            private set
    }
    
    private lateinit var windowManager: WindowManager
    private lateinit var gitGotchiView: GitGotchiView
    private lateinit var layoutParams: WindowManager.LayoutParams
    
    override fun onCreate() {
        super.onCreate()
        isRunning = true
        
        // Start as foreground service with notification
        val notification = OverlayNotification(this).createNotification()
        startForeground(GitGotchiApp.OVERLAY_NOTIFICATION_ID, notification)
        
        // Initialize the overlay
        setupOverlay()
    }
    
    private fun setupOverlay() {
        windowManager = getSystemService(WINDOW_SERVICE) as WindowManager
        gitGotchiView = GitGotchiView(this)
        
        // Configure overlay window parameters
        layoutParams = WindowManager.LayoutParams(
            WindowManager.LayoutParams.WRAP_CONTENT,
            WindowManager.LayoutParams.WRAP_CONTENT,
            getOverlayType(),
            WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE or
                    WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN or
                    WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS,
            PixelFormat.TRANSLUCENT
        ).apply {
            gravity = Gravity.TOP or Gravity.START
            x = 100
            y = 100
        }
        
        // Add the view to window manager
        windowManager.addView(gitGotchiView, layoutParams)
    }
    
    /**
     * Get the correct window type based on Android version
     */
    private fun getOverlayType(): Int {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            // Android 8.0+ requires TYPE_APPLICATION_OVERLAY
            WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
        } else {
            // Older versions use TYPE_PHONE
            @Suppress("DEPRECATION")
            WindowManager.LayoutParams.TYPE_PHONE
        }
    }
    
    override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
        return START_STICKY // Restart service if killed by system
    }
    
    override fun onDestroy() {
        super.onDestroy()
        isRunning = false
        
        // Remove the overlay view
        if (::gitGotchiView.isInitialized) {
            windowManager.removeView(gitGotchiView)
        }
    }
    
    override fun onBind(intent: Intent?): IBinder? {
        return null // Not a bound service
    }
    
    /**
     * Update the position of the overlay
     */
    fun updatePosition(x: Int, y: Int) {
        if (::layoutParams.isInitialized) {
            layoutParams.x = x
            layoutParams.y = y
            windowManager.updateViewLayout(gitGotchiView, layoutParams)
        }
    }
}
