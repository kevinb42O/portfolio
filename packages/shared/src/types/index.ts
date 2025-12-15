export interface CharacterVariant {
  type: 'copilot' | 'octocat' | 'robot'
  color: 'blue' | 'purple' | 'teal' | 'violet' | 'green'
  name: string
}

export interface Position {
  x: number
  y: number
}

export interface Velocity {
  x: number
  y: number
}

export interface Bounds {
  width: number
  height: number
}

export interface WindowInfo {
  x: number
  y: number
  width: number
  height: number
  title: string
}

export type CharacterMode = 'play' | 'dev'

export interface WebSocketEvent {
  type: 'typing' | 'idle' | 'saving' | 'error' | 'git_push' | 'git_pull' | 'debug_start' | 'debug_stop'
  data?: {
    language?: string
    filename?: string
    errorCount?: number
  }
}
