'use client'

import { useState } from 'react'

type Platform = 'windows' | 'macos' | 'linux'

interface DownloadButtonProps {
  characterName: string
  onDownload?: (platform: Platform) => void
}

export function DownloadButton({ characterName, onDownload }: DownloadButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false)
  const [platform, setPlatform] = useState<Platform>('windows')

  const handleDownload = async () => {
    setIsDownloading(true)
    
    // Simulate download preparation
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // In a real implementation, this would trigger the actual download
    const downloadUrl = `/downloads/gitgotchi-${platform}-installer`
    console.log(`Downloading from: ${downloadUrl}`)
    
    onDownload?.(platform)
    setIsDownloading(false)
  }

  return (
    <div className="space-y-4">
      {/* Platform selector */}
      <div className="flex gap-2 justify-center">
        {(['windows', 'macos', 'linux'] as Platform[]).map((p) => (
          <button
            key={p}
            onClick={() => setPlatform(p)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
              platform === p
                ? 'bg-purple-600 text-white'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
          >
            {p === 'macos' ? 'macOS' : p}
          </button>
        ))}
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-semibold py-4 px-8 rounded-lg transition-all transform hover:scale-105 disabled:scale-100 shadow-lg disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isDownloading ? (
          <>
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Preparing Download...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download for {platform === 'macos' ? 'macOS' : platform.charAt(0).toUpperCase() + platform.slice(1)}
          </>
        )}
      </button>

      <p className="text-center text-sm text-slate-400">
        GitGotchi with {characterName} • v0.1.0
      </p>
    </div>
  )
}
