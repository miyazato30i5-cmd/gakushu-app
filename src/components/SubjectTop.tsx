import type { SubjectDef, AppState } from '../types'
import { hasBadge, getGenreStampCount } from '../store'
import { getAllQuizSetsInGenre } from '../data/curriculum'

interface Props {
  subject: SubjectDef
  state: AppState
  onSelectGenre: (genreId: string) => void
  onBack: () => void
}

export default function SubjectTop({ subject, state, onSelectGenre, onBack }: Props) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{ background: subject.color, padding: '40px 16px 24px', color: 'white' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 20, padding: '4px 12px', color: 'white', fontSize: 13, marginBottom: 12, cursor: 'pointer' }}>
          ← もどる
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 'bold' }}>{subject.emoji} {subject.label}</h1>
      </div>

      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', padding: '16px' }}>
        <p style={{ fontSize: 12, color: '#888', marginBottom: 12 }}>ジャンルを えらんでね</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {subject.genres.map(genre => {
            const total = getAllQuizSetsInGenre(genre).length
            const earned = getGenreStampCount(state, genre)
            const badge = hasBadge(state, genre)
            const pct = total > 0 ? (earned / total) * 100 : 0

            return (
              <button
                key={genre.id}
                onClick={() => onSelectGenre(genre.id)}
                style={{ background: 'white', borderRadius: 18, padding: '16px', textAlign: 'left', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', border: badge ? '2px solid #f59e0b' : '2px solid transparent', cursor: 'pointer', width: '100%' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 16, fontWeight: 'bold', color: '#333' }}>{genre.label}</span>
                  {badge
                    ? <span style={{ fontSize: 22 }}>🏅</span>
                    : <span style={{ fontSize: 13, color: '#888' }}>⭐ {earned} / {total}</span>
                  }
                </div>
                <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', background: badge ? 'linear-gradient(90deg, #ffd700, #ffaa00)' : subject.color, borderRadius: 4, width: `${pct}%`, transition: 'width 0.4s' }} />
                </div>
                <p style={{ fontSize: 11, color: '#aaa', marginTop: 6 }}>
                  {genre.categories.map(c => c.label).join(' ・ ')}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
