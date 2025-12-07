import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, GitBranch, ArrowUpRight, Sparkle, Rocket } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ProjectData } from '@/lib/projects'

interface BentoProjectCardProps {
  project: ProjectData
  onClick: () => void
}

export function BentoProjectCard({ project, onClick }: BentoProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (isHovered && videoRef.current && project.videoUrl) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay failed:', err)
      })
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isHovered, project.videoUrl])

  const handleClick = () => {
    // Haptic feedback animation handled by framer motion
    if (project.liveUrl) {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer')
    } else {
      window.open(project.repoUrl, '_blank', 'noopener,noreferrer')
    }
    onClick()
  }

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      TypeScript: 'oklch(0.6 0.18 250)',
      JavaScript: 'oklch(0.75 0.15 85)',
      Python: 'oklch(0.55 0.15 250)',
      'C#': 'oklch(0.65 0.15 285)',
      ShaderLab: 'oklch(0.7 0.12 340)',
      HLSL: 'oklch(0.6 0.13 320)',
    }
    return colors[language] || 'oklch(0.65 0.08 270)'
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card
        onClick={handleClick}
        className={`relative overflow-hidden bg-card cursor-pointer h-full flex flex-col group transition-all duration-300 ${
          project.isFlagship
            ? 'border-2 border-primary/70 hover:border-primary shadow-lg shadow-primary/20'
            : project.liveUrl
            ? 'border-border hover:border-accent/50 shadow-md shadow-accent/10'
            : 'border-border hover:border-primary/50'
        }`}
      >
        {/* Video/Thumbnail Background */}
        <div className="absolute inset-0 overflow-hidden">
          {project.videoUrl ? (
            <>
              {/* Thumbnail - visible when not hovered */}
              <div
                className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-300 ${
                  isHovered ? 'opacity-0' : 'opacity-100'
                }`}
                style={{
                  backgroundImage: `linear-gradient(135deg, ${getLanguageColor(project.language)} 0%, oklch(0.25 0.08 ${
                    project.language === 'C#' ? '285' : '250'
                  }) 100%)`,
                }}
              />
              
              {/* Video - visible when hovered */}
              <video
                ref={videoRef}
                loop
                muted
                playsInline
                preload="none"
                onLoadedData={() => setVideoLoaded(true)}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                  isHovered && videoLoaded ? 'opacity-30' : 'opacity-0'
                }`}
              >
                <source src={project.videoUrl} type="video/mp4" />
              </video>
            </>
          ) : (
            <div
              className="absolute inset-0 bg-gradient-to-br"
              style={{
                backgroundImage: `linear-gradient(135deg, ${getLanguageColor(project.language)} 0%, oklch(0.25 0.08 ${
                  project.language === 'C#' ? '285' : '250'
                }) 100%)`,
              }}
            />
          )}

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        </div>

        {/* Flagship indicator */}
        {project.isFlagship && (
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-70 z-10" />
        )}

        {/* Content */}
        <div className="relative z-10 p-6 flex flex-col h-full justify-between">
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  {project.isFlagship && (
                    <Sparkle className="text-primary flex-shrink-0" weight="fill" size={18} />
                  )}
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                    {project.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-xs mono text-muted-foreground">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: getLanguageColor(project.language) }}
                  />
                  {project.language}
                </div>
              </div>
            </div>

            <p className="text-card-foreground/80 text-sm mb-3 line-clamp-2">
              {project.description}
            </p>

            {project.features && project.features.length > 0 && (
              <div className="mb-3 space-y-1">
                {project.features.slice(0, 2).map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <div className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                    <span className="line-clamp-1">{feature}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {project.liveUrl && (
                <Badge
                  variant="default"
                  className="mono text-xs bg-accent/20 text-accent border border-accent/50 hover:bg-accent/30"
                >
                  <Rocket size={10} className="mr-1" weight="fill" />
                  Live
                </Badge>
              )}
              {project.stack.slice(0, 2).map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="mono text-xs bg-secondary/50 hover:bg-secondary border border-border text-secondary-foreground"
                >
                  {tech}
                </Badge>
              ))}
              {project.stack.length > 2 && (
                <Badge
                  variant="secondary"
                  className="mono text-xs bg-secondary/50 border border-border text-muted-foreground"
                >
                  +{project.stack.length - 2}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Click indicator */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-2 shadow-lg"
            >
              <ArrowUpRight size={16} weight="bold" />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}
