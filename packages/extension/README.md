# GitGotchi VS Code Extension

Your AI-powered desktop companion that reacts to your VS Code activity.

## Features

- **Auto-Launch**: Automatically launches the GitGotchi desktop app when VS Code starts
- **Real-time Activity Tracking**: Monitors typing, saving, errors, git operations, and debugging
- **WebSocket Communication**: Seamless communication with the desktop companion
- **Idle Detection**: Detects when you're inactive for customizable periods

## Commands

- `GitGotchi: Launch Desktop App` - Manually launch the desktop companion
- `GitGotchi: Reconnect WebSocket` - Reconnect to the desktop app
- `GitGotchi: Toggle Dev Mode` - Toggle development mode

## Settings

- `gitgotchi.autoLaunch`: Automatically launch desktop app on startup (default: true)
- `gitgotchi.websocketPort`: WebSocket port for communication (default: 42069)
- `gitgotchi.idleTimeout`: Idle timeout in seconds (default: 30)

## Requirements

GitGotchi desktop app must be installed. Download from: [gitgotchi.dev](https://gitgotchi.dev)

## Events Tracked

- **Typing**: Detects typing activity with language information
- **Saving**: Triggers when files are saved
- **Errors**: Monitors code errors and diagnostics
- **Git Operations**: Detects git push/pull commands
- **Debugging**: Tracks debug session start/stop

## WebSocket Protocol

The extension communicates with the desktop app via WebSocket on port 42069 (configurable).

Events sent to desktop app:
```json
{
  "type": "typing|idle|saving|error|git_push|git_pull|debug_start|debug_stop",
  "data": {
    "language": "typescript",
    "filename": "index.ts",
    "errorCount": 3
  }
}
```

## License

MIT
