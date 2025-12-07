export interface ProjectData {
  id: string
  title: string
  description: string
  repoUrl: string
  liveUrl?: string
  videoUrl?: string // For hover state video
  thumbnail?: string // Static thumbnail image
  stack: string[]
  features: string[]
  language: string
  topics: string[]
  isFlagship?: boolean
  gridSize?: 'small' | 'medium' | 'large' // For Bento Grid layout
}

export const projects: ProjectData[] = [
  {
    id: 'unityai-scene-builder',
    title: 'UnityAI Scene Builder Tool',
    description: 'Revolutionary AI-powered Unity tool that creates complete 3D game worlds in 8 seconds using natural language. Type "Create a fantasy world" and watch it build terrains, place objects, apply materials, and configure lighting automatically.',
    repoUrl: 'https://github.com/kevinb42O/UnityAI_SceneBuilderTool',
    // videoUrl: '/videos/unityai-demo.mp4', // Add video file to enable hover transition
    features: [
      '8-Second World Generation',
      'Natural Language Interface',
      'MCP Protocol Integration',
      'Biome System',
      'Smart Object Placement'
    ],
    stack: ['Unity', 'C#', 'MCP Protocol', 'AI/LLM Integration'],
    language: 'C#',
    topics: ['unity', 'ai', 'game-development', 'editor-tools'],
    isFlagship: true,
    gridSize: 'large'
  },
  {
    id: 'mini-diamond-hunt',
    title: 'Mini Diamond Hunt',
    description: 'A satisfying incremental mining game where every click brings you closer to diamond-tier glory! Features idle/offline progression, tool crafting, worker hiring, gear system, auction house, achievements, and prestige system.',
    repoUrl: 'https://github.com/kevinb42O/mini-diamond-hunt',
    liveUrl: 'https://diamondhunt3.vercel.app/',
    // videoUrl: '/videos/diamond-hunt-demo.mp4', // Add video file to enable hover transition
    features: [
      'Idle/Offline Progression',
      'Tool Crafting System',
      'Worker Management',
      'Auction House',
      'Prestige System'
    ],
    stack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    language: 'TypeScript',
    topics: ['react', 'game', 'incremental', 'idle-game'],
    gridSize: 'medium'
  },
  {
    id: 'azeroth-survivors',
    title: 'Azeroth Survivors',
    description: 'AZEROTH SURVIVORS - The ultimate Diep.io-style RPG with epic tank combat! Features complete tank upgrade system with synergies, advanced bot AI with smart formations, auto-turrets, drones, pylons, and mobile-responsive retro aesthetics.',
    repoUrl: 'https://github.com/kevinb42O/diepio-style-rpg-gam',
    liveUrl: 'https://kevinb42o.github.io/diepio-style-rpg-gam',
    // videoUrl: '/videos/azeroth-demo.mp4', // Add video file to enable hover transition
    features: [
      'Tank Upgrade System',
      'Advanced Bot AI',
      'Auto-turrets & Drones',
      'Build Planner',
      'Tank Wiki'
    ],
    stack: ['TypeScript', 'Canvas API', 'CSS'],
    language: 'TypeScript',
    topics: ['game', 'rpg', 'canvas', 'diep-io'],
    gridSize: 'medium'
  },
  {
    id: 'lantern-network',
    title: 'The Lantern Network',
    description: 'A hyperlocal mutual aid platform where neighbors help each other through a trust-based economy powered by Lanterns. Features real-time messaging, flare system for help requests, community campfire chat, and Elder reputation system.',
    repoUrl: 'https://github.com/kevinb42O/the-lantern-network',
    liveUrl: 'https://the-lantern-network.vercel.app/',
    // videoUrl: '/videos/lantern-demo.mp4', // Add video file to enable hover transition
    features: [
      'Real-time Messaging',
      'Lantern Economy',
      'Flare Help System',
      'Community Chat',
      'Trust & Reputation'
    ],
    stack: ['React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion'],
    language: 'TypeScript',
    topics: ['react', 'supabase', 'realtime', 'community'],
    gridSize: 'medium'
  },
  {
    id: 'midi-alchemy',
    title: 'MIDI Alchemy',
    description: 'A professional MIDI file editor and remixer that transforms uploaded MIDI files through AI-powered genre adaptation. Features high-quality playback with virtual instruments, real-time piano roll visualization, and multi-format export.',
    repoUrl: 'https://github.com/kevinb42O/midi-alchemy',
    liveUrl: 'https://midi-alchemy--kevinb42o.github.app/',
    // videoUrl: '/videos/midi-demo.mp4', // Add video file to enable hover transition
    features: [
      'AI-Powered Remixing',
      'Piano Roll Visualizer',
      'Virtual Instruments',
      'Genre Transformation',
      'MIDI/WAV Export'
    ],
    stack: ['TypeScript', 'Web Audio API', 'React', 'Tailwind CSS'],
    language: 'TypeScript',
    topics: ['audio', 'midi', 'music', 'web-audio'],
    gridSize: 'small'
  },
  {
    id: 'movement-controller-pro',
    title: 'Movement Controller PRO',
    description: 'Professional-grade AAA 3D movement system for Unity. Features responsive ground movement, advanced air control, coyote time, wall jumping with momentum preservation, crouch & slide system, and comprehensive configuration via ScriptableObjects.',
    repoUrl: 'https://github.com/kevinb42O/MovementController_PRO',
    features: [
      'Wall Jump System',
      'Coyote Time',
      'Slide Mechanics',
      'Air Control',
      'ScriptableObject Config'
    ],
    stack: ['Unity', 'C#'],
    language: 'C#',
    topics: ['unity', 'game-development', 'movement', '3d'],
    gridSize: 'small'
  },
  {
    id: 'gemini-gauntlet',
    title: 'Gemini Gauntlet',
    description: 'A 3D action-adventure game built in Unity featuring modular companion AI system, robust 3D audio with object pooling, and an intelligent debug system for performance optimization. Includes complete weapon systems, enemy AI, and progression mechanics.',
    repoUrl: 'https://github.com/kevinb42O/gemini-gauntlet-v4',
    features: [
      'Companion AI System',
      '3D Spatial Audio',
      'Weapon Systems',
      'Enemy AI',
      'Debug System'
    ],
    stack: ['Unity', 'C#'],
    language: 'C#',
    topics: ['unity', 'game', '3d', 'action-adventure'],
    gridSize: 'small'
  },
  {
    id: 'spirograph-pro',
    title: 'Spirograph Pro',
    description: 'A mesmerizing shape generator built in Unity that creates beautiful mathematical spirograph patterns. Uses shaders for stunning visual effects and real-time parameter adjustment.',
    repoUrl: 'https://github.com/kevinb42O/spirograph_pro',
    features: [
      'Real-time Generation',
      'Custom Shaders',
      'Parameter Controls',
      'Visual Effects'
    ],
    stack: ['Unity', 'C#', 'ShaderLab', 'HLSL'],
    language: 'ShaderLab',
    topics: ['unity', 'shaders', 'visualization', 'generative-art'],
    gridSize: 'small'
  }
]
