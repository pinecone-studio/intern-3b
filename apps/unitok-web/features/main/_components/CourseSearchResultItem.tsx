
import { Star } from "lucide-react"
import { Course } from "../../exam-info/type"


interface CourseSearchResultItemProps {
  course: Course
  searchType: "course" | "professor"
}

export function CourseSearchResultItem({ course, searchType }: CourseSearchResultItemProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-foreground mb-0.5">{course.name}</h3>
        {searchType === "professor" && <p className="text-xs text-muted-foreground">{course.professor}</p>}
      </div>
      <div className="flex items-center gap-1 ml-3">
        <Star className="h-4 w-4 fill-star-yellow text-star-yellow" />
        <span className="text-sm font-semibold text-star-yellow">{course.rating.toFixed(1)}</span>
      </div>
    </div>
  )
}
