export type Course = {
  id: number
  name: string
  professor: string
  rating: number
  reviewCount: number
  semester: string
  description?: string
}

export type Review = {
  id: number
  courseId: number
  rating: number
  semester: string
  text: string
  likes: number
  assignment: string
  groupWork: string
  grading: string
  attendance: string
  examCount: string
}

export type RatingBreakdownItem = {
  stars: number
  percentage: number
}

export type CourseInfoChoice = {
  label: string
  percentage: number
  selected: boolean
}

export type CourseInfoData = {
  assignment: { choices: CourseInfoChoice[] }
  groupWork: { choices: CourseInfoChoice[] }
  grading: { choices: CourseInfoChoice[] }
  attendance: { value: string; count: number }
  examCount: { value: string; count: number }
}
