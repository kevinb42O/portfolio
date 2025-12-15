package dev.gitgotchi.pet

import android.graphics.Color

/**
 * Different character styles that can be selected.
 * Each has unique colors and shapes - all rendered procedurally with code!
 */
enum class CharacterStyle(
    val displayName: String,
    val primaryColor: Int,
    val accentColor: Int,
    val eyeStyle: EyeStyle
) {
    COPILOT(
        displayName = "GitHub Copilot",
        primaryColor = Color.parseColor("#58A6FF"), // GitHub blue
        accentColor = Color.parseColor("#3FB950"),  // GitHub green
        eyeStyle = EyeStyle.ROUND
    ),
    
    OCTOCAT(
        displayName = "Octocat",
        primaryColor = Color.parseColor("#24292F"), // GitHub dark
        accentColor = Color.parseColor("#F85149"),  // GitHub orange
        eyeStyle = EyeStyle.OVAL
    ),
    
    ROBOT(
        displayName = "Robot Buddy",
        primaryColor = Color.parseColor("#BC8CFF"), // Purple
        accentColor = Color.parseColor("#FFE66D"),  // Yellow
        eyeStyle = EyeStyle.SQUARE
    ),
    
    PIXEL(
        displayName = "Pixel Pal",
        primaryColor = Color.parseColor("#FF6B6B"), // Red/Pink
        accentColor = Color.parseColor("#4ECDC4"),  // Cyan
        eyeStyle = EyeStyle.PIXEL
    ),
    
    GHOST(
        displayName = "Code Ghost",
        primaryColor = Color.parseColor("#E0E0E0"), // Light gray
        accentColor = Color.parseColor("#9575CD"),  // Light purple
        eyeStyle = EyeStyle.SPOOKY
    );
    
    /**
     * Get a darker version of the primary color for outlines
     */
    fun getOutlineColor(): Int {
        return Color.parseColor("#30363D")
    }
}

/**
 * Different eye rendering styles
 */
enum class EyeStyle {
    ROUND,      // Classic circular eyes
    OVAL,       // Oval shaped eyes
    SQUARE,     // Robot-like square eyes
    PIXEL,      // Pixelated style
    SPOOKY      // Halloween ghost eyes
}

/**
 * Procedural shape variants for different body types
 */
enum class BodyShape {
    BLOB,       // Smooth circular blob
    ROUNDED,    // Rounded rectangle
    SQUARE,     // More angular
    TEARDROP,   // Teardrop shape
    CLOUD       // Cloud-like fluffy
}
