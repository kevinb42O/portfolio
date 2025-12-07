import { motion } from 'framer-motion'
import { Star, GitBranch, ArrowUpRight, Sparkle } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Project } from '@/lib/types'

interface ProjectCardProps {
  project: Project
  onClick: () => void
  index: number
}

export function ProjectCard({ project, onClick, index }: ProjectCardProps) {
  const getLanguageColor = (language?: string) => {
    const colors: Record<string, string> = {
      TypeScript: 'oklch(0.6 0.18 250)',
      JavaScript: 'oklch(0.75 0.15 85)',
      Python: 'oklch(0.55 0.15 250)',
      Java: 'oklch(0.65 0.12 30)',
      Go: 'oklch(0.65 0.12 200)',
      Rust: 'oklch(0.55 0.10 30)',
      HTML: 'oklch(0.65 0.15 25)',
      CSS: 'oklch(0.55 0.15 270)',
      Ruby: 'oklch(0.55 0.15 0)',
    }
    return colors[language || ''] || 'oklch(0.65 0.08 270)'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
    >
      <Card
        onClick={onClick}
        className="project-card group relative overflow-hidden bg-card border-border hover:border-primary/50 cursor-pointer h-full flex flex-col transition-all duration-200"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative z-10 p-6 md:p-8 flex flex-col h-full">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {project.featured && (
                  <Sparkle className="text-primary flex-shrink-0" weight="fill" size={20} />
                )}
                <h3 className="text-xl md:text-2xl font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {project.title}
                </h3>
              </div>
              {project.language && (
                <div className="flex items-center gap-2 text-sm mono text-muted-foreground">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getLanguageColor(project.language) }}
                  />
                  {project.language}
                </div>
              )}
            </div>
            {project.stars > 0 && (
              <div className="flex items-center gap-1 text-accent flex-shrink-0">
                <Star weight="fill" size={16} />
                <span className="text-sm mono">{project.stars}</span>
              </div>
            )}
          </div>

          <p className="text-card-foreground/80 text-sm md:text-base mb-6 line-clamp-3 flex-1">
            {project.description || 'No description available'}
          </p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.topics.slice(0, 4).map((topic) => (
              <Badge
                key={topic}
                variant="secondary"
                className="mono text-xs bg-secondary/50 hover:bg-secondary border border-border text-secondary-foreground"
              >
                {topic}
              </Badge>
            ))}
            {project.topics.length > 4 && (
              <Badge
                variant="secondary"
                className="mono text-xs bg-secondary/50 border border-border text-muted-foreground"
              >
                +{project.topics.length - 4}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground pt-4 border-t border-border/50">
            <div className="flex items-center gap-1">
              <GitBranch size={14} />
              <span className="mono">Repository</span>
            </div>
            <span className="ml-auto opacity-70">
              {new Date(project.updatedAt).toLocaleDateString('en-US', {
                month: 'short',
                year: 'numeric',
              })}
            </span>
          </div>
        </div>

        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="bg-primary text-primary-foreground rounded-full p-2">
            <ArrowUpRight size={16} weight="bold" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
