import { motion } from 'framer-motion'
import { Sparkle, GithubLogo } from '@phosphor-icons/react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { ParticleBackground } from '@/components/ParticleBackground'

interface HeroProps {
  user: {
    login: string
    avatarUrl: string
  } | null
}

export function Hero({ user }: HeroProps) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center px-6 md:px-12 py-20 overflow-hidden">
      <div className="absolute inset-0 mesh-background opacity-50" />
      
      <div className="absolute inset-0 overflow-hidden">
        <ParticleBackground />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
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
                  {user.login.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground">
              Kevin B.
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-card-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Unity Game Developer • Full-Stack Engineer • Creative Technologist
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          className="pt-8"
        >
          <div className="max-w-2xl mx-auto bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 space-y-4">
            <h2 className="text-2xl font-semibold text-foreground mb-4">About</h2>
            <p className="text-card-foreground/90 text-base leading-relaxed">
              Specialized in Unity/C# game development and full-stack web applications with React, 
              TypeScript, and Supabase. My portfolio showcases shipped products ranging from games 
              like <strong>Gemini Gauntlet</strong>, <strong>Azeroth Survivors</strong>, and 
              <strong> Mini Diamond Hunt</strong> to professional tools including the revolutionary 
              <strong> UnityAI Scene Builder Tool</strong> and <strong>Movement Controller PRO</strong>.
            </p>
            <p className="text-card-foreground/90 text-base leading-relaxed">
              From AI-powered Unity editor tools that generate complete 3D worlds in seconds to 
              engaging web platforms with real-time features, each project demonstrates technical 
              excellence and creative problem-solving. Whether building advanced movement systems, 
              crafting immersive game experiences, or developing full-stack applications, I deliver 
              production-ready solutions that make an impact.
            </p>
            {user && (
              <div className="pt-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                >
                  <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
                    <GithubLogo size={20} className="mr-2" weight="fill" />
                    Follow on GitHub
                  </a>
                </Button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
