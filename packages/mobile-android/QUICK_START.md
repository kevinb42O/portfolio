# GitGotchi Android - Quick Start Guide 🚀

Get your system-wide overlay pet running in 5 minutes!

## 📋 Prerequisites

- Android Studio (latest version)
- Android device with USB debugging enabled
- Android 8.0 (API 26) or higher

## 🏃 Quick Setup

### 1. Open Project in Android Studio

```bash
# Navigate to the mobile-android package
cd packages/mobile-android

# Open in Android Studio
studio .
```

Or open Android Studio → File → Open → Select `packages/mobile-android`

### 2. Sync Gradle

Android Studio will automatically prompt to sync. If not:
- Click "Sync Now" in the notification bar
- Or: File → Sync Project with Gradle Files

### 3. Connect Your Device

1. Enable Developer Options on your Android device:
   - Settings → About Phone → Tap "Build Number" 7 times
   
2. Enable USB Debugging:
   - Settings → Developer Options → USB Debugging → ON
   
3. Connect via USB cable
   - Tap "Allow" when prompted on device

4. Verify connection:
   ```bash
   adb devices
   # Should show your device
   ```

### 4. Build & Install

**Option A: Android Studio**
- Click the green "Run" button (▶️) at the top
- Select your device
- Wait for build and install

**Option B: Command Line**
```bash
# Build and install in one command
./gradlew installDebug

# Or build then install manually
./gradlew assembleDebug
adb install app/build/outputs/apk/debug/app-debug.apk
```

### 5. Grant Overlay Permission

This is **THE KEY STEP** - without this, the pet can't appear!

1. Open GitGotchi app on your device
2. Tap "Start Pet Overlay"
3. You'll be redirected to Android settings
4. Find "GitGotchi" in the list
5. Toggle "Allow display over other apps" to **ON**
6. Press back to return to the app
7. Tap "Start Pet Overlay" again

**Your pet is now alive!** 🎉

### 6. Test It Out

- Open any app (Instagram, Chrome, Messages)
- The pet should be visible on top!
- Try:
  - **Tap** - Pet reacts
  - **Double tap** - Happy dance
  - **Drag** - Move pet around
  - **Fling** - Throw pet (bounces off edges!)

---

## 🎮 Using the App

### Main Screen Buttons

- **Start Pet Overlay** - Launches the overlay service
- **Stop Pet Overlay** - Stops the service
- **Settings** - Configure pet behavior
- **Choose Your Pet** - Select character style

### Interacting with Your Pet

| Action | Result |
|--------|--------|
| Single Tap | Pet waves/jumps/bounces |
| Double Tap | Happy dance animation |
| Long Press | Celebration with confetti |
| Drag | Move pet around screen |
| Fling | Throw pet (physics!) |

### Character Styles

Choose from 5 procedural character styles:
- 🤖 **GitHub Copilot** - Blue with round eyes
- 🐙 **Octocat** - Dark with oval eyes
- 🦾 **Robot Buddy** - Purple with square eyes
- 🎮 **Pixel Pal** - Retro pixel style
- 👻 **Code Ghost** - Spooky translucent

---

## 🔧 Troubleshooting

### Pet Not Appearing?

**Check overlay permission:**
```bash
# Command line check
adb shell dumpsys overlay | grep gitgotchi

# Or manually:
Settings → Apps → Special app access → Display over other apps
```

**Check service is running:**
```bash
adb shell dumpsys activity services | grep GitGotchi
```

**View logs:**
```bash
adb logcat | grep GitGotchi
```

### Build Errors?

**Gradle sync fails:**
- File → Invalidate Caches / Restart
- Clean build: `./gradlew clean`
- Check internet connection (for dependencies)

**SDK not found:**
- Tools → SDK Manager
- Install Android SDK 35
- Set ANDROID_HOME environment variable

### Device Issues?

**USB debugging not working:**
- Revoke USB debugging authorizations
- Reconnect cable
- Re-enable USB debugging

**Device not detected:**
```bash
# Kill and restart ADB
adb kill-server
adb start-server
adb devices
```

---

## 🎨 Customizing Your Pet

### Change Colors

Edit `CharacterStyle.kt`:
```kotlin
COPILOT(
    displayName = "My Custom Pet",
    primaryColor = Color.parseColor("#FF6B6B"),  // Your color!
    accentColor = Color.parseColor("#4ECDC4"),
    eyeStyle = EyeStyle.ROUND
)
```

### Add New Animations

1. Add state to `PetState.kt`
2. Create draw function in `PetRenderer.kt`
3. Add to switch statement

See `IMPLEMENTATION_GUIDE.md` for details!

---

## 📱 System Requirements

| Requirement | Minimum | Recommended |
|-------------|---------|-------------|
| Android Version | 8.0 (API 26) | 10.0+ |
| RAM | 2GB | 4GB+ |
| Screen Size | 4.5" | 5.5"+ |
| Storage | 50MB | 100MB |

---

## 🐛 Known Limitations

1. **Some manufacturers restrict overlays:**
   - Xiaomi MIUI requires additional permissions
   - Huawei EMUI has aggressive battery management
   - Samsung may require "App optimization" disabled

2. **Battery impact:**
   - ~3-5% daily battery usage
   - Can be optimized further (see TODO)

3. **Emulator limitations:**
   - Overlay permission may not work in emulator
   - **Use real device for testing!**

---

## 📚 Next Steps

### Learn More
- Read `README.md` for full feature list
- Check `IMPLEMENTATION_GUIDE.md` for architecture deep-dive
- Browse source code with inline documentation

### Contribute
- Add new animation states
- Implement GitHub OAuth UI
- Create new character styles
- Optimize battery usage

### Share
- Take screenshots/videos of your pet
- Show off the system overlay magic
- Share on social media with #GitGotchi

---

## 🆘 Getting Help

### Resources
- [Android Overlay Docs](https://developer.android.com/reference/android/view/WindowManager.LayoutParams#TYPE_APPLICATION_OVERLAY)
- [Canvas Drawing Guide](https://developer.android.com/reference/android/graphics/Canvas)
- [Foreground Services](https://developer.android.com/guide/components/foreground-services)

### Common Questions

**Q: Why does it need overlay permission?**
A: This is what allows the pet to appear on top of all apps - the core feature!

**Q: Is it safe?**
A: Yes! Open source, no data collection, runs entirely on your device.

**Q: Does it drain battery?**
A: Minimal impact - ~3-5% daily. We use efficient rendering and only update at 60fps when visible.

**Q: Can I have multiple pets?**
A: Not yet, but it's on the TODO list!

**Q: Why code-based rendering instead of sprites?**
A: Smaller APK, infinite scaling, easier to customize, and smoother animations!

---

## ✨ The Magic

The secret sauce is just three things:

1. **`SYSTEM_ALERT_WINDOW` permission** - Allows drawing over apps
2. **Foreground service** - Keeps the pet alive
3. **`TYPE_APPLICATION_OVERLAY`** - The window type that appears on top

Everything else is just making it look awesome! 🎨

---

**Enjoy your new coding companion!** 🐾

Remember: Switch apps, browse Instagram, check messages - your pet is ALWAYS there, ALWAYS alive! That's the magic! ✨
