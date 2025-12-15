package dev.gitgotchi.github

import android.content.Context
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.delay
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.text.SimpleDateFormat
import java.util.*

/**
 * Monitors GitHub activity and calculates commit streaks.
 * Polls GitHub API periodically to track user activity.
 */
class ActivityMonitor(
    private val context: Context,
    private val authManager: GitHubAuthManager
) {
    
    private val scope = CoroutineScope(Dispatchers.IO + Job())
    private var monitoringJob: Job? = null
    
    private val retrofit = Retrofit.Builder()
        .baseUrl("https://api.github.com/")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
    
    private val apiService = retrofit.create(GitHubApiService::class.java)
    
    private var currentStreak = 0
    private var lastCommitDate: Date? = null
    
    /**
     * Start monitoring GitHub activity
     */
    fun startMonitoring(intervalMinutes: Long = 15) {
        monitoringJob?.cancel()
        monitoringJob = scope.launch {
            while (isActive) {
                checkActivity()
                delay(intervalMinutes * 60 * 1000) // Convert minutes to milliseconds
            }
        }
    }
    
    /**
     * Stop monitoring
     */
    fun stopMonitoring() {
        monitoringJob?.cancel()
        monitoringJob = null
    }
    
    /**
     * Check GitHub activity
     */
    private suspend fun checkActivity() {
        val token = authManager.getAccessToken() ?: return
        
        try {
            // Fetch user data
            val userResponse = apiService.getCurrentUser("Bearer $token")
            if (!userResponse.isSuccessful) return
            
            val user = userResponse.body() ?: return
            
            // Fetch recent commits across all repos
            val reposResponse = apiService.getUserRepos("Bearer $token")
            if (!reposResponse.isSuccessful) return
            
            val repos = reposResponse.body() ?: emptyList()
            
            // Check for today's commits
            val today = Calendar.getInstance()
            var hasCommitToday = false
            
            for (repo in repos.take(10)) { // Check first 10 repos
                val commitsResponse = apiService.getCommits(
                    "Bearer $token",
                    user.login,
                    repo.name
                )
                
                if (commitsResponse.isSuccessful) {
                    val commits = commitsResponse.body() ?: emptyList()
                    
                    // Check if any commit is from today
                    commits.forEach { commit ->
                        val commitDate = parseDate(commit.commit.author.date)
                        if (commitDate != null && isSameDay(commitDate, today.time)) {
                            hasCommitToday = true
                        }
                    }
                }
            }
            
            // Update streak
            updateStreak(hasCommitToday)
            
        } catch (e: Exception) {
            // Handle error silently
            e.printStackTrace()
        }
    }
    
    /**
     * Update commit streak
     */
    private fun updateStreak(hasCommitToday: Boolean) {
        val today = Calendar.getInstance().time
        
        if (hasCommitToday) {
            if (lastCommitDate == null || isConsecutiveDay(lastCommitDate!!, today)) {
                currentStreak++
            } else {
                currentStreak = 1
            }
            lastCommitDate = today
        } else {
            // Check if streak is broken (more than 1 day since last commit)
            if (lastCommitDate != null && daysBetween(lastCommitDate!!, today) > 1) {
                currentStreak = 0
            }
        }
    }
    
    /**
     * Get current commit streak
     */
    fun getCurrentStreak(): Int = currentStreak
    
    /**
     * Get streak status
     */
    fun getStreakStatus(): StreakStatus {
        return when {
            currentStreak == 0 -> StreakStatus.STREAK_BROKEN
            currentStreak >= 30 -> StreakStatus.NEW_MILESTONE
            isStreakAtRisk() -> StreakStatus.STREAK_AT_RISK
            else -> StreakStatus.STREAK_ALIVE
        }
    }
    
    /**
     * Check if streak is at risk (no commit today and close to deadline)
     */
    private fun isStreakAtRisk(): Boolean {
        val now = Calendar.getInstance()
        val hourOfDay = now.get(Calendar.HOUR_OF_DAY)
        
        // At risk if it's after 6 PM and no commit today
        return hourOfDay >= 18 && lastCommitDate?.let { 
            !isSameDay(it, now.time) 
        } ?: true
    }
    
    // Helper functions
    private fun parseDate(dateString: String): Date? {
        return try {
            val format = SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss'Z'", Locale.US)
            format.parse(dateString)
        } catch (e: Exception) {
            null
        }
    }
    
    private fun isSameDay(date1: Date, date2: Date): Boolean {
        val cal1 = Calendar.getInstance().apply { time = date1 }
        val cal2 = Calendar.getInstance().apply { time = date2 }
        return cal1.get(Calendar.YEAR) == cal2.get(Calendar.YEAR) &&
               cal1.get(Calendar.DAY_OF_YEAR) == cal2.get(Calendar.DAY_OF_YEAR)
    }
    
    private fun isConsecutiveDay(date1: Date, date2: Date): Boolean {
        return daysBetween(date1, date2) == 1
    }
    
    private fun daysBetween(date1: Date, date2: Date): Long {
        val diff = date2.time - date1.time
        return diff / (24 * 60 * 60 * 1000)
    }
}
