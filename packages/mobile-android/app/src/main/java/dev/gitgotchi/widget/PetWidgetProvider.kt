package dev.gitgotchi.widget

import android.appwidget.AppWidgetManager
import android.appwidget.AppWidgetProvider
import android.content.Context
import android.widget.RemoteViews
import dev.gitgotchi.R

/**
 * Home screen widget for GitGotchi.
 * Shows pet status at a glance.
 */
class PetWidgetProvider : AppWidgetProvider() {
    
    override fun onUpdate(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetIds: IntArray
    ) {
        // Update each widget instance
        for (appWidgetId in appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId)
        }
    }
    
    private fun updateAppWidget(
        context: Context,
        appWidgetManager: AppWidgetManager,
        appWidgetId: Int
    ) {
        // Create RemoteViews for widget
        val views = RemoteViews(context.packageName, R.layout.widget_pet)
        
        // Update widget content
        views.setTextViewText(R.id.widgetPetName, context.getString(R.string.app_name))
        
        // Tell the AppWidgetManager to update the widget
        appWidgetManager.updateAppWidget(appWidgetId, views)
    }
    
    override fun onEnabled(context: Context) {
        // First widget added
    }
    
    override fun onDisabled(context: Context) {
        // Last widget removed
    }
}
