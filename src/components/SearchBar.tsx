import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  onClear: () => void
}

export function SearchBar({ value, onChange, onClear }: SearchBarProps) {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        <MagnifyingGlass size={20} />
      </div>
      <Input
        type="text"
        placeholder="Search projects by name, description, or technology..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-12 pr-12 h-14 text-base bg-card border-2 border-border focus:border-primary focus-visible:ring-primary/30 transition-all"
      />
      {value && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onClear}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X size={20} />
        </Button>
      )}
    </div>
  )
}
