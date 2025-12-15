package dev.gitgotchi.settings

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import dev.gitgotchi.R

/**
 * Character selection screen.
 * Allows user to choose between Copilot, Octocat, and Robot variants.
 */
class CharacterSelectActivity : AppCompatActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // For now, just show a simple layout
        // TODO: Implement character selection UI with preview
        setContentView(R.layout.activity_main) // Temporary
        
        supportActionBar?.apply {
            setDisplayHomeAsUpEnabled(true)
            title = getString(R.string.character_select)
        }
    }
    
    override fun onSupportNavigateUp(): Boolean {
        finish()
        return true
    }
}
