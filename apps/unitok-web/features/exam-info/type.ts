export type Course = {
  id: number
  name: string
  professor: string
  rating: number
  reviewCount: number
  semester: string
}

export type ExamInfo = {
  id: number
  semester: string
  type: string
  likes: number
  dislikes: number
  content: string
  revealed: boolean
  examFormats?: string[]
  strategy?: string
  difficulty?: string
  questionExamples?: string[]
  tips?: string
}

export type UserVote = "like" | "dislike" | null
