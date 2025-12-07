import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code, X, Folder, FileCode, GithubLogo } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface VSCodeAboutProps {
  user: {
    login: string
    avatarUrl: string
  } | null
}

export function VSCodeAbout({ user }: VSCodeAboutProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('about.ts')

  const codeContent = `// about.ts
// Kevin B. - Developer Profile

/**
 * Hey there! 👋
 * 
 * I'm Kevin B., a Unity Game Developer and Full-Stack Engineer
 * who loves building immersive experiences and powerful tools.
 * 
 * I believe in "Show, Don't Tell" - which is why this portfolio
 * exists. Every project here is shipped, playable, and production-ready.
 */

interface Developer {
  name: string;
  role: string[];
  passion: string;
  philosophy: string;
}

const kevin: Developer = {
  name: "Kevin B.",
  role: ["Unity Game Developer", "Full-Stack Engineer", "Creative Technologist"],
  passion: "Building things that matter",
  philosophy: "Show, Don't Tell"
};

// === EXPERIENCE ===

function buildUnityTools(): string[] {
  return [
    "UnityAI Scene Builder - 8-second world generation with natural language",
    "Movement Controller PRO - AAA-grade character controller system",
    "Advanced AI systems with smart formations and behaviors"
  ];
}

function createGames(): string[] {
  return [
    "Gemini Gauntlet - 3D action-adventure with companion AI",
    "Azeroth Survivors - Diep.io-style RPG with advanced bot AI",
    "Mini Diamond Hunt - Incremental game with prestige systems"
  ];
}

function developWebApps(): string[] {
  return [
    "The Lantern Network - Hyperlocal mutual aid platform with real-time features",
    "MIDI Alchemy - AI-powered MIDI editor with genre transformation",
    "Full-stack applications with React, TypeScript, and Supabase"
  ];
}

// === TECH STACK ===

const techStack = {
  gamedev: ["Unity", "C#", "ShaderLab", "HLSL", "3D Audio"],
  web: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"],
  backend: ["Supabase", "Node.js", "REST APIs", "Real-time Systems"],
  tools: ["Git", "Vite", "Three.js", "Web Audio API", "AI/LLM Integration"],
  skills: ["Game Design", "3D Graphics", "UI/UX", "Performance Optimization"]
};

// === CURRENT FOCUS ===

const currentProjects = [
  "Building cutting-edge Unity editor tools",
  "Exploring AI-powered game development",
  "Creating immersive web experiences",
  "Shipping production-ready applications"
];

export { kevin, techStack, currentProjects };
`

  return (
    <>
      {/* Compact About Card - Initial State */}
      <Card
        onClick={() => setIsOpen(true)}
        className="relative overflow-hidden bg-card cursor-pointer h-full flex flex-col group border-border hover:border-primary/50 transition-all duration-300"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 p-6 flex flex-col h-full justify-center items-center text-center space-y-4">
          <motion.div
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <Code size={48} weight="duotone" className="text-primary" />
          </motion.div>
          
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-2">About Me</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click to view source code
            </p>
            <div className="inline-flex items-center gap-2 text-xs mono text-accent">
              <FileCode size={14} />
              <span>about.ts</span>
            </div>
          </div>

          {user && (
            <div className="flex gap-3 pt-4">
              <a
                href={`https://github.com/${user.login}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <GithubLogo size={24} weight="fill" />
              </a>
            </div>
          )}
        </div>
      </Card>

      {/* VS Code Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-4xl max-h-[90vh] bg-[#1e1e1e] rounded-lg overflow-hidden shadow-2xl border border-[#3e3e3e] flex flex-col"
            >
              {/* VS Code Title Bar */}
              <div className="bg-[#323233] px-4 py-2 flex items-center justify-between border-b border-[#3e3e3e]">
                <div className="flex items-center gap-3">
                  <Code size={16} className="text-[#007acc]" />
                  <span className="text-sm text-[#cccccc] font-medium">Kevin B. - about.ts</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-[#cccccc] hover:text-white hover:bg-[#505050] p-1 rounded transition-colors"
                >
                  <X size={16} />
                </button>
              </div>

              {/* VS Code Tab Bar */}
              <div className="bg-[#252526] border-b border-[#3e3e3e] flex">
                <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-r border-[#3e3e3e] text-[#cccccc] text-sm">
                  <FileCode size={14} className="text-[#519aba]" />
                  <span>about.ts</span>
                </div>
              </div>

              {/* VS Code Editor */}
              <div className="flex-1 overflow-auto bg-[#1e1e1e] p-6">
                <pre className="text-sm font-mono leading-relaxed">
                  <code className="text-[#d4d4d4]">
                    {codeContent.split('\n').map((line, i) => (
                      <div key={i} className="flex">
                        <span className="text-[#858585] select-none w-12 text-right pr-4 flex-shrink-0">
                          {i + 1}
                        </span>
                        <span
                          className={
                            line.trim().startsWith('//')
                              ? 'text-[#6a9955]' // Comments
                              : line.includes('interface') || line.includes('const') || line.includes('function') || line.includes('return') || line.includes('export')
                              ? 'text-[#569cd6]' // Keywords
                              : line.includes('string') || line.includes('[]')
                              ? 'text-[#4ec9b0]' // Types
                              : line.includes('"')
                              ? 'text-[#ce9178]' // Strings
                              : 'text-[#d4d4d4]' // Default
                          }
                        >
                          {line || ' '}
                        </span>
                      </div>
                    ))}
                  </code>
                </pre>
              </div>

              {/* VS Code Status Bar */}
              <div className="bg-[#007acc] px-4 py-1 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-4">
                  <span>TypeScript</span>
                  <span>UTF-8</span>
                  <span>LF</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Ln 1, Col 1</span>
                  {user && (
                    <a
                      href={`https://github.com/${user.login}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline"
                    >
                      <GithubLogo size={12} weight="fill" />
                      <span>{user.login}</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
