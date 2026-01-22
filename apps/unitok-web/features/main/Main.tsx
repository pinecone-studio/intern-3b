"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Home, Moon, Sun, Ticket } from "lucide-react"
import { useTheme } from "../../lib/providers/ThemeProvider"
import { calculateTotalTickets, mockCourses, mockReviews, mockTicketHistory } from "../../lib/mock-data"
import { Course } from "../exam-info/type"
import { AppHeader } from "../../components/AppHeader"
import { IconButton } from "../../components/buttons/IconButton"
import { HomeFeed } from "./_components/HomeFeed"
import { BottomNav } from "./_components/BottomNav"
import { Login } from "../../components/Login"


export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const { theme, toggleTheme } = useTheme()
  const currentTickets = calculateTotalTickets(mockTicketHistory)

  const navItems = [
    { id: "home", label: "Нүүр", icon: <Home className="h-5 w-5" />, onClick: () => router.push("/") },
    { id: "search", label: "Хайх", icon: <Search className="h-5 w-5" />, onClick: () => router.push("/search") },
  ]

  const handleSelectCourse = (course: Course) => {
    router.push(`/courses/${course.id}`)
  }

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />
  }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader
        title="Үнэлгээ"
        actions={
          <>
            <button
              onClick={() => router.push("/tickets")}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md bg-accent/30 hover:bg-accent/50 active:bg-accent transition-colors"
            >
              <Ticket className="h-4 w-4 text-foreground" />
              <span className="text-sm font-semibold text-foreground">{currentTickets}</span>
            </button>
            <IconButton
              icon={theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              label="Горим солих"
              onClick={toggleTheme}
            />
            <IconButton icon={<Search className="h-5 w-5" />} label="Хайх" onClick={() => router.push("/search")} />
          </>
        }
      />

      <main className="flex-1 overflow-y-auto pb-20">
        <HomeFeed reviews={mockReviews} courses={mockCourses} onSelectCourse={handleSelectCourse} />
      </main>

      <BottomNav items={navItems} activeId="home" />
    </div>
  )
}
