# GitGotchi Android - System-Wide Overlay Pet 🐾

A **native Android app** featuring a **system-wide floating overlay** - a living pet that exists ON TOP of everything on your phone. The pet ropeswings across Instagram, skateboards over your texts, does happy dances on your home screen. Always visible, always alive, absolutely mind-blowing to show off.

## 🌟 Key Features

### System-Wide Overlay (THE KEY FEATURE)
- **Lives on your screen 24/7** - Switch apps? Still there. Browse Instagram? Swinging across.
- Uses Android's `SYSTEM_ALERT_WINDOW` permission
- Renders on top of ALL other apps
- Touch pass-through (doesn't block app interactions)
- Draggable by user

### Physics & Movement System
- **Rope Swinging**: Realistic pendulum physics, attach to screen edges
- **Skateboarding**: Roll along navigation bar with accelerometer tilt control
- **Walking/Roaming**: Idle wandering with random direction changes
- **Gravity & Physics**: Proper physics simulation with screen edge bouncing

### Animation States
The pet has numerous states including:
- Idle: stand, sit, sleep, look around
- Movement: walking, running, jumping, falling
- Skateboard: ride, kickflip, ollie, grind, crash
- Rope: swing, hang, climb, launch
- Emotions: happy dance, excited bounce, sad slump, waving, celebrating
- Working: typing (tiny laptop), thinking
- Special: surfing notification shade, hanging from status bar

### GitHub Integration & Agent Tracking
The pet reacts to your GitHub activity:
- Agent starts working → Pet pulls out tiny laptop
- Agent opens PR → Happy dance with confetti
- PR merged → CELEBRATION with fireworks
- CI passing → Thumbs up with sparkles
- CI failing → Sad slump with rain cloud
- Streak tracking affects pet mood

## 🏗️ Architecture

```
packages/mobile-android/
├── app/src/main/
│   ├── java/dev/gitgotchi/
│   │   ├── GitGotchiApp.kt          # Application entry point
│   │   ├── MainActivity.kt           # Main launcher activity
│   │   │
│   │   ├── overlay/
│   │   │   ├── OverlayService.kt    # THE CORE - System overlay service
│   │   │   ├── OverlayPermissionHelper.kt
│   │   │   ├── OverlayNotification.kt
│   │   │   └── BootReceiver.kt      # Auto-start on boot
│   │   │
│   │   ├── pet/
│   │   │   ├── GitGotchiView.kt     # Custom view with Canvas rendering
│   │   │   ├── PetRenderer.kt       # Draws pet on screen
│   │   │   ├── PetStateMachine.kt   # Manages animation states
│   │   │   └── PetState.kt          # State definitions
│   │   │
│   │   ├── physics/
│   │   │   ├── PhysicsEngine.kt     # Core physics with gravity
│   │   │   ├── RopePhysics.kt       # Pendulum swinging
│   │   │   └── SkateboardPhysics.kt # Rolling mechanics
│   │   │
│   │   ├── interaction/
│   │   │   └── TouchHandler.kt      # Tap, drag, fling gestures
│   │   │
│   │   ├── github/
│   │   │   ├── GitHubApiService.kt  # Retrofit API service
│   │   │   └── AgentTracker.kt      # Maps events to reactions
│   │   │
│   │   ├── settings/
│   │   │   ├── SettingsActivity.kt
│   │   │   └── CharacterSelectActivity.kt
│   │   │
│   │   └── widget/
│   │       └── PetWidgetProvider.kt # Home screen widget
│   │
│   ├── res/
│   │   ├── layout/                  # Activity layouts
│   │   ├── values/                  # Strings, colors, themes
│   │   └── xml/                     # Widget info, backup rules
│   │
│   └── AndroidManifest.xml          # Permissions & components
│
├── build.gradle.kts                 # App module build config
└── README.md                        # This file
```

## 📱 Android Requirements

- **Minimum SDK**: 26 (Android 8.0)
- **Target SDK**: 35 (Android 15)
- **Required Permissions**:
  - `SYSTEM_ALERT_WINDOW` - THE KEY PERMISSION for overlay
  - `FOREGROUND_SERVICE` - Keep overlay alive
  - `FOREGROUND_SERVICE_SPECIAL_USE` - Special use case
  - `INTERNET` - GitHub API access
  - `HIGH_SAMPLING_RATE_SENSORS` - Skateboard tilt mechanics
  - `RECEIVE_BOOT_COMPLETED` - Auto-start on boot

## 🚀 Getting Started

### Prerequisites
1. Android Studio (latest version)
2. Android SDK 35
3. Gradle 8.11+
4. Java 17+
5. Physical Android device (emulator has limited overlay support)

### Building the App

```bash
# Clone the repository (if not already done)
cd packages/mobile-android

# Build debug APK
./gradlew assembleDebug

# Build release APK
./gradlew assembleRelease

# Install on connected device
./gradlew installDebug
```

### Running on Device

1. Enable **Developer Options** on your Android device
2. Enable **USB Debugging**
3. Connect device via USB
4. Run from Android Studio or use: `./gradlew installDebug`
5. Grant overlay permission when prompted
6. Tap "Start Pet Overlay" to launch!

## 🎮 User Interactions

- **Tap** - Pet reacts (wave, jump, spin)
- **Double-tap** - Trigger special animation
- **Long press** - Open quick menu
- **Drag** - Pick up and move the pet
- **Fling** - Throw across screen with velocity

## 🔧 Development Status

### ✅ Implemented
- [x] Project structure and Gradle setup
- [x] AndroidManifest with all permissions
- [x] Core overlay service with SYSTEM_ALERT_WINDOW
- [x] Custom GitGotchiView with Canvas rendering
- [x] Physics engine with gravity and boundaries
- [x] Rope physics with pendulum mechanics
- [x] Skateboard physics with rolling
- [x] Touch handler for gestures
- [x] Pet state machine
- [x] GitHub API service interface
- [x] Agent tracker with event mappings
- [x] Settings activities
- [x] Widget provider
- [x] Boot receiver for auto-start

### 🚧 TODO (For Full Implementation)
- [x] **Procedural code-based rendering** - NO SPRITES NEEDED! Pure Canvas drawing
- [x] Animation controller with frame management
- [x] Particle system for effects (confetti, sparkles) ✅
- [x] Screen awareness (status bar, nav bar detection) ✅
- [ ] GitHub OAuth authentication flow
- [ ] Real-time GitHub activity polling
- [ ] Notification shade surfing
- [ ] Accelerometer integration for skateboard tilt
- [ ] Sound effects
- [ ] Battery optimization
- [ ] Character selection UI
- [ ] Full settings UI with SharedPreferences
- [ ] Widget implementation
- [ ] DataStore for persistent storage

## 🎨 100% Code-Based Rendering - NO SPRITES! 🎉

**Everything is drawn with pure code!** The pet is rendered entirely using Android Canvas API with procedural animations:

### Character Styles (All Procedural!)
- **Copilot** - GitHub blue blob with smooth animations
- **Octocat** - Dark themed with oval eyes
- **Robot** - Angular purple robot with square eyes
- **Pixel** - Retro pixel art style (drawn with code!)
- **Ghost** - Spooky translucent ghost

### Animations (All Code-Based!)
- ✅ **Idle Stand** - Gentle breathing motion
- ✅ **Idle Sit** - Squished down with legs
- ✅ **Walking** - Bouncing walk cycle with leg swing
- ✅ **Jumping** - Stretched body with arms up
- ✅ **Happy Dance** - Rotation with big eyes
- ✅ **Skateboarding** - Leaning on board with wheels
- ✅ **Rope Swing** - Hanging from rope looking up
- ✅ **Waving** - Arm wave animation
- ✅ **Celebrating** - Star eyes with confetti
- ✅ **Sad Slump** - Deflated with sad eyes
- ✅ **Working** - Tiny laptop with typing hands

### Procedural Effects
- ✅ **Particle System** - Confetti, sparkles, stars (all code!)
- ✅ **Smooth Transitions** - Tween-based state changes
- ✅ **Blinking** - Occasional eye blinks
- ✅ **Breathing** - Subtle size oscillation

**No image assets required!** Everything is calculated and drawn at runtime using math and Canvas primitives.

## 🔐 Permissions Explained

### SYSTEM_ALERT_WINDOW
This is **THE KEY PERMISSION** that makes GitGotchi special. It allows the app to draw on top of all other apps, creating the "always alive" pet experience.

**User grants this through**: Settings → Apps → Special app access → Display over other apps

### FOREGROUND_SERVICE
Keeps the overlay service running even when the app is in the background. This ensures the pet is always visible.

### RECEIVE_BOOT_COMPLETED
Allows the app to start automatically when the phone boots, so your pet is always there from the moment you unlock your phone.

## 📊 Performance Considerations

- **Target**: 60fps rendering (16ms frame time)
- **Battery**: Should use less than 5% daily
- **Memory**: Keep under 50MB
- **APK Size**: Target under 50MB

### Optimization Tips
- Use hardware acceleration (enabled in manifest)
- Implement viewport-based animation pausing
- Efficient sprite sheet rendering
- Minimal network requests (cache GitHub data)
- Background thread for physics calculations

## 🐛 Known Limitations

1. **Overlay limitations on some devices**: Some manufacturers (Xiaomi, Huawei) have additional overlay restrictions
2. **Battery drain**: Continuous rendering can impact battery on older devices
3. **Android 12+ restrictions**: Additional foreground service restrictions
4. **Emulator support**: Limited overlay support in Android emulators

## 📝 License

MIT License - Part of the GitGotchi monorepo

## 🤝 Contributing

This is part of the GitGotchi monorepo. See the root README for contribution guidelines.

## 🎯 Next Steps

1. **Add sprite sheets** to replace placeholder rendering
2. **Implement GitHub OAuth** for authentication
3. **Add accelerometer support** for skateboard tilt
4. **Create particle system** for visual effects
5. **Build character selection UI** with previews
6. **Implement DataStore** for persistent pet state
7. **Add sound effects** for actions
8. **Optimize battery usage** with smart pausing
9. **Test on various devices** and Android versions
10. **Create promotional materials** to showcase the experience

## 🌟 Show-Off Moments

When showing this to others, demonstrate:
1. **Rope swing entrance** from status bar
2. **App switch persistence** - pet stays visible
3. **Skateboard grind** along navigation bar
4. **The fling** - throw pet across screen
5. **Happy dance** when PR merges
6. **Touch interactions** - tap, drag, double-tap

---

**Remember**: This is not a normal app. This pet **lives on your screen 24/7**. That's what makes it magical! 🪄✨
