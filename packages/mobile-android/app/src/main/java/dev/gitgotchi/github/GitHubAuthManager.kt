package dev.gitgotchi.github

import android.content.Context
import android.content.Intent
import android.net.Uri
import androidx.browser.customtabs.CustomTabsIntent

/**
 * Manages GitHub OAuth authentication flow.
 * Uses Custom Tabs for secure OAuth login.
 */
class GitHubAuthManager(private val context: Context) {
    
    companion object {
        private const val CLIENT_ID = "YOUR_GITHUB_CLIENT_ID" // TODO: Add your client ID
        private const val REDIRECT_URI = "gitgotchi://oauth/callback"
        private const val AUTH_URL = "https://github.com/login/oauth/authorize"
        private const val TOKEN_URL = "https://github.com/login/oauth/access_token"
        
        private const val PREF_NAME = "github_auth"
        private const val PREF_TOKEN = "access_token"
    }
    
    private val prefs = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)
    
    /**
     * Start OAuth flow using Custom Tabs
     */
    fun startOAuthFlow(scope: String = "repo,user") {
        val authUri = Uri.parse(AUTH_URL)
            .buildUpon()
            .appendQueryParameter("client_id", CLIENT_ID)
            .appendQueryParameter("redirect_uri", REDIRECT_URI)
            .appendQueryParameter("scope", scope)
            .appendQueryParameter("state", generateState())
            .build()
        
        val customTabsIntent = CustomTabsIntent.Builder()
            .setShowTitle(true)
            .build()
        
        customTabsIntent.launchUrl(context, authUri)
    }
    
    /**
     * Handle OAuth callback
     */
    fun handleCallback(uri: Uri): Boolean {
        val code = uri.getQueryParameter("code") ?: return false
        val state = uri.getQueryParameter("state") ?: return false
        
        // TODO: Verify state matches
        // TODO: Exchange code for access token
        // For now, just save the code (in production, exchange for token)
        
        return true
    }
    
    /**
     * Save access token
     */
    fun saveAccessToken(token: String) {
        prefs.edit()
            .putString(PREF_TOKEN, token)
            .apply()
    }
    
    /**
     * Get saved access token
     */
    fun getAccessToken(): String? {
        return prefs.getString(PREF_TOKEN, null)
    }
    
    /**
     * Check if user is authenticated
     */
    fun isAuthenticated(): Boolean {
        return getAccessToken() != null
    }
    
    /**
     * Clear authentication
     */
    fun logout() {
        prefs.edit()
            .remove(PREF_TOKEN)
            .apply()
    }
    
    /**
     * Generate random state for OAuth security
     */
    private fun generateState(): String {
        return java.util.UUID.randomUUID().toString()
    }
}
