"use client"

import { Sun, RotateCcw, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ProfileSettings() {
  return (
    <div className="rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 space-y-4">
      <h3 className="font-bold">Settings</h3>

      <div className="space-y-2">
        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="sm">
          <Sun className="w-4 h-4" />
          Toggle Dark Mode
        </Button>

        <Button
          variant="outline"
          className="w-full justify-start gap-2 text-destructive hover:text-destructive bg-transparent"
          size="sm"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Progress
        </Button>

        <Button variant="outline" className="w-full justify-start gap-2 bg-transparent" size="sm">
          <LogOut className="w-4 h-4" />
          Log Out
        </Button>
      </div>
    </div>
  )
}
