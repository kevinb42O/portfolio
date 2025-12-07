# 🚀 Kevin B. - Portfolio 2026

A cutting-edge, immersive portfolio showcasing Kevin B.'s projects with a **Minimalist Sci-Fi / High-End Creative Tech** aesthetic. Built with React, Three.js, and Framer Motion, featuring 3D shader backgrounds, Bento Grid layout, and interactive project cards.

## ✨ Features

### 🎨 Visual Excellence
- **3D Shader Background**: React Three Fiber canvas with animated noise shaders and gradient effects
- **Grain & Vignette Overlay**: Adds depth and cinematic quality to the background
- **Bento Grid Layout**: Modern, Pinterest-style grid with varying card sizes for visual hierarchy
- **Hover-to-Video Transitions**: Cards transform from static thumbnails to looping video demos on hover
- **VS Code IDE About Section**: Interactive "source code" view of developer bio with authentic IDE styling

### 🎯 Interaction Design
- **Haptic Feedback**: Smooth scale animations on card interactions (1.05x hover, 0.98x tap)
- **Staggered Animations**: Framer Motion-powered entrance animations with elegant timing
- **Performance Optimized**: Viewport-based animation pausing for the 3D canvas
- **Lazy Loading**: Smart video preloading on hover to minimize initial load time
- **Click-to-Open**: Project cards open live demos or GitHub repos in new tabs

### 📱 Responsive & Accessible
- **Mobile-First Design**: Bento Grid transforms into a clean vertical feed on mobile
- **Cross-Platform**: Tested on desktop, tablet, and mobile viewports
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility support

## 🎨 Design Philosophy

**"Show, Don't Tell"** - This portfolio embodies 2026 design standards with a futuristic, minimalist sci-fi aesthetic. Projects are presented as interactive modules in a Bento Grid, combining high-end creative tech visuals with immersive 3D backgrounds. Every interaction is intentional, performant, and leaves a lasting impression.

## 🛠️ Tech Stack

### Core
- **React 19** with TypeScript for type-safe component development
- **Vite** for lightning-fast development and optimized production builds
- **Tailwind CSS v4** for modern, utility-first styling

### 3D & Animation
- **React Three Fiber** - React renderer for Three.js, powering the 3D shader background
- **@react-three/drei** - Useful helpers for React Three Fiber
- **Three.js** - 3D graphics library for WebGL rendering
- **Framer Motion** - Production-ready animation library for React

### UI & Components
- **Radix UI** - Unstyled, accessible component primitives
- **Phosphor Icons** - Beautiful, consistent iconography
- **Sonner** - Toast notifications

### Data & Integration
- **GitHub Spark** - User authentication and data fetching

## 📦 Featured Projects

1. **UnityAI Scene Builder Tool** (Flagship) - AI-powered Unity tool that creates complete 3D game worlds in 8 seconds
2. **MovementController PRO** - The best character controller for Unity
3. **Mini Diamond Hunt** - TypeScript web game
4. **Diep.io Style RPG Game** - TypeScript-based RPG
5. **The Lantern Network** - Web application with database
6. **Gemini Gauntlet v4** - Unity game
7. **MIDI Alchemy** - Music/audio web application
8. **Spirograph PRO** - Unity shape generator tool

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🎯 Development

The project uses:
- **TypeScript** for type safety
- **ESLint** for code quality
- **Tailwind CSS v4** for modern styling
- **Spark** for GitHub API integration

## 🎨 Color Palette

- **Background**: Deep cosmic purple `oklch(0.25 0.1 290)`
- **Cards**: Rich navy `oklch(0.2 0.05 250)`
- **Primary Accent**: Luminous gold `oklch(0.85 0.18 90)`
- **Secondary Accent**: Warm amber `oklch(0.75 0.15 85)`

## 📝 Project Structure

```
src/
├── components/
│   ├── ShaderBackground.tsx    # React Three Fiber 3D animated background
│   ├── BentoGrid.tsx          # Responsive grid layout system
│   ├── BentoProjectCard.tsx   # Interactive project cards with hover effects
│   ├── VSCodeAbout.tsx        # IDE-style about section modal
│   ├── Hero.tsx               # Hero section (legacy)
│   ├── ParticleBackground.tsx # Particle effects (legacy)
│   └── ui/                    # Radix UI components (button, card, badge, etc.)
├── lib/
│   ├── projects.ts            # Project data structure and content
│   └── types.ts               # TypeScript type definitions
├── hooks/                      # Custom React hooks
└── styles/                     # Global CSS and theme
```

## 🎬 Adding Project Videos

To enable the hover-to-video transitions:

1. Create demo videos (5-15 seconds, MP4 format, under 5MB)
2. Add videos to `public/videos/` directory
3. Videos are referenced in `src/lib/projects.ts`

See `public/videos/README.md` for detailed specifications.

## 🎨 Customization

### Colors
Edit `src/index.css` to customize the color scheme:
- `--background` - Main background color
- `--primary` - Primary accent (gold)
- `--accent` - Secondary accent (amber)
- `--card` - Card background color

### Projects
Edit `src/lib/projects.ts` to add/modify projects:
- Add new project objects to the `projects` array
- Set `gridSize` to 'small', 'medium', or 'large' for Bento Grid layout
- Mark flagship projects with `isFlagship: true`

### Shader Effects
Modify `src/components/ShaderBackground.tsx` to customize:
- Shader colors (`uColor1`, `uColor2`, `uColor3`)
- Animation speed (time multipliers in shaders)
- Wave intensity (position offsets in vertex shader)

## 📄 License For Spark Template Resources 

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.
