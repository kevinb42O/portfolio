import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Star, GitBranch, ArrowUpRight, Code, Sparkle, Play, Image as ImageIcon } from '@phosphor-icons/react'
import { ProjectData } from '@/lib/projects'

interface ProjectModalProps {
  project: ProjectData | null
  open: boolean
  onClose: () => void
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [videoError, setVideoError] = useState(false)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())

  if (!project) return null

  const isFlagship = project.isFlagship

  const handleImageError = (index: number) => {
    setImageErrors(prev => new Set(prev).add(index))
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`max-w-5xl max-h-[90vh] p-0 bg-card overflow-hidden ${
        isFlagship ? 'border-2 border-primary/70 shadow-2xl shadow-primary/30' : 'border-2 border-primary/30'
      }`}>
        <ScrollArea className="max-h-[90vh]">
          <div className="p-6 md:p-10">
            {isFlagship && (
              <div className="mb-6 flex items-center justify-center gap-2 text-primary">
                <Sparkle size={24} weight="fill" />
                <span className="text-sm font-semibold uppercase tracking-wider">Flagship Project</span>
                <Sparkle size={24} weight="fill" />
              </div>
            )}
            <DialogHeader className="mb-6">
              <DialogTitle className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {project.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                {project.language && (
                  <div className="flex items-center gap-2 mono">
                    <Code size={16} />
                    {project.language}
                  </div>
                )}
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {/* Video Section */}
              {project.modalVideo && !videoError && (
                <div className="relative w-full rounded-lg overflow-hidden border-2 border-border bg-black">
                  <video
                    controls
                    className="w-full h-auto"
                    poster={project.images?.[0]}
                    onError={() => setVideoError(true)}
                  >
                    <source src={project.modalVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-md flex items-center gap-2">
                    <Play size={16} className="text-accent" weight="fill" />
                    <span className="text-xs text-white font-medium">Project Demo</span>
                  </div>
                </div>
              )}

              {/* Images Gallery */}
              {project.images && project.images.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                    <ImageIcon size={20} />
                    Project Screenshots
                  </h3>
                  {/* Main Image */}
                  <div className="relative w-full rounded-lg overflow-hidden border-2 border-border bg-muted">
                    {!imageErrors.has(selectedImage) ? (
                      <img
                        src={project.images[selectedImage]}
                        alt={`${project.title} screenshot ${selectedImage + 1}`}
                        className="w-full h-auto"
                        onError={() => handleImageError(selectedImage)}
                      />
                    ) : (
                      <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                        <div className="text-center text-muted-foreground">
                          <ImageIcon size={48} className="mx-auto mb-2 opacity-50" />
                          <p className="text-sm">Screenshot not available</p>
                        </div>
                      </div>
                    )}
                  </div>
                  {/* Thumbnail Navigation */}
                  {project.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {project.images.map((image, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImage(idx)}
                          className={`relative flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                            selectedImage === idx
                              ? 'border-primary ring-2 ring-primary/50'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          {!imageErrors.has(idx) ? (
                            <img
                              src={image}
                              alt={`${project.title} thumbnail ${idx + 1}`}
                              className="w-full h-full object-cover"
                              onError={() => handleImageError(idx)}
                            />
                          ) : (
                            <div className="w-full h-full bg-muted flex items-center justify-center">
                              <ImageIcon size={16} className="text-muted-foreground opacity-50" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Description */}
              <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-lg p-6 border border-border">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2 text-foreground">
                  <GitBranch size={20} />
                  About This Project
                </h3>
                <p className="text-card-foreground/90 text-base leading-relaxed">
                  {project.description || 'No description available for this project.'}
                </p>
              </div>

              {project.features && project.features.length > 0 && (
                <div className="bg-gradient-to-br from-accent/10 via-primary/5 to-transparent rounded-lg p-8 border border-border">
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Star weight="fill" size={16} className="text-accent mt-1 flex-shrink-0" />
                        <span className="text-card-foreground/90 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.stack && project.stack.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="mono text-sm bg-primary/10 text-primary hover:bg-primary/20 border border-primary/30 px-4 py-2"
                      >
                        <Code size={14} className="mr-1" />
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {project.topics.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-foreground">Technologies & Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.topics.map((topic) => (
                      <Badge
                        key={topic}
                        variant="secondary"
                        className="mono text-sm bg-secondary/70 hover:bg-secondary border border-border px-4 py-2"
                      >
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-border">
                {project.liveUrl && (
                  <Button
                    asChild
                    size="lg"
                    className="flex-1 bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground font-semibold shadow-lg shadow-accent/30"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <Star weight="fill" size={20} className="mr-2" />
                      Try Live Demo
                      <ArrowUpRight size={18} className="ml-2" weight="bold" />
                    </a>
                  </Button>
                )}
                <Button
                  asChild
                  size="lg"
                  variant={project.liveUrl ? "outline" : "default"}
                  className={`flex-1 font-semibold ${
                    project.liveUrl 
                      ? 'border-primary/50 text-foreground hover:bg-primary/10' 
                      : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                  }`}
                >
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <GitBranch size={20} className="mr-2" />
                    View Repository
                    <ArrowUpRight size={16} className="ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
