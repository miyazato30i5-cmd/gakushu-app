import type { AppState } from './types'
import { getAllQuizSetsInGenre } from './data/curriculum'
import type { GenreDef } from './types'

const STORAGE_KEY = 'gakushu-app-v2'

export function defaultState(): AppState {
  return { stamps: {}, stampHistory: [] }
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    return { ...defaultState(), ...JSON.parse(raw) }
  } catch {
    return defaultState()
  }
}

function saveState(state: AppState): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function earnStamp(state: AppState, quizSetId: string): AppState {
  if (state.stamps[quizSetId]) return state  // already earned

  const today = new Date().toISOString().slice(0, 10)
  const history = [...state.stampHistory]
  const idx = history.findIndex(h => h.date === today)
  if (idx >= 0) history[idx] = { ...history[idx], count: history[idx].count + 1 }
  else history.push({ date: today, count: 1 })

  const newState: AppState = {
    stamps: { ...state.stamps, [quizSetId]: true },
    stampHistory: history.slice(-60),
  }
  saveState(newState)
  return newState
}

export function hasStamp(state: AppState, quizSetId: string): boolean {
  return !!state.stamps[quizSetId]
}

export function hasBadge(state: AppState, genre: GenreDef): boolean {
  const all = getAllQuizSetsInGenre(genre)
  return all.length > 0 && all.every(qs => state.stamps[qs.id])
}

export function getGenreStampCount(state: AppState, genre: GenreDef): number {
  return getAllQuizSetsInGenre(genre).filter(qs => state.stamps[qs.id]).length
}

export function getTotalStamps(state: AppState): number {
  return Object.values(state.stamps).filter(Boolean).length
}

export function getTodayStamps(state: AppState): number {
  const today = new Date().toISOString().slice(0, 10)
  return state.stampHistory.find(h => h.date === today)?.count ?? 0
}

export function getWeekHistory(state: AppState): { day: string; count: number }[] {
  const days = ['日', '月', '火', '水', '木', '金', '土']
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const dateStr = d.toISOString().slice(0, 10)
    return { day: days[d.getDay()], count: state.stampHistory.find(h => h.date === dateStr)?.count ?? 0 }
  })
}
