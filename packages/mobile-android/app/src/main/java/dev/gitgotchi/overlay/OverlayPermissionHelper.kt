package dev.gitgotchi.overlay

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.provider.Settings
import androidx.appcompat.app.AlertDialog
import dev.gitgotchi.R

/**
 * Helper class to manage SYSTEM_ALERT_WINDOW permission.
 * This is THE KEY PERMISSION that allows the pet to appear on top of all apps.
 */
class OverlayPermissionHelper(private val activity: Activity) {
    
    companion object {
        const val REQUEST_CODE_OVERLAY_PERMISSION = 2323
    }
    
    /**
     * Check if the app has overlay permission
     */
    fun hasOverlayPermission(): Boolean {
        return if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            Settings.canDrawOverlays(activity)
        } else {
            true // Permission not needed on older versions
        }
    }
    
    /**
     * Request overlay permission from the user
     */
    fun requestOverlayPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(activity)) {
                showPermissionRationaleDialog()
            }
        }
    }
    
    /**
     * Show a dialog explaining why we need the permission
     */
    private fun showPermissionRationaleDialog() {
        AlertDialog.Builder(activity)
            .setTitle(R.string.permission_overlay_title)
            .setMessage(R.string.permission_overlay_message)
            .setPositiveButton(R.string.permission_overlay_grant) { _, _ ->
                openOverlaySettings()
            }
            .setNegativeButton(android.R.string.cancel, null)
            .show()
    }
    
    /**
     * Open system settings for overlay permission
     */
    private fun openOverlaySettings() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val intent = Intent(
                Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                Uri.parse("package:${activity.packageName}")
            )
            activity.startActivityForResult(intent, REQUEST_CODE_OVERLAY_PERMISSION)
        }
    }
}
