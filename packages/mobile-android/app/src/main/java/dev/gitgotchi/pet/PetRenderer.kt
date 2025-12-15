package dev.gitgotchi.pet

import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Paint
import android.graphics.Path
import android.graphics.PointF
import android.graphics.RectF
import kotlin.math.abs
import kotlin.math.cos
import kotlin.math.sin

/**
 * Renders the pet on screen using Canvas with PURE CODE - no sprites needed!
 * Creates smooth, animated characters using procedural drawing.
 */
class PetRenderer {
    
    private var animationTime = 0f
    private val bodyPaint = Paint().apply {
        color = Color.parseColor("#58A6FF")
        style = Paint.Style.FILL
        isAntiAlias = true
    }
    
    private val eyePaint = Paint().apply {
        color = Color.WHITE
        style = Paint.Style.FILL
        isAntiAlias = true
    }
    
    private val pupilPaint = Paint().apply {
        color = Color.BLACK
        style = Paint.Style.FILL
        isAntiAlias = true
    }
    
    private val accentPaint = Paint().apply {
        color = Color.parseColor("#3FB950")
        style = Paint.Style.FILL
        isAntiAlias = true
    }
    
    private val strokePaint = Paint().apply {
        color = Color.parseColor("#30363D")
        style = Paint.Style.STROKE
        strokeWidth = 3f
        isAntiAlias = true
    }
    
    fun draw(canvas: Canvas, position: PointF, frame: Int, paint: Paint, state: PetState = PetState.IDLE_STAND) {
        animationTime += 0.1f
        
        when (state) {
            PetState.IDLE_STAND -> drawIdleStand(canvas, position, animationTime)
            PetState.IDLE_SIT -> drawIdleSit(canvas, position, animationTime)
            PetState.WALKING, PetState.RUNNING -> drawWalking(canvas, position, animationTime)
            PetState.JUMPING -> drawJumping(canvas, position, animationTime)
            PetState.HAPPY_DANCE -> drawHappyDance(canvas, position, animationTime)
            PetState.SKATEBOARD_RIDE -> drawSkateboarding(canvas, position, animationTime)
            PetState.ROPE_SWING -> drawRopeSwing(canvas, position, animationTime)
            PetState.WAVING -> drawWaving(canvas, position, animationTime)
            PetState.CELEBRATING -> drawCelebrating(canvas, position, animationTime)
            PetState.SAD_SLUMP -> drawSadSlump(canvas, position, animationTime)
            PetState.WORKING_TYPING -> drawWorking(canvas, position, animationTime)
            else -> drawIdleStand(canvas, position, animationTime)
        }
    }
    
    /**
     * Idle standing animation - gentle breathing motion
     */
    private fun drawIdleStand(canvas: Canvas, pos: PointF, time: Float) {
        val breathe = sin(time * 0.05f) * 3f
        
        // Body (round blob with breathing)
        canvas.drawCircle(pos.x, pos.y + breathe, 45f, bodyPaint)
        
        // Eyes
        val eyeY = pos.y - 10f + breathe
        canvas.drawCircle(pos.x - 15f, eyeY, 8f, eyePaint)
        canvas.drawCircle(pos.x + 15f, eyeY, 8f, eyePaint)
        
        // Animated pupils (blink occasionally)
        val blinkFactor = if (time % 100f < 3f) 0.3f else 1f
        canvas.drawCircle(pos.x - 15f, eyeY, 4f * blinkFactor, pupilPaint)
        canvas.drawCircle(pos.x + 15f, eyeY, 4f * blinkFactor, pupilPaint)
        
        // Cute smile
        val smilePath = Path()
        smilePath.moveTo(pos.x - 15f, pos.y + 15f + breathe)
        smilePath.quadTo(pos.x, pos.y + 25f + breathe, pos.x + 15f, pos.y + 15f + breathe)
        canvas.drawPath(smilePath, strokePaint)
        
        // Little feet
        canvas.drawCircle(pos.x - 20f, pos.y + 40f, 8f, bodyPaint)
        canvas.drawCircle(pos.x + 20f, pos.y + 40f, 8f, bodyPaint)
    }
    
    /**
     * Sitting position
     */
    private fun drawIdleSit(canvas: Canvas, pos: PointF, time: Float) {
        val breathe = sin(time * 0.05f) * 2f
        
        // Body (squished down)
        val bodyRect = RectF(pos.x - 45f, pos.y - 10f + breathe, pos.x + 45f, pos.y + 50f + breathe)
        canvas.drawRoundRect(bodyRect, 40f, 40f, bodyPaint)
        
        // Eyes
        canvas.drawCircle(pos.x - 15f, pos.y + breathe, 8f, eyePaint)
        canvas.drawCircle(pos.x + 15f, pos.y + breathe, 8f, eyePaint)
        canvas.drawCircle(pos.x - 15f, pos.y + breathe, 4f, pupilPaint)
        canvas.drawCircle(pos.x + 15f, pos.y + breathe, 4f, pupilPaint)
    }
    
    /**
     * Walking animation - bouncing motion
     */
    private fun drawWalking(canvas: Canvas, pos: PointF, time: Float) {
        val bounce = abs(sin(time * 0.15f)) * 10f
        val legSwing = sin(time * 0.15f) * 15f
        
        // Body
        canvas.drawCircle(pos.x, pos.y - bounce, 45f, bodyPaint)
        
        // Eyes
        canvas.drawCircle(pos.x - 15f, pos.y - 10f - bounce, 8f, eyePaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 10f - bounce, 8f, eyePaint)
        canvas.drawCircle(pos.x - 15f, pos.y - 10f - bounce, 4f, pupilPaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 10f - bounce, 4f, pupilPaint)
        
        // Animated legs
        canvas.drawCircle(pos.x - 20f + legSwing, pos.y + 40f, 10f, bodyPaint)
        canvas.drawCircle(pos.x + 20f - legSwing, pos.y + 40f, 10f, bodyPaint)
    }
    
    /**
     * Jumping animation
     */
    private fun drawJumping(canvas: Canvas, pos: PointF, time: Float) {
        // Stretched body
        val bodyRect = RectF(pos.x - 35f, pos.y - 60f, pos.x + 35f, pos.y + 10f)
        canvas.drawRoundRect(bodyRect, 30f, 30f, bodyPaint)
        
        // Excited eyes
        canvas.drawCircle(pos.x - 15f, pos.y - 30f, 10f, eyePaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 30f, 10f, eyePaint)
        canvas.drawCircle(pos.x - 15f, pos.y - 30f, 5f, pupilPaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 30f, 5f, pupilPaint)
        
        // Arms up!
        canvas.drawCircle(pos.x - 50f, pos.y - 40f, 12f, accentPaint)
        canvas.drawCircle(pos.x + 50f, pos.y - 40f, 12f, accentPaint)
    }
    
    /**
     * Happy dance - rotation and bouncing
     */
    private fun drawHappyDance(canvas: Canvas, pos: PointF, time: Float) {
        val bounce = abs(sin(time * 0.25f)) * 15f
        val rotation = sin(time * 0.3f) * 0.3f
        
        canvas.save()
        canvas.rotate((rotation * 180f / Math.PI).toFloat(), pos.x, pos.y)
        
        // Excited body
        canvas.drawCircle(pos.x, pos.y - bounce, 45f, bodyPaint)
        
        // Big happy eyes
        canvas.drawCircle(pos.x - 15f, pos.y - 10f - bounce, 10f, eyePaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 10f - bounce, 10f, eyePaint)
        canvas.drawCircle(pos.x - 15f, pos.y - 10f - bounce, 5f, pupilPaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 10f - bounce, 5f, pupilPaint)
        
        // Happy mouth
        val mouthPath = Path()
        mouthPath.moveTo(pos.x - 20f, pos.y + 10f - bounce)
        mouthPath.quadTo(pos.x, pos.y + 25f - bounce, pos.x + 20f, pos.y + 10f - bounce)
        canvas.drawPath(mouthPath, strokePaint)
        
        canvas.restore()
    }
    
    /**
     * Skateboarding animation
     */
    private fun drawSkateboarding(canvas: Canvas, pos: PointF, time: Float) {
        val lean = sin(time * 0.2f) * 0.2f
        
        canvas.save()
        canvas.rotate((lean * 180f / Math.PI).toFloat(), pos.x, pos.y)
        
        // Body leaning forward
        canvas.drawCircle(pos.x, pos.y - 15f, 40f, bodyPaint)
        
        // Focused eyes
        canvas.drawCircle(pos.x - 12f, pos.y - 20f, 7f, eyePaint)
        canvas.drawCircle(pos.x + 12f, pos.y - 20f, 7f, eyePaint)
        canvas.drawCircle(pos.x - 12f, pos.y - 20f, 3f, pupilPaint)
        canvas.drawCircle(pos.x + 12f, pos.y - 20f, 3f, pupilPaint)
        
        // Skateboard
        val boardPaint = Paint().apply {
            color = Color.parseColor("#F85149")
            style = Paint.Style.FILL
            isAntiAlias = true
        }
        val boardRect = RectF(pos.x - 40f, pos.y + 25f, pos.x + 40f, pos.y + 35f)
        canvas.drawRoundRect(boardRect, 10f, 10f, boardPaint)
        
        // Wheels
        canvas.drawCircle(pos.x - 30f, pos.y + 35f, 5f, pupilPaint)
        canvas.drawCircle(pos.x + 30f, pos.y + 35f, 5f, pupilPaint)
        
        canvas.restore()
    }
    
    /**
     * Rope swinging animation
     */
    private fun drawRopeSwing(canvas: Canvas, pos: PointF, time: Float) {
        // Draw rope
        val ropePaint = Paint().apply {
            color = Color.parseColor("#8B4513")
            style = Paint.Style.STROKE
            strokeWidth = 4f
            isAntiAlias = true
        }
        canvas.drawLine(pos.x, pos.y - 200f, pos.x, pos.y - 50f, ropePaint)
        
        // Hanging body
        canvas.drawCircle(pos.x, pos.y, 45f, bodyPaint)
        
        // Eyes looking up at rope
        canvas.drawCircle(pos.x - 15f, pos.y - 15f, 8f, eyePaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 15f, 8f, eyePaint)
        canvas.drawCircle(pos.x - 15f, pos.y - 18f, 4f, pupilPaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 18f, 4f, pupilPaint)
        
        // Arms reaching up
        canvas.drawCircle(pos.x - 10f, pos.y - 40f, 10f, accentPaint)
        canvas.drawCircle(pos.x + 10f, pos.y - 40f, 10f, accentPaint)
    }
    
    /**
     * Waving animation
     */
    private fun drawWaving(canvas: Canvas, pos: PointF, time: Float) {
        val armWave = sin(time * 0.3f) * 30f
        
        // Body
        canvas.drawCircle(pos.x, pos.y, 45f, bodyPaint)
        
        // Friendly eyes
        canvas.drawCircle(pos.x - 15f, pos.y - 10f, 8f, eyePaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 10f, 8f, eyePaint)
        canvas.drawCircle(pos.x - 15f, pos.y - 10f, 4f, pupilPaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 10f, 4f, pupilPaint)
        
        // Waving arm
        canvas.drawCircle(pos.x + 50f, pos.y - 30f + armWave, 12f, accentPaint)
    }
    
    /**
     * Celebrating with confetti particles
     */
    private fun drawCelebrating(canvas: Canvas, pos: PointF, time: Float) {
        val bounce = abs(sin(time * 0.3f)) * 20f
        
        // Excited body
        canvas.drawCircle(pos.x, pos.y - bounce, 45f, bodyPaint)
        
        // Star eyes!
        drawStar(canvas, pos.x - 15f, pos.y - 10f - bounce, 8f, accentPaint)
        drawStar(canvas, pos.x + 15f, pos.y - 10f - bounce, 8f, accentPaint)
        
        // Big smile
        val mouthPath = Path()
        mouthPath.moveTo(pos.x - 20f, pos.y + 10f - bounce)
        mouthPath.quadTo(pos.x, pos.y + 30f - bounce, pos.x + 20f, pos.y + 10f - bounce)
        canvas.drawPath(mouthPath, strokePaint)
        
        // Arms raised
        canvas.drawCircle(pos.x - 50f, pos.y - 50f - bounce, 12f, accentPaint)
        canvas.drawCircle(pos.x + 50f, pos.y - 50f - bounce, 12f, accentPaint)
    }
    
    /**
     * Sad slump animation
     */
    private fun drawSadSlump(canvas: Canvas, pos: PointF, time: Float) {
        // Squished sad body
        val bodyRect = RectF(pos.x - 50f, pos.y, pos.x + 50f, pos.y + 60f)
        canvas.drawRoundRect(bodyRect, 40f, 40f, bodyPaint)
        
        // Sad eyes
        canvas.drawCircle(pos.x - 15f, pos.y + 15f, 8f, eyePaint)
        canvas.drawCircle(pos.x + 15f, pos.y + 15f, 8f, eyePaint)
        canvas.drawCircle(pos.x - 15f, pos.y + 18f, 4f, pupilPaint)
        canvas.drawCircle(pos.x + 15f, pos.y + 18f, 4f, pupilPaint)
        
        // Sad mouth (upside down smile)
        val sadPath = Path()
        sadPath.moveTo(pos.x - 15f, pos.y + 35f)
        sadPath.quadTo(pos.x, pos.y + 25f, pos.x + 15f, pos.y + 35f)
        canvas.drawPath(sadPath, strokePaint)
    }
    
    /**
     * Working/typing animation - with tiny laptop!
     */
    private fun drawWorking(canvas: Canvas, pos: PointF, time: Float) {
        val typing = if (time.toInt() % 2 == 0) 2f else -2f
        
        // Body slightly hunched
        canvas.drawCircle(pos.x, pos.y - 5f, 42f, bodyPaint)
        
        // Focused eyes looking down
        canvas.drawCircle(pos.x - 15f, pos.y - 5f, 7f, eyePaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 5f, 7f, eyePaint)
        canvas.drawCircle(pos.x - 15f, pos.y - 2f, 3f, pupilPaint)
        canvas.drawCircle(pos.x + 15f, pos.y - 2f, 3f, pupilPaint)
        
        // Tiny laptop
        val laptopPaint = Paint().apply {
            color = Color.parseColor("#30363D")
            style = Paint.Style.FILL
            isAntiAlias = true
        }
        val laptop = RectF(pos.x - 25f, pos.y + 20f, pos.x + 25f, pos.y + 35f)
        canvas.drawRoundRect(laptop, 3f, 3f, laptopPaint)
        
        // Screen
        val screenPaint = Paint().apply {
            color = Color.parseColor("#58A6FF")
            style = Paint.Style.FILL
            isAntiAlias = true
        }
        val screen = RectF(pos.x - 22f, pos.y + 22f, pos.x + 22f, pos.y + 33f)
        canvas.drawRoundRect(screen, 2f, 2f, screenPaint)
        
        // Typing hands
        canvas.drawCircle(pos.x - 20f + typing, pos.y + 30f, 6f, accentPaint)
        canvas.drawCircle(pos.x + 20f - typing, pos.y + 30f, 6f, accentPaint)
    }
    
    /**
     * Helper to draw a star shape
     */
    private fun drawStar(canvas: Canvas, x: Float, y: Float, size: Float, paint: Paint) {
        val path = Path()
        for (i in 0..4) {
            val angle = (i * 144 - 90) * Math.PI / 180
            val px = x + size * cos(angle).toFloat()
            val py = y + size * sin(angle).toFloat()
            if (i == 0) path.moveTo(px, py) else path.lineTo(px, py)
        }
        path.close()
        canvas.drawPath(path, paint)
    }
    
}
