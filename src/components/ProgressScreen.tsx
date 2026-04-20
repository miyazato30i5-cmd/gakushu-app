import type { AppState } from '../types'
import { CURRICULUM } from '../data/curriculum'
import { hasBadge, getGenreStampCount, getWeekHistory, getTotalStamps } from '../store'
import { getAllQuizSetsInGenre } from '../data/curriculum'

interface Props {
  state: AppState
  onBack: () => void
}

export default function ProgressScreen({ state, onBack }: Props) {
  const week = getWeekHistory(state)
  const totalStamps = getTotalStamps(state)
  const card: React.CSSProperties = { background: 'white', borderRadius: 20, padding: 16, marginBottom: 14, boxShadow: '0 2px 10px rgba(0,0,0,0.08)' }

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{ background: 'linear-gradient(135deg, #a8edea, #fed6e3)', padding: '40px 16px 20px' }}>
        <button onClick={onBack} style={{ background: 'rgba(0,0,0,0.1)', border: 'none', borderRadius: 20, padding: '4px 12px', color: '#555', fontSize: 13, cursor: 'pointer', marginBottom: 10 }}>← もどる</button>
        <h1 style={{ fontSize: 22, fontWeight: 'bold', color: '#555' }}>📊 成績</h1>
      </div>

      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', padding: '16px' }}>

        {/* Total */}
        <div style={card}>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>⭐ スタンプ 合計</p>
          <p style={{ fontSize: 40, fontWeight: 'bold', color: '#f59e0b' }}>{totalStamps}<span style={{ fontSize: 16, color: '#888', marginLeft: 4 }}>こ</span></p>
        </div>

        {/* Per Subject */}
        {CURRICULUM.map(subject => (
          <div key={subject.id} style={card}>
            <p style={{ fontSize: 13, fontWeight: 'bold', color: '#555', marginBottom: 12 }}>
              {subject.emoji} {subject.label}
            </p>
            {subject.genres.map(genre => {
              const total = getAllQuizSetsInGenre(genre).length
              const earned = getGenreStampCount(state, genre)
              const badge = hasBadge(state, genre)
              const pct = total > 0 ? (earned / total) * 100 : 0
              return (
                <div key={genre.id} style={{ marginBottom: 12 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: '#555' }}>
                      {badge ? '🏅' : '○'} {genre.label}
                    </span>
                    <span style={{ fontSize: 11, color: '#888' }}>{earned} / {total}</span>
                  </div>
                  <div style={{ height: 8, background: '#f0f0f0', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', background: badge ? 'linear-gradient(90deg, #ffd700, #ffaa00)' : subject.color, borderRadius: 4, width: `${pct}%` }} />
                  </div>
                  {/* Category detail */}
                  <div style={{ marginTop: 6, paddingLeft: 8 }}>
                    {genre.categories.map(cat => (
                      <div key={cat.id} style={{ marginBottom: 4 }}>
                        <p style={{ fontSize: 10, color: '#aaa', marginBottom: 3 }}>{cat.label}</p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {cat.quizSets.map(qs => (
                            <span key={qs.id} style={{
                              fontSize: 10, padding: '2px 8px', borderRadius: 10,
                              background: state.stamps[qs.id] ? '#fef9c3' : '#f3f4f6',
                              color: state.stamps[qs.id] ? '#92400e' : '#9ca3af',
                              border: state.stamps[qs.id] ? '1px solid #fcd34d' : '1px solid #e5e7eb',
                            }}>
                              {state.stamps[qs.id] ? '⭐' : '○'} {qs.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        ))}

        {/* Week */}
        <div style={card}>
          <p style={{ fontSize: 12, color: '#888', marginBottom: 10 }}>📅 今週の 学習</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
            {week.map(({ day, count }, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, color: '#aaa', marginBottom: 4 }}>{day}</div>
                <div style={{ fontSize: 12, minHeight: 20 }}>
                  {count > 0 ? '⭐'.repeat(Math.min(count, 4)) : <span style={{ color: '#ddd', fontSize: 10 }}>―</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
