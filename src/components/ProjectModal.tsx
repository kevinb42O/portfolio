import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Star, GitBranch, ArrowUpRight, Calendar, Code, GitFork, Clock, Sparkle } from '@phosphor-icons/react'
import { Project } from '@/lib/types'

interface ProjectModalProps {
  project: Project | null
  open: boolean
  onClose: () => void
}

export function ProjectModal({ project, open, onClose }: ProjectModalProps) {
  if (!project) return null

  const isFlagship = project.title.toLowerCase().includes('unityai') || project.title.toLowerCase().includes('scene builder')

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className={`max-w-4xl max-h-[90vh] p-0 bg-card overflow-hidden ${
        isFlagship ? 'border-2 border-primary/70 shadow-2xl shadow-primary/30' : 'border-2 border-primary/30'
      }`}>
        <ScrollArea className="max-h-[90vh]">
          <div className="p-8 md:p-12">
            {isFlagship && (
              <div className="mb-6 flex items-center justify-center gap-2 text-primary">
                <Sparkle size={24} weight="fill" />
                <span className="text-sm font-semibold uppercase tracking-wider">Flagship Project</span>
                <Sparkle size={24} weight="fill" />
              </div>
            )}
            <DialogHeader className="mb-8">
              <DialogTitle className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
                {project.title}
              </DialogTitle>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {project.language && (
                  <div className="flex items-center gap-2 mono">
                    <Code size={16} />
                    {project.language}
                  </div>
                )}
                {project.stars > 0 && (
                  <div className="flex items-center gap-2 text-accent">
                    <Star weight="fill" size={16} />
                    <span className="mono">{project.stars} stars</span>
                  </div>
                )}
                {project.forks !== undefined && project.forks > 0 && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GitFork size={16} />
                    <span className="mono">{project.forks} forks</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>
                    Updated {new Date(project.updatedAt).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>
            </DialogHeader>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-primary/10 via-accent/5 to-transparent rounded-lg p-8 border border-border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                  <GitBranch size={20} />
                  About This Project
                </h3>
                <p className="text-card-foreground/90 text-base leading-relaxed">
                  {project.description || 'No description available for this project.'}
                </p>
              </div>

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

              {project.createdAt && (
                <div className="bg-gradient-to-br from-secondary/30 via-transparent to-secondary/20 rounded-lg p-6 border border-border/50">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-foreground">
                    <Clock size={20} />
                    Project Timeline
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-3 h-3 rounded-full bg-primary mt-1" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Created</div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(project.createdAt).toLocaleDateString('en-US', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </div>
                      </div>
                    </div>
                    {project.pushedAt && (
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-3 h-3 rounded-full bg-accent mt-1" />
                        <div>
                          <div className="text-sm font-medium text-foreground">Last Push</div>
                          <div className="text-sm text-muted-foreground">
                            {new Date(project.pushedAt).toLocaleDateString('en-US', {
                              month: 'long',
                              day: 'numeric',
                              year: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-3 h-3 rounded-full bg-muted mt-1" />
                      <div>
                        <div className="text-sm font-medium text-foreground">Active Development</div>
                        <div className="text-sm text-muted-foreground">
                          {Math.floor((new Date().getTime() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24))} days
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                <Button
                  asChild
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                    <GitBranch size={20} className="mr-2" />
                    View Repository
                    <ArrowUpRight size={16} className="ml-2" />
                  </a>
                </Button>
                {project.liveUrl && (
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="flex-1 border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold"
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Visit Live Site
                      <ArrowUpRight size={16} className="ml-2" />
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
