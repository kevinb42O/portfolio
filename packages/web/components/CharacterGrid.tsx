'use client'

import { useState } from 'react'
import { Character, usePointerPosition } from '@gitgotchi/shared'
import type { CharacterVariant } from '@gitgotchi/shared'

const CHARACTERS: CharacterVariant[] = [
  { type: 'copilot', color: 'blue', name: 'Azure' },
  { type: 'copilot', color: 'purple', name: 'Violet' },
  { type: 'copilot', color: 'teal', name: 'Cyan' },
  { type: 'octocat', color: 'violet', name: 'Luna' },
  { type: 'octocat', color: 'green', name: 'Forest' },
  { type: 'robot', color: 'blue', name: 'Bolt' },
  { type: 'robot', color: 'purple', name: 'Nova' },
  { type: 'robot', color: 'teal', name: 'Aqua' },
]

interface CharacterGridProps {
  onCharacterSelect?: (character: CharacterVariant) => void
}

export function CharacterGrid({ onCharacterSelect }: CharacterGridProps) {
  const { position } = usePointerPosition()
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterVariant | null>(null)

  const handleCharacterClick = (character: CharacterVariant) => {
    setSelectedCharacter(character)
    onCharacterSelect?.(character)
  }

  return (
    <div className="relative w-full h-[600px] bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 rounded-2xl overflow-hidden shadow-2xl">
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Characters */}
      {CHARACTERS.map((character, index) => {
        const col = index % 4
        const row = Math.floor(index / 4)
        const x = 15 + col * 23 // Spread across width
        const y = 25 + row * 45 // Spread across height

        return (
          <Character
            key={`${character.type}-${character.color}-${index}`}
            x={x}
            y={y}
            size={100}
            color={character.color}
            pointerX={position.x}
            pointerY={position.y}
            variant={character.type}
            delay={index * 0.1}
            onClick={() => handleCharacterClick(character)}
          />
        )
      })}

      {/* Title overlay */}
      <div className="absolute top-8 left-8 pointer-events-none">
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          Copilot Crew
        </h2>
        <p className="text-lg text-purple-200 mt-2">
          Choose your companion
        </p>
      </div>

      {/* Selected character indicator */}
      {selectedCharacter && (
        <div className="absolute bottom-8 left-8 bg-black/50 backdrop-blur-sm rounded-lg px-6 py-4 text-white">
          <p className="text-sm opacity-75">Selected:</p>
          <p className="text-xl font-bold">{selectedCharacter.name}</p>
          <p className="text-sm text-purple-300 capitalize">{selectedCharacter.type}</p>
        </div>
      )}
    </div>
  )
}
