# GitGotchi Android - Implementation Guide 🚀

## Quick Start: Building & Running

### 1. Prerequisites Check
```bash
# Check Java version (need 17+)
java -version

# Check Android SDK installation
echo $ANDROID_HOME

# Install if missing:
# Download Android Studio from https://developer.android.com/studio
```

### 2. Build the Project
```bash
cd packages/mobile-android

# Build debug APK
./gradlew assembleDebug

# The APK will be at:
# app/build/outputs/apk/debug/app-debug.apk
```

### 3. Install on Device
```bash
# Connect Android device via USB
# Enable USB Debugging in Developer Options

# Install
./gradlew installDebug

# Or manually:
adb install app/build/outputs/apk/debug/app-debug.apk
```

### 4. Grant Overlay Permission
1. Open GitGotchi app
2. Tap "Start Pet Overlay"
3. System will prompt for "Display over other apps" permission
4. Toggle permission ON
5. Return to app
6. Tap "Start Pet Overlay" again
7. **Your pet is now alive!** 🎉

---

## Understanding the Architecture

### The Overlay System (THE MAGIC)

```kotlin
// This is what makes the pet live on your screen 24/7:
WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY
```

**How it works:**
1. `OverlayService` runs as a foreground service
2. Creates a `WindowManager.LayoutParams` with `TYPE_APPLICATION_OVERLAY`
3. Adds `GitGotchiView` to `WindowManager`
4. View renders on top of ALL apps
5. Touch events pass through to apps below (unless touching the pet)

### The Rendering Loop

```
Every 16ms (60fps):
1. PhysicsEngine.update()
   ├─ Apply gravity
   ├─ Update velocity
   └─ Check boundaries

2. PetStateMachine.update()
   ├─ Update animation timer
   └─ Advance frame if needed

3. GitGotchiView.invalidate()
   └─ Triggers onDraw()

4. PetRenderer.draw()
   ├─ Calculate animation values
   └─ Draw shapes with Canvas
```

### Procedural Animation System

**All animations are mathematical formulas!**

```kotlin
// Example: Breathing animation
val breathe = sin(time * 0.05f) * 3f
canvas.drawCircle(x, y + breathe, radius, paint)

// Example: Walking bounce
val bounce = abs(sin(time * 0.15f)) * 10f
val legSwing = sin(time * 0.15f) * 15f

// Example: Happy dance rotation
val rotation = sin(time * 0.3f) * 0.3f
canvas.rotate(rotation * 180f / PI, x, y)
```

**No sprite sheets = smaller APK, infinite smoothness!**

---

## Core Components Deep Dive

### 1. OverlayService
**Purpose:** Keep the pet alive across all apps

**Key Methods:**
- `setupOverlay()` - Creates WindowManager params and adds view
- `getOverlayType()` - Returns correct window type for Android version
- `updatePosition(x, y)` - Moves the pet on screen

**Lifecycle:**
```
User taps "Start" → startForegroundService()
→ onCreate() → setupOverlay()
→ Service runs indefinitely
→ User taps "Stop" → onDestroy() → removeView()
```

### 2. GitGotchiView
**Purpose:** Custom view that renders and updates the pet

**Key Components:**
- `PhysicsEngine` - Handles movement and collisions
- `PetStateMachine` - Manages animation states
- `PetRenderer` - Draws the pet
- `TouchHandler` - Processes user interactions
- `updateRunnable` - 60fps update loop

**Touch Handling:**
```
User touches screen
→ onTouchEvent()
→ TouchHandler.handleTouch()
→ GestureDetector processes
→ Execute action (tap/drag/fling)
```

### 3. PetRenderer
**Purpose:** Draw everything using pure code

**Drawing Primitives Used:**
- `drawCircle()` - Body, eyes, limbs
- `drawRoundRect()` - Squished/sitting poses
- `drawPath()` - Smiles, stars, custom shapes
- `drawLine()` - Rope, limbs, details

**Animation States Implemented:**
- Idle Stand, Idle Sit
- Walking, Jumping
- Happy Dance, Celebrating
- Skateboarding, Rope Swing
- Waving, Working (with tiny laptop!)
- Sad Slump

### 4. PhysicsEngine
**Purpose:** Realistic movement and collisions

**Features:**
- Gravity simulation
- Velocity-based movement
- Screen boundary collision with bounce
- Friction/damping
- Force application (for flings)

**Usage:**
```kotlin
physicsEngine.update(16f) // Every frame
physicsEngine.applyForce(velocityX, velocityY) // Fling
physicsEngine.setPosition(x, y) // Teleport
```

### 5. TouchHandler
**Purpose:** Handle all user interactions

**Gestures Supported:**
- **Single Tap:** Pet reacts (wave, jump, bounce)
- **Double Tap:** Happy dance
- **Long Press:** Celebrate
- **Drag:** Move pet around
- **Fling:** Throw pet across screen

**Adding Custom Gestures:**
```kotlin
override fun onSingleTapConfirmed(e: MotionEvent): Boolean {
    // Add your custom reaction here
    gitGotchiView.setPetState(PetState.YOUR_STATE)
    return true
}
```

---

## Adding New Animations

### Step 1: Add State to PetState.kt
```kotlin
enum class PetState {
    // ... existing states ...
    MY_CUSTOM_STATE
}
```

### Step 2: Create Drawing Function in PetRenderer.kt
```kotlin
private fun drawMyCustomAnimation(canvas: Canvas, pos: PointF, time: Float) {
    // Use sin/cos for smooth oscillations
    val wobble = sin(time * 0.2f) * 10f
    
    // Draw body
    canvas.drawCircle(pos.x, pos.y + wobble, 45f, bodyPaint)
    
    // Draw eyes
    canvas.drawCircle(pos.x - 15f, pos.y - 10f + wobble, 8f, eyePaint)
    canvas.drawCircle(pos.x + 15f, pos.y - 10f + wobble, 8f, eyePaint)
    
    // Add your custom elements
    // ...
}
```

### Step 3: Add to draw() Switch Statement
```kotlin
fun draw(canvas: Canvas, position: PointF, frame: Int, paint: Paint, state: PetState) {
    when (state) {
        // ... existing cases ...
        PetState.MY_CUSTOM_STATE -> drawMyCustomAnimation(canvas, position, animationTime)
    }
}
```

### Step 4: Trigger the Animation
```kotlin
// From anywhere:
gitGotchiView.setPetState(PetState.MY_CUSTOM_STATE)

// Or map to GitHub event:
AgentEvent.MY_EVENT -> PetState.MY_CUSTOM_STATE
```

---

## GitHub Integration

### Setting Up OAuth

1. **Create GitHub OAuth App:**
   - Go to GitHub Settings → Developer settings → OAuth Apps
   - Click "New OAuth App"
   - Set callback URL: `gitgotchi://oauth/callback`
   - Copy Client ID and Client Secret

2. **Add to GitHubAuthManager.kt:**
```kotlin
companion object {
    private const val CLIENT_ID = "your_client_id_here"
    private const val CLIENT_SECRET = "your_client_secret_here"
}
```

3. **Add Intent Filter to AndroidManifest.xml:**
```xml
<activity android:name=".OAuthCallbackActivity">
    <intent-filter>
        <action android:name="android.intent.action.VIEW" />
        <category android:name="android.intent.category.DEFAULT" />
        <category android:name="android.intent.category.BROWSABLE" />
        <data android:scheme="gitgotchi"
              android:host="oauth"
              android:pathPrefix="/callback" />
    </intent-filter>
</activity>
```

### Monitoring GitHub Activity

```kotlin
// Start monitoring
val monitor = ActivityMonitor(context, authManager)
monitor.startMonitoring(intervalMinutes = 15)

// Check streak
val streak = monitor.getCurrentStreak()
val status = monitor.getStreakStatus()

// Map to pet reaction
val petState = agentTracker.getReactionForStreak(status)
gitGotchiView.setPetState(petState)
```

---

## Performance Optimization

### Battery Usage
The pet uses minimal battery because:
- Only redraws when visible
- 60fps is lightweight for modern devices
- No heavy computations
- Efficient Canvas rendering

### Reducing Battery Impact:
```kotlin
// Pause updates when screen is off
override fun onScreenOff() {
    removeCallbacks(updateRunnable)
}

// Resume when screen on
override fun onScreenOn() {
    post(updateRunnable)
}
```

### Memory Management
- Single View instance (200x200px)
- Paint objects reused
- No bitmap allocations (pure code!)
- Garbage collection friendly

---

## Testing Checklist

### Basic Functionality
- [ ] App launches without crashing
- [ ] Overlay permission dialog appears
- [ ] Pet appears after granting permission
- [ ] Pet is visible over other apps
- [ ] Pet doesn't block app interactions
- [ ] Can drag pet around screen
- [ ] Tap makes pet react
- [ ] Double-tap triggers dance

### Physics
- [ ] Pet bounces off screen edges
- [ ] Gravity works correctly
- [ ] Fling throws pet with velocity
- [ ] Pet stays within screen bounds

### Animations
- [ ] Idle breathing is smooth
- [ ] Walking has bounce and leg swing
- [ ] Happy dance rotates and bounces
- [ ] Skateboard shows board and wheels
- [ ] Rope swing shows rope
- [ ] All states render correctly

### GitHub Integration
- [ ] OAuth flow works
- [ ] Can fetch user data
- [ ] Streak calculation correct
- [ ] Pet reacts to events

### Edge Cases
- [ ] Works on different screen sizes
- [ ] Handles orientation changes
- [ ] Survives app switches
- [ ] Auto-starts after boot
- [ ] Works with gestures disabled
- [ ] Service restarts if killed

---

## Troubleshooting

### Pet Not Appearing
1. Check overlay permission granted
2. Check service is running: `adb shell dumpsys activity services | grep GitGotchi`
3. Check logcat: `adb logcat | grep GitGotchi`

### Rendering Issues
1. Enable hardware acceleration in manifest
2. Check Canvas drawing code for errors
3. Verify view dimensions: `layoutParams = LayoutParams(200, 200)`

### Touch Not Working
1. Check FLAG_NOT_FOCUSABLE is set
2. Verify touch pass-through
3. Test with simple onTouchEvent log

### Service Killed by System
1. Ensure foreground service notification
2. Check battery optimization whitelist
3. Verify START_STICKY in onStartCommand

---

## Next Steps & Future Enhancements

### Phase 1: Core Polish
- [ ] Add more character styles
- [ ] Implement character selection UI
- [ ] Add sound effects
- [ ] Improve particle effects

### Phase 2: Advanced Features
- [ ] Notification shade surfing
- [ ] Accelerometer skateboard tilt
- [ ] Pet personality AI (mood changes)
- [ ] Multiple pets on screen

### Phase 3: Social Features
- [ ] Share pet screenshots
- [ ] Pet trading/gifting
- [ ] Leaderboards for streaks
- [ ] Pet evolution system

### Phase 4: Customization
- [ ] Custom colors
- [ ] Accessories (hats, glasses)
- [ ] Size adjustment
- [ ] Animation speed control

---

## Contributing

Want to add new animations or features?

1. Fork the repo
2. Add your animation to `PetRenderer.kt`
3. Test on real device
4. Submit PR with demo video
5. Make sure it's 100% code-based!

---

## Resources

- **Android Overlay Docs:** https://developer.android.com/reference/android/view/WindowManager.LayoutParams#TYPE_APPLICATION_OVERLAY
- **Canvas Drawing:** https://developer.android.com/reference/android/graphics/Canvas
- **Foreground Services:** https://developer.android.com/guide/components/foreground-services
- **GitHub API:** https://docs.github.com/en/rest

---

**Remember:** This pet lives on your screen 24/7. That's the magic! 🪄✨

The key is the `TYPE_APPLICATION_OVERLAY` permission combined with a foreground service. Everything else is just making it look awesome with pure code! 🎨
