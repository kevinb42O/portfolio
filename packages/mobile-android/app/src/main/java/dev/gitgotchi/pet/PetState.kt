package dev.gitgotchi.pet

/**
 * Pet animation states - defines what the pet can do
 */
enum class PetState {
    // Idle states
    IDLE_STAND,
    IDLE_SIT,
    IDLE_SLEEP,
    IDLE_LOOK_AROUND,
    
    // Movement
    WALKING,
    RUNNING,
    JUMPING,
    FALLING,
    
    // Skateboard
    SKATEBOARD_RIDE,
    SKATEBOARD_KICKFLIP,
    SKATEBOARD_OLLIE,
    SKATEBOARD_GRIND,
    SKATEBOARD_CRASH,
    
    // Rope
    ROPE_SWING,
    ROPE_HANG,
    ROPE_CLIMB,
    ROPE_LAUNCH,
    
    // Emotions
    HAPPY_DANCE,
    EXCITED_BOUNCE,
    SAD_SLUMP,
    WORKING_TYPING,
    CELEBRATING,
    WAVING,
    
    // Special
    SURFING_NOTIFICATION_SHADE,
    HANGING_FROM_STATUS_BAR
}

/**
 * Pet mood states
 */
enum class Mood {
    ECSTATIC,
    HAPPY,
    CONTENT,
    HUNGRY,
    SAD,
    SLEEPY,
    EXCITED
}

/**
 * Pet personality and status
 */
data class PetPersonality(
    var mood: Mood = Mood.CONTENT,
    var energy: Float = 100f,      // 0-100
    var hunger: Float = 0f,         // 0-100, based on commit streak
    var experience: Int = 0,        // Total contributions
    var level: Int = 1              // Evolution level
)
