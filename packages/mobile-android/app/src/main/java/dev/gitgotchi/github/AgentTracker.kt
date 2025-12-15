package dev.gitgotchi.github

import dev.gitgotchi.pet.PetState

/**
 * Tracks GitHub Copilot / Agent activity and maps to pet reactions.
 * This is what makes the pet react to your coding and GitHub activity!
 */
class AgentTracker {
    
    /**
     * Map agent events to pet reactions
     */
    fun getReactionForEvent(event: AgentEvent): PetState {
        return when (event) {
            AgentEvent.AGENT_STARTS_WORKING -> PetState.WORKING_TYPING
            AgentEvent.AGENT_OPENS_PR -> PetState.HAPPY_DANCE
            AgentEvent.AGENT_NEEDS_REVIEW -> PetState.WAVING
            AgentEvent.AGENT_PR_MERGED -> PetState.CELEBRATING
            AgentEvent.AGENT_STUCK_ERROR -> PetState.SAD_SLUMP
            AgentEvent.CI_PASSING -> PetState.EXCITED_BOUNCE
            AgentEvent.CI_FAILING -> PetState.SAD_SLUMP
            AgentEvent.COMMIT_PUSHED -> PetState.HAPPY_DANCE
            AgentEvent.ISSUE_OPENED -> PetState.WORKING_TYPING
            AgentEvent.ISSUE_CLOSED -> PetState.CELEBRATING
        }
    }
    
    /**
     * Get reaction for streak status
     */
    fun getReactionForStreak(status: StreakStatus): PetState {
        return when (status) {
            StreakStatus.STREAK_ALIVE -> PetState.HAPPY_DANCE
            StreakStatus.STREAK_AT_RISK -> PetState.WAVING // Trying to get attention
            StreakStatus.STREAK_BROKEN -> PetState.SAD_SLUMP
            StreakStatus.NEW_MILESTONE -> PetState.CELEBRATING
        }
    }
}

/**
 * GitHub agent events that trigger pet reactions
 */
enum class AgentEvent {
    AGENT_STARTS_WORKING,
    AGENT_OPENS_PR,
    AGENT_NEEDS_REVIEW,
    AGENT_PR_MERGED,
    AGENT_STUCK_ERROR,
    CI_PASSING,
    CI_FAILING,
    COMMIT_PUSHED,
    ISSUE_OPENED,
    ISSUE_CLOSED
}

/**
 * Commit streak status
 */
enum class StreakStatus {
    STREAK_ALIVE,
    STREAK_AT_RISK,
    STREAK_BROKEN,
    NEW_MILESTONE
}
