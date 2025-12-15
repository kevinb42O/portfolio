package dev.gitgotchi

import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import dev.gitgotchi.databinding.ActivityMainBinding
import dev.gitgotchi.overlay.OverlayPermissionHelper
import dev.gitgotchi.overlay.OverlayService
import dev.gitgotchi.settings.CharacterSelectActivity
import dev.gitgotchi.settings.SettingsActivity

class MainActivity : AppCompatActivity() {
    
    private lateinit var binding: ActivityMainBinding
    private lateinit var permissionHelper: OverlayPermissionHelper
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)
        
        permissionHelper = OverlayPermissionHelper(this)
        
        setupUI()
        updateOverlayButtonState()
    }
    
    private fun setupUI() {
        binding.btnStartOverlay.setOnClickListener {
            if (permissionHelper.hasOverlayPermission()) {
                toggleOverlay()
            } else {
                permissionHelper.requestOverlayPermission()
            }
        }
        
        binding.btnSettings.setOnClickListener {
            startActivity(Intent(this, SettingsActivity::class.java))
        }
        
        binding.btnCharacterSelect.setOnClickListener {
            startActivity(Intent(this, CharacterSelectActivity::class.java))
        }
    }
    
    private fun toggleOverlay() {
        if (OverlayService.isRunning) {
            stopOverlayService()
        } else {
            startOverlayService()
        }
        updateOverlayButtonState()
    }
    
    private fun startOverlayService() {
        val intent = Intent(this, OverlayService::class.java)
        startForegroundService(intent)
    }
    
    private fun stopOverlayService() {
        val intent = Intent(this, OverlayService::class.java)
        stopService(intent)
    }
    
    private fun updateOverlayButtonState() {
        binding.btnStartOverlay.text = if (OverlayService.isRunning) {
            getString(R.string.stop_overlay)
        } else {
            getString(R.string.start_overlay)
        }
    }
    
    override fun onResume() {
        super.onResume()
        updateOverlayButtonState()
    }
}
