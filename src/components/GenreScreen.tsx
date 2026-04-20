import type { SubjectDef, GenreDef, AppState } from '../types'
import { hasStamp } from '../store'

interface Props {
  subject: SubjectDef
  genre: GenreDef
  state: AppState
  onSelectQuizSet: (quizSetId: string) => void
  onBack: () => void
}

export default function GenreScreen({ subject, genre, state, onSelectQuizSet, onBack }: Props) {
  return (
    <div style={{ width: '100%', minHeight: '100vh', background: '#f0f4f8' }}>
      <div style={{ background: subject.color, padding: '40px 16px 24px', color: 'white' }}>
        <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 20, padding: '4px 12px', color: 'white', fontSize: 13, marginBottom: 12, cursor: 'pointer' }}>
          ← もどる
        </button>
        <h1 style={{ fontSize: 22, fontWeight: 'bold' }}>{genre.label}</h1>
      </div>

      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', padding: '16px' }}>
        {genre.categories.map(cat => (
          <div key={cat.id} style={{ marginBottom: 20 }}>
            <p style={{ fontSize: 12, fontWeight: 'bold', color: '#666', marginBottom: 8, paddingLeft: 4 }}>{cat.label}</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {cat.quizSets.map(qs => {
                const stamped = hasStamp(state, qs.id)
                return (
                  <button
                    key={qs.id}
                    onClick={() => onSelectQuizSet(qs.id)}
                    style={{
                      background: stamped ? 'linear-gradient(135deg, #fef9c3, #fef08a)' : 'white',
                      borderRadius: 16,
                      padding: '16px 12px',
                      textAlign: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                      border: stamped ? '2px solid #f59e0b' : '2px solid #e5e7eb',
                      cursor: 'pointer',
                      width: '100%',
                    }}
                  >
                    <div style={{ fontSize: 28, marginBottom: 6 }}>
                      {stamped ? '⭐' : '📝'}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 'bold', color: '#333' }}>{qs.label}</div>
                    <div style={{ fontSize: 10, color: '#aaa', marginTop: 4 }}>10問</div>
                    {stamped && (
                      <div style={{ fontSize: 10, color: '#f59e0b', fontWeight: 'bold', marginTop: 4 }}>スタンプ 取得済み！</div>
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
