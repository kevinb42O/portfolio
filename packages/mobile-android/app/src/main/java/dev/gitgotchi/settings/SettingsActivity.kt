package dev.gitgotchi.settings

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import dev.gitgotchi.R

/**
 * Settings screen for configuring GitGotchi behavior.
 */
class SettingsActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // For now, just show a simple layout
        // TODO: Implement full settings UI with preferences
        setContentView(R.layout.activity_main) // Temporary
        
        supportActionBar?.apply {
            setDisplayHomeAsUpEnabled(true)
            title = getString(R.string.settings)
        }
    }
    
    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
