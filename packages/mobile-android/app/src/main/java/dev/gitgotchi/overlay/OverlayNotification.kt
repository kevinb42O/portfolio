package dev.gitgotchi.overlay

import android.app.Notification
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import androidx.core.app.NotificationCompat
import dev.gitgotchi.GitGotchiApp
import dev.gitgotchi.MainActivity
import dev.gitgotchi.R

/**
 * Creates and manages the foreground service notification.
 * Required to keep the overlay service running in the background.
 */
class OverlayNotification(private val context: Context) {
    
    fun createNotification(): Notification {
        val notificationIntent = Intent(context, MainActivity::class.java)
        val pendingIntent = PendingIntent.getActivity(
            context,
            0,
            notificationIntent,
            PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
        )
        
        return NotificationCompat.Builder(context, GitGotchiApp.OVERLAY_NOTIFICATION_CHANNEL_ID)
            .setContentTitle(context.getString(R.string.overlay_notification_title))
            .setContentText(context.getString(R.string.overlay_notification_content))
            .setSmallIcon(android.R.drawable.ic_dialog_info) // TODO: Replace with custom icon
            .setContentIntent(pendingIntent)
            .setOngoing(true)
            .setCategory(NotificationCompat.CATEGORY_SERVICE)
            .setPriority(NotificationCompat.PRIORITY_LOW)
            .setShowWhen(false)
            .build()
    }
}
