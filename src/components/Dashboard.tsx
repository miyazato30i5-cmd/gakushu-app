import type { AppState } from '../types'
import { CURRICULUM } from '../data/curriculum'
import { getTodayStamps, getTotalStamps, getWeekHistory, hasBadge } from '../store'

interface Props {
  state: AppState
  onSelectSubject: (id: string) => void
  onShowProgress: () => void
}

export default function Dashboard({ state, onSelectSubject, onShowProgress }: Props) {
  const todayStamps = getTodayStamps(state)
  const totalStamps = getTotalStamps(state)
  const week = getWeekHistory(state)

  const totalBadges = CURRICULUM.flatMap(s => s.genres).filter(g => hasBadge(state, g)).length
  const totalGenres = CURRICULUM.flatMap(s => s.genres).length

  const card: React.CSSProperties = {
    background: 'white', borderRadius: 20, padding: 16, marginBottom: 14,
    boxShadow: '0 4px 16px rgba(0,0,0,0.10)',
  }

  return (
    <div style={{ width: '100%', minHeight: '100vh', background: 'linear-gradient(180deg, #667eea 0%, #764ba2 45%, #f0f4f8 45%)' }}>
      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', padding: '32px 16px 24px' }}>

        <div style={{ color: 'white', marginBottom: 20 }}>
          <p style={{ fontSize: 13, opacity: 0.85, marginBottom: 4 }}>こんにちは！👋</p>
          <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>きょうも がんばろう！</h1>
        </div>

        {/* Stamp Card */}
        <div style={card}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
            <div>
              <p style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>きょうの スタンプ</p>
              <span style={{ fontSize: 32, fontWeight: 'bold', color: '#f59e0b' }}>⭐ {todayStamps}</span>
              <span style={{ fontSize: 14, color: '#888', marginLeft: 4 }}>こ</span>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: 11, color: '#888', marginBottom: 2 }}>ぜんぶで</p>
              <p style={{ fontSize: 20, fontWeight: 'bold', color: '#7c3aed' }}>
                {totalStamps}<span style={{ fontSize: 13, fontWeight: 'normal', color: '#888', marginLeft: 2 }}>こ</span>
              </p>
            </div>
          </div>
          <p style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>
            🏅 バッジ獲得: {totalBadges} / {totalGenres}
          </p>
          <div style={{ height: 10, background: '#f0f0f0', borderRadius: 5, overflow: 'hidden' }}>
            <div style={{ height: '100%', background: 'linear-gradient(90deg, #fbbf24, #f59e0b)', borderRadius: 5, width: `${totalGenres > 0 ? (totalBadges / totalGenres) * 100 : 0}%`, transition: 'width 0.5s' }} />
          </div>
        </div>

        {/* Subject Buttons */}
        <p style={{ fontSize: 13, fontWeight: 'bold', color: '#555', marginBottom: 10 }}>📚 教科を えらんでね</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          {CURRICULUM.map(subject => {
            const subjectStamps = subject.genres.reduce((sum, g) => {
              return sum + g.categories.flatMap(c => c.quizSets).filter(qs => state.stamps[qs.id]).length
            }, 0)
            const subjectBadges = subject.genres.filter(g => hasBadge(state, g)).length
            return (
              <button
                key={subject.id}
                style={{ background: subject.color, borderRadius: 20, padding: '20px 12px', color: 'white', textAlign: 'center', boxShadow: '0 3px 12px rgba(0,0,0,0.15)', border: 'none', cursor: 'pointer' }}
                onClick={() => onSelectSubject(subject.id)}
              >
                <div style={{ fontSize: 36, marginBottom: 6 }}>{subject.emoji}</div>
                <div style={{ fontSize: 16, fontWeight: 'bold' }}>{subject.label}</div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 4 }}>⭐{subjectStamps}こ 🏅{subjectBadges}</div>
              </button>
            )
          })}
        </div>

        {/* Week */}
        <div style={card}>
          <p style={{ fontSize: 13, fontWeight: 'bold', color: '#555', marginBottom: 10 }}>📅 今週の 学習</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center' }}>
            {week.map(({ day, count }, i) => (
              <div key={i}>
                <div style={{ fontSize: 10, color: '#aaa', marginBottom: 4 }}>{day}</div>
                <div style={{ fontSize: 12, minHeight: 18 }}>
                  {count > 0 ? '⭐'.repeat(Math.min(count, 4)) : <span style={{ color: '#ddd', fontSize: 10 }}>―</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          style={{ width: '100%', borderRadius: 20, padding: 14, fontWeight: 'bold', fontSize: 14, color: '#555', background: 'linear-gradient(135deg, #a8edea, #fed6e3)', boxShadow: '0 3px 10px rgba(0,0,0,0.08)', border: 'none', cursor: 'pointer' }}
          onClick={onShowProgress}
        >
          📊 成績を みる
        </button>
      </div>
    </div>
  )
}
