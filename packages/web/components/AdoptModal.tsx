'use client'

import { motion, AnimatePresence } from 'framer-motion'
import type { CharacterVariant } from '@gitgotchi/shared'

interface AdoptModalProps {
  character: CharacterVariant | null
  isOpen: boolean
  onClose: () => void
  onAdopt: (character: CharacterVariant) => void
}

export function AdoptModal({ character, isOpen, onClose, onAdopt }: AdoptModalProps) {
  if (!character) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 border border-purple-500/30"
            >
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white mb-2">
                  Adopt {character.name}?
                </h2>
                <p className="text-purple-200 mb-6 capitalize">
                  {character.type} • {character.color}
                </p>

                <div className="bg-slate-700/50 rounded-lg p-6 mb-6">
                  <p className="text-slate-200 text-sm leading-relaxed">
                    {character.name} will become your desktop companion! They'll hang out on your screen,
                    track your cursor, and react to your VS Code activity.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => onAdopt(character)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    Download Desktop App
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full bg-slate-700 hover:bg-slate-600 text-white font-semibold py-3 px-6 rounded-lg transition-all"
                  >
                    Maybe Later
                  </button>
                </div>

                <p className="text-xs text-slate-400 mt-4">
                  Available for Windows, macOS, and Linux
                </p>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
