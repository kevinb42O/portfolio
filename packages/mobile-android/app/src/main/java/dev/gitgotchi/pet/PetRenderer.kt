package dev.gitgotchi.pet

import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.PointF

/**
 * Renders the pet on screen using Canvas.
 * For now, uses simple shapes - will be replaced with sprite sheets.
 */
class PetRenderer {
    
    fun draw(canvas: Canvas, position: PointF, frame: Int, paint: Paint) {
        // For now, draw a simple circle as placeholder
        // TODO: Replace with sprite sheet rendering
        canvas.drawCircle(
            position.x,
            position.y,
            50f, // radius
            paint
        )
        
        // Draw eyes (simple representation)
        val eyePaint = Paint().apply {
            color = android.graphics.Color.WHITE
            style = Paint.Style.FILL
            isAntiAlias = true
        }
        
        canvas.drawCircle(position.x - 15f, position.y - 10f, 8f, eyePaint)
        canvas.drawCircle(position.x + 15f, position.y - 10f, 8f, eyePaint)
        
        // Draw pupils
        val pupilPaint = Paint().apply {
            color = android.graphics.Color.BLACK
            style = Paint.Style.FILL
            isAntiAlias = true
        }
        
        canvas.drawCircle(position.x - 15f, position.y - 10f, 4f, pupilPaint)
        canvas.drawCircle(position.x + 15f, position.y - 10f, 4f, pupilPaint)
    }
}
