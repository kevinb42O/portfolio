package dev.gitgotchi

import android.app.Application
import android.app.NotificationChannel
import android.app.NotificationManager
import android.os.Build

class GitGotchiApp : Application() {
    
    companion object {
        const val OVERLAY_NOTIFICATION_CHANNEL_ID = "gitgotchi_overlay"
        const val OVERLAY_NOTIFICATION_ID = 1001
    }
    
    override fun onCreate() {
        super.onCreate()
        createNotificationChannels()
    }
    
    private fun createNotificationChannels() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val overlayChannel = NotificationChannel(
                OVERLAY_NOTIFICATION_CHANNEL_ID,
                getString(R.string.overlay_channel_name),
                NotificationManager.IMPORTANCE_LOW
            ).apply {
                description = getString(R.string.overlay_channel_description)
                setShowBadge(false)
            }
            
            val notificationManager = getSystemService(NotificationManager::class.java)
            notificationManager?.createNotificationChannel(overlayChannel)
        }
    }
}
