export interface Repository {
  id: number
  name: string
  full_name: string
  description: string | null
  html_url: string
  homepage: string | null
  stargazers_count: number
  language: string | null
  topics: string[]
  created_at: string
  updated_at: string
  pushed_at: string
  size: number
  default_branch: string
  fork: boolean
  archived: boolean
}

export interface Project {
  id: number
  title: string
  description: string
  repoUrl: string
  liveUrl?: string
  stars: number
  language?: string
  topics: string[]
  updatedAt: string
  featured?: boolean
}
