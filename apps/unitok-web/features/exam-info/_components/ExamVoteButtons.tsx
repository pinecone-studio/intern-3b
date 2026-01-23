"use client"

import { Button } from "@intern-3b/shadcn"
import { ThumbsUp, ThumbsDown } from "lucide-react"

type ExamVoteButtonsProps = {
  likes: number
  dislikes: number
  userVote: "like" | "dislike" | null
  onVote: (voteType: "like" | "dislike") => void
}

export function ExamVoteButtons({ likes, dislikes, userVote, onVote }: ExamVoteButtonsProps) {
  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={() => onVote("like")}
        className={`flex items-center gap-1.5 transition-colors ${
          userVote === "like" ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ThumbsUp className="h-3.5 w-3.5" />
        <span className="text-xs">{likes}</span>
      </Button>
      <Button
        onClick={() => onVote("dislike")}
        className={`flex items-center gap-1.5 transition-colors ${
          userVote === "dislike" ? "text-primary" : "text-muted-foreground hover:text-foreground"
        }`}
      >
        <ThumbsDown className="h-3.5 w-3.5" />
        <span className="text-xs">{dislikes}</span>
      </Button>
    </div>
  )
}
