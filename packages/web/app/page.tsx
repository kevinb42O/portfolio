'use client'

import { useState } from 'react'
import { CharacterGrid } from '@/components/CharacterGrid'
import { AdoptModal } from '@/components/AdoptModal'
import { DownloadButton } from '@/components/DownloadButton'
import type { CharacterVariant } from '@gitgotchi/shared'

export default function Home() {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterVariant | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [adoptedCharacter, setAdoptedCharacter] = useState<CharacterVariant | null>(null)

  const handleCharacterSelect = (character: CharacterVariant) => {
    setSelectedCharacter(character)
    setIsModalOpen(true)
  }

  const handleAdopt = (character: CharacterVariant) => {
    setAdoptedCharacter(character)
    setIsModalOpen(false)
  }

  const handleDownload = (platform: string) => {
    console.log(`Downloading GitGotchi for ${platform} with ${adoptedCharacter?.name}`)
    // In production, this would trigger the actual download
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 py-12 px-4">
      <main className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            GitGotchi
          </h1>
          <p className="text-xl text-purple-200">
            Your AI-Powered Desktop Companion
          </p>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Meet the Copilot Crew - adorable companions that live on your desktop, 
            track your cursor, and react to your VS Code activity in real-time.
          </p>
        </div>

        {/* Character Grid */}
        <CharacterGrid onCharacterSelect={handleCharacterSelect} />

        {/* Adopt Modal */}
        <AdoptModal
          character={selectedCharacter}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAdopt={handleAdopt}
        />

        {/* Download Section */}
        {adoptedCharacter && (
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-white mb-2">
                You've adopted {adoptedCharacter.name}!
              </h2>
              <p className="text-purple-200">
                Download the desktop app to get started
              </p>
            </div>
            <DownloadButton 
              characterName={adoptedCharacter.name}
              onDownload={handleDownload}
            />
          </div>
        )}

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-2">👀 Eye Tracking</h3>
            <p className="text-slate-300">
              Characters follow your mouse cursor with smooth, organic eye movements
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-2">🔌 VS Code Integration</h3>
            <p className="text-slate-300">
              Reacts to your coding activity with animations and expressions
            </p>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-xl font-semibold text-white mb-2">🎮 Interactive</h3>
            <p className="text-slate-300">
              Roams around your screen, can hang off windows and swing on ropes
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
