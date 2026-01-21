"use client"

import { Button } from "@intern-3b/shadcn"

interface TabItem {
  id: string
  label: string
}

interface TabNavProps {
  items: TabItem[]
  activeId: string
  onTabChange: (id: string) => void
}

export function TabNav({ items, activeId, onTabChange }: TabNavProps) {
  return (
    <nav className="flex items-center h-12 border-b border-border bg-card">
      {items.map((item) => {
        const isActive = item.id === activeId
        return (
          <Button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`flex-1 flex items-center justify-center h-full relative transition-colors ${
              isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-sm font-medium">{item.label}</span>
            {isActive && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
          </Button>
        )
      })}
    </nav>
  )
}
