# GitGotchi Monorepo

A monorepo for "GitGotchi" (aka "Copilot Crew") - a developer companion system that connects four parts: a Web Showcase, a Desktop Companion App, a VS Code Extension, and a Mobile Android App.

## Structure

```
packages/
├── shared/          # Shared eye-tracking logic, types, and physics
├── web/            # Next.js Portfolio Showcase
├── app/            # Tauri Desktop Companion
├── extension/      # VS Code Extension
└── mobile-android/ # Android System-Wide Overlay Pet
```

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 10+
- Rust 1.91+ (for Tauri app)
- VS Code (for extension development)
- Android Studio & Android SDK 35+ (for mobile-android)

### Installation

```bash
# Install pnpm globally
npm install -g pnpm

# Install all dependencies
pnpm install
```

### Building

```bash
# Build all packages
pnpm -r build

# Build specific package
pnpm --filter @gitgotchi/shared build
pnpm --filter web build
pnpm --filter app build
pnpm --filter gitgotchi compile
```

### Development

#### Web Showcase
```bash
cd packages/web
pnpm dev
```
Opens at http://localhost:3000

#### Desktop App
```bash
cd packages/app
pnpm tauri dev
```

#### VS Code Extension
```bash
cd packages/extension
pnpm watch
```
Then press F5 in VS Code to launch the extension development host.

## Packages

### 📦 shared

Shared code used across all packages:
- **Components**: `Character.tsx` - Eye-tracking character component
- **Hooks**: `usePointerPosition.ts` - Mouse/touch tracking hook
- **Types**: Shared TypeScript types
- **Physics**: `RoamingEngine` - Physics simulation for screen roaming

### 🌐 web

Next.js web showcase featuring:
- Character grid with eye-tracking
- Adoption modal
- Download button for desktop app
- Responsive design with Tailwind CSS

### 🖥️ app

Tauri desktop companion app:
- Transparent overlay window
- Click-through support
- WebSocket communication
- Play mode (standalone) and Dev mode (VS Code integration)
- Character rendering with eye-tracking

**Key Features:**
- 200x200px window
- Always on top
- No taskbar icon
- Transparent background

### 🔌 extension

VS Code extension that:
- Auto-launches desktop app on VS Code startup
- Tracks typing activity (with language detection)
- Monitors file saves, errors, debugging
- WebSocket server on port 42069
- Configurable idle timeout (default: 30s)

**Commands:**
- `gitgotchi.launch` - Launch desktop app
- `gitgotchi.reconnect` - Reconnect WebSocket
- `gitgotchi.toggleDevMode` - Toggle dev mode

### 📱 mobile-android

Native Android app with system-wide overlay:
- **Lives on screen 24/7** across all apps
- System-wide floating overlay using `SYSTEM_ALERT_WINDOW`
- Physics engine (rope swinging, skateboarding, gravity)
- Touch interactions (drag, tap, fling)
- GitHub integration with agent tracking
- Pet reacts to commits, PRs, CI status, streak
- Home screen widget support

**Key Features:**
- Rope swinging with pendulum physics
- Skateboarding along navigation bar
- Always-on-top rendering
- Character selection (Copilot, Octocat, Robot)
- Auto-start on boot

## WebSocket Protocol

Communication between VS Code extension and desktop app:

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

## Architecture

```
┌─────────────────┐
│   VS Code       │
│   Extension     │
│   (Port 42069)  │
└────────┬────────┘
         │ WebSocket
         ▼
┌─────────────────┐
│  Desktop App    │
│  (Tauri)        │
│  - React UI     │
│  - Rust Backend │
└─────────────────┘

┌─────────────────┐
│  Web Showcase   │
│  (Next.js)      │
└─────────────────┘

┌─────────────────┐
│  Mobile App     │
│  (Android)      │
│  - Kotlin       │
│  - System       │
│    Overlay      │
└─────────────────┘
```

## Technologies

- **Monorepo**: pnpm workspaces + Turborepo
- **Web**: Next.js 16 + Tailwind CSS 4
- **Desktop**: Tauri 2 + React 19
- **Extension**: VS Code Extension API + WebSocket
- **Mobile**: Kotlin + Android SDK + Retrofit + Coroutines
- **Shared**: React 19 + Framer Motion + TypeScript

## License

MIT
