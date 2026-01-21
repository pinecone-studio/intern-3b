import { ThumbsUp, ThumbsDown } from "lucide-react"

type ExamHeaderProps = {
  type: string
  semester: string
  likes: number
  dislikes: number
  variant: "locked" | "revealed"
}

export function ExamHeader({ type, semester, likes, dislikes, variant }: ExamHeaderProps) {
  if (variant === "revealed") {
    return (
      <div className="px-4 py-3 border-b border-border">
        <p className="text-sm font-semibold text-foreground">{type} шалгалт</p>
        <span className="text-xs text-muted-foreground">{semester}</span>
      </div>
    )
  }

  return (
    <div className="px-4 pt-3 pb-2">
      <p className="text-sm font-semibold text-foreground">{type} шалгалт</p>
      <div className="flex items-center justify-between mt-1">
        <span className="text-xs text-muted-foreground">{semester}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-muted-foreground">
            <ThumbsUp className="h-3 w-3" />
            <span className="text-xs">{likes}</span>
          </span>
          <span className="flex items-center gap-1 text-muted-foreground">
            <ThumbsDown className="h-3 w-3" />
            <span className="text-xs">{dislikes}</span>
          </span>
        </div>
      </div>
    </div>
  )
}
