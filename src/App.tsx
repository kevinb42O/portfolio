import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GithubLogo } from '@phosphor-icons/react'
import { toast, Toaster } from 'sonner'
import { ShaderBackground } from '@/components/ShaderBackground'
import { BentoGrid, BentoCard } from '@/components/BentoGrid'
import { BentoProjectCard } from '@/components/BentoProjectCard'
import { VSCodeAbout } from '@/components/VSCodeAbout'
import { ProjectModal } from '@/components/ProjectModal'
import { CopilotCharacters } from '@/components/CopilotCharacters'
import { projects, ProjectData } from '@/lib/projects'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'



function App() {
  const [user, setUser] = useState<{ login: string; avatarUrl: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchUser()
  }, [])

  const fetchUser = async () => {
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

      toast.success(`Welcome back, ${userInfo.login}!`)
    } catch (error) {
      console.error('Error fetching user:', error)
      toast.error('Failed to load user information.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <Toaster position="top-right" theme="dark" />
      
      {/* 3D Shader Background */}
      <ShaderBackground />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex flex-col items-center justify-center px-6 md:px-12 py-20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          {user && (
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-full blur-xl opacity-50" />
              <Avatar className="w-32 h-32 border-4 border-primary/30 relative">
                <AvatarImage src={user.avatarUrl} alt={user.login} />
                <AvatarFallback className="text-2xl font-bold bg-card text-foreground">
                  {user?.login.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="text-center space-y-4 max-w-4xl"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
            Kevin B.
          </h1>
          
          <p className="text-xl md:text-2xl text-card-foreground/80 leading-relaxed">
            Unity Game Developer • Full-Stack Engineer • Creative Technologist
          </p>

          <p className="text-base text-muted-foreground max-w-2xl mx-auto pt-4">
            Building immersive experiences and powerful tools. Show, Don't Tell.
          </p>
        </motion.div>
      </section>

      {/* Bento Grid Projects Section */}
      <section className="relative px-6 md:px-12 py-16 max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-card-foreground/70 max-w-2xl mx-auto">
            Shipped products ranging from games to professional tools
          </p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-[280px]">
            {Array.from({ length: 8 }).map((_, i) => (
              <div 
                key={i} 
                className="bg-card rounded-lg border border-border p-6 animate-pulse"
              >
                <div className="h-6 w-3/4 bg-muted rounded mb-3" />
                <div className="h-4 w-1/2 bg-muted rounded mb-4" />
                <div className="h-20 w-full bg-muted rounded" />
              </div>
            ))}
          </div>
        ) : (
          <BentoGrid>
            {/* VS Code About Section - Always first */}
            <BentoCard size="medium">
              <VSCodeAbout user={user} />
            </BentoCard>

            {/* Project Cards */}
            {projects.map((project) => (
              <BentoCard key={project.id} size={project.gridSize || 'medium'}>
                <BentoProjectCard
                  project={project}
                  onClick={() => {
                    setSelectedProject(project)
                    setIsModalOpen(true)
                  }}
                />
              </BentoCard>
            ))}
          </BentoGrid>
        )}
      </section>

      {/* Copilot Characters Interactive Section */}
      <section className="relative">
        <CopilotCharacters />
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border/50 py-12 px-6 md:px-12">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-muted-foreground">
                Built with passion • Powered by{' '}
                <span className="text-primary font-semibold">React + Three.js</span>
              </p>
              <p className="text-xs text-muted-foreground/70 mt-2">
                © {new Date().getFullYear()} Kevin B. All rights reserved.
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
                  <GithubLogo size={20} weight="fill" />
                  <span className="text-sm font-medium">@{user.login}</span>
                </a>
              </div>
            )}
          </div>
        </div>
      </footer>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProject(null)
        }}
      />
    </div>
  )
}

export default App