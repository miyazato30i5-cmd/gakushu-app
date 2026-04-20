export type SubjectId = 'kokugo' | 'sansu'

export interface QuizSetDef {
  id: string
  label: string
  grade: 2 | 3
}

export interface CategoryDef {
  id: string
  label: string
  quizSets: QuizSetDef[]
}

export interface GenreDef {
  id: string
  label: string
  categories: CategoryDef[]
}

export interface SubjectDef {
  id: SubjectId
  label: string
  emoji: string
  color: string
  genres: GenreDef[]
}

export interface Question {
  id: string
  text: string
  choices: string[]
  answer: number
  explanation: string
}

// stamps: quizSetId → true（全問正解済み）
export interface AppState {
  stamps: Record<string, boolean>
  stampHistory: { date: string; count: number }[]
}
