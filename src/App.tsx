import { useState, useEffect, useMemo } from 'react'
import { Hero } from '@/components/Hero'
import { ProjectCard } from '@/components/ProjectCard'
import { ProjectModal } from '@/components/ProjectModal'
import { SearchBar } from '@/components/SearchBar'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Sparkle } from '@phosphor-icons/react'
import { toast, Toaster } from 'sonner'
import { Repository, Project } from '@/lib/types'

const PROJECT_DATA: Record<string, { 
  description: string; 
  liveUrl?: string; 
  features?: string[];
  techStack?: string[];
}> = {
  'mini-diamond-hunt': {
    description: 'A satisfying incremental mining game where every click brings you closer to diamond-tier glory! Features idle/offline progression, tool crafting, worker hiring, gear system, auction house, achievements, and prestige system.',
    liveUrl: 'https://diamondhunt3.vercel.app/',
    features: ['Idle/Offline Progression', 'Tool Crafting System', 'Worker Management', 'Auction House', 'Prestige System'],
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion']
  },
  'diepio-style-rpg-gam': {
    description: 'AZEROTH SURVIVORS - The ultimate Diep.io-style RPG with epic tank combat! Features complete tank upgrade system with synergies, advanced bot AI with smart formations, auto-turrets, drones, pylons, and mobile-responsive retro aesthetics.',
    liveUrl: 'https://kevinb42o.github.io/diepio-style-rpg-gam',
    features: ['Tank Upgrade System', 'Advanced Bot AI', 'Auto-turrets & Drones', 'Build Planner', 'Tank Wiki'],
    techStack: ['TypeScript', 'Canvas API', 'CSS']
  },
  'the-lantern-network': {
    description: 'A hyperlocal mutual aid platform where neighbors help each other through a trust-based economy powered by Lanterns. Features real-time messaging, flare system for help requests, community campfire chat, and Elder reputation system.',
    liveUrl: 'https://the-lantern-network.vercel.app/',
    features: ['Real-time Messaging', 'Lantern Economy', 'Flare Help System', 'Community Chat', 'Trust & Reputation'],
    techStack: ['React 19', 'TypeScript', 'Supabase', 'Tailwind CSS', 'Framer Motion']
  },
  'midi-alchemy': {
    description: 'A professional MIDI file editor and remixer that transforms uploaded MIDI files through AI-powered genre adaptation. Features high-quality playback with virtual instruments, real-time piano roll visualization, and multi-format export.',
    liveUrl: 'https://midi-alchemy--kevinb42o.github.app/',
    features: ['AI-Powered Remixing', 'Piano Roll Visualizer', 'Virtual Instruments', 'Genre Transformation', 'MIDI/WAV Export'],
    techStack: ['TypeScript', 'Web Audio API', 'React', 'Tailwind CSS']
  },
  'UnityAI_SceneBuilderTool': {
    description: 'Revolutionary AI-powered Unity tool that creates complete 3D game worlds in 8 seconds using natural language. Type "Create a fantasy world" and watch it build terrains, place objects, apply materials, and configure lighting automatically.',
    features: ['8-Second World Generation', 'Natural Language Interface', 'MCP Protocol Integration', 'Biome System', 'Smart Object Placement'],
    techStack: ['Unity', 'C#', 'MCP Protocol', 'AI/LLM Integration']
  },
  'MovementController_PRO': {
    description: 'Professional-grade AAA 3D movement system for Unity. Features responsive ground movement, advanced air control, coyote time, wall jumping with momentum preservation, crouch & slide system, and comprehensive configuration via ScriptableObjects.',
    features: ['Wall Jump System', 'Coyote Time', 'Slide Mechanics', 'Air Control', 'ScriptableObject Config'],
    techStack: ['Unity', 'C#']
  },
  'gemini-gauntlet-v4': {
    description: 'A 3D action-adventure game built in Unity featuring modular companion AI system, robust 3D audio with object pooling, and an intelligent debug system for performance optimization. Includes complete weapon systems, enemy AI, and progression mechanics.',
    features: ['Companion AI System', '3D Spatial Audio', 'Weapon Systems', 'Enemy AI', 'Debug System'],
    techStack: ['Unity', 'C#']
  },
  'spirograph_pro': {
    description: 'A mesmerizing shape generator built in Unity that creates beautiful mathematical spirograph patterns. Uses shaders for stunning visual effects and real-time parameter adjustment.',
    features: ['Real-time Generation', 'Custom Shaders', 'Parameter Controls', 'Visual Effects'],
    techStack: ['Unity', 'C#', 'ShaderLab', 'HLSL']
  }
}

function App() {
  const [user, setUser] = useState<{ login: string; avatarUrl: string } | null>(null)
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setLoading(true)
      
      const userInfo = await window.spark.user()
      
      if (!userInfo) {
        throw new Error('Failed to fetch user information')
      }
      
      setUser({
        login: userInfo.login,
        avatarUrl: userInfo.avatarUrl,
      })

      // Featured repositories to showcase
      const featuredRepos = [
        'mini-diamond-hunt',
        'diepio-style-rpg-gam',
        'the-lantern-network',
        'UnityAI_SceneBuilderTool',
        'MovementController_PRO',
        'gemini-gauntlet-v4',
        'midi-alchemy',
        'spirograph_pro'
      ]

      // Fetch each repository individually to get complete data
      const repoPromises = featuredRepos.map(repoName =>
        fetch(`https://api.github.com/repos/${userInfo.login}/${repoName}`)
          .then(res => res.ok ? res.json() : null)
          .catch(err => {
            console.warn(`Failed to fetch ${repoName}:`, err)
            return null
          })
      )

      const repos = (await Promise.all(repoPromises)).filter((repo): repo is Repository => repo !== null)
      
      if (repos.length === 0) {
        toast.error('No repositories found. Check your GitHub connection.')
        return
      }
      
      const projectList: Project[] = repos
        .map(repo => {
          // Special handling for flagship project
          const isFlagship = repo.name === 'UnityAI_SceneBuilderTool'
          
          // Get enriched data from PROJECT_DATA
          const enrichedData = PROJECT_DATA[repo.name] || {}
          
          return {
            id: repo.id,
            title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').split(' ').map(word => 
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' '),
            description: enrichedData.description || repo.description || 'An amazing project',
            repoUrl: repo.html_url,
            liveUrl: enrichedData.liveUrl || repo.homepage || undefined,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || undefined,
            topics: repo.topics || [],
            createdAt: repo.created_at,
            updatedAt: repo.updated_at,
            pushedAt: repo.pushed_at,
            featured: isFlagship || repo.stargazers_count >= 5,
            repoName: repo.name,
            features: enrichedData.features,
            techStack: enrichedData.techStack,
            hasLiveDemo: !!enrichedData.liveUrl,
          }
        })
        .sort((a, b) => {
          // UnityAI_SceneBuilderTool always first
          const aIsFlagship = a.title.toLowerCase().includes('unityai')
          const bIsFlagship = b.title.toLowerCase().includes('unityai')
          
          if (aIsFlagship !== bIsFlagship) {
            return aIsFlagship ? -1 : 1
          }
          
          if (a.featured !== b.featured) {
            return a.featured ? -1 : 1
          }
          return b.stars - a.stars
        })

      setProjects(projectList)
      toast.success(`Discovered ${projectList.length} amazing projects!`)
    } catch (error) {
      console.error('Error fetching projects:', error)
      toast.error('Failed to load projects. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const languages = useMemo(() => {
    const langSet = new Set<string>()
    projects.forEach(project => {
      if (project.language) {
        langSet.add(project.language)
      }
    })
    return Array.from(langSet).sort()
  }, [projects])

  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = searchQuery === '' || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.topics.some(topic => topic.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLanguage = !selectedLanguage || project.language === selectedLanguage

      return matchesSearch && matchesLanguage
    })
  }, [projects, searchQuery, selectedLanguage])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-right" theme="dark" />
      
      <Hero user={user} />

      <section className="px-6 md:px-12 py-16 max-w-[1600px] mx-auto">
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Explore the Collection
              </h2>
              <p className="text-lg text-card-foreground/70 max-w-2xl mx-auto">
                {projects.length} projects waiting to be discovered
              </p>
            </div>

            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={() => setSearchQuery('')}
            />

            {languages.length > 0 && (
              <div className="flex flex-wrap justify-center gap-2 pt-4">
                <Badge
                  variant={selectedLanguage === null ? 'default' : 'outline'}
                  className={`cursor-pointer px-4 py-2 mono text-sm transition-all ${
                    selectedLanguage === null 
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => setSelectedLanguage(null)}
                >
                  All Projects
                </Badge>
                {languages.map(language => (
                  <Badge
                    key={language}
                    variant={selectedLanguage === language ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 mono text-sm transition-all ${
                      selectedLanguage === language 
                        ? 'bg-primary text-primary-foreground hover:bg-primary/90' 
                        : 'hover:bg-secondary'
                    }`}
                    onClick={() => setSelectedLanguage(language)}
                  >
                    {language}
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="space-y-4 p-6 md:p-8 bg-card rounded-lg border border-border">
                  <Skeleton className="h-8 w-3/4 bg-muted" />
                  <Skeleton className="h-4 w-1/2 bg-muted" />
                  <Skeleton className="h-20 w-full bg-muted" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-16 bg-muted" />
                    <Skeleton className="h-6 w-20 bg-muted" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onClick={() => setSelectedProject(project)}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Sparkle className="mx-auto mb-4 text-muted-foreground" size={48} />
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-card-foreground/70">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </section>

      <footer className="border-t border-border/50 py-12 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground">
                Built with passion • Powered by{' '}
                <span className="text-primary font-semibold">Spark</span>
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                © {new Date().getFullYear()} kevinb42O. All rights reserved.
              </p>
            </div>
            {user && (
              <div className="flex items-center gap-4">
                <a
                  href={`https://github.com/${user.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Sparkle size={16} weight="fill" />
                  <span className="text-sm font-medium">View on GitHub</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </footer>

      <ProjectModal
        project={selectedProject}
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  )
}

export default App