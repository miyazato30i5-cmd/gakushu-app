import { useState, useEffect } from 'react'
import type { Question } from '../types'
import { getQuestions } from '../data/questions'

interface Props {
  quizSetId: string
  quizSetLabel: string
  subjectColor: string
  onAllCorrect: () => void
  onBack: () => void
}

type Phase = 'question' | 'correct' | 'wrong' | 'result'

export default function QuizScreen({ quizSetId, quizSetLabel, subjectColor, onAllCorrect, onBack }: Props) {
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [phase, setPhase] = useState<Phase>('question')
  const [correctCount, setCorrectCount] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)

  useEffect(() => {
    setQuestions(getQuestions(quizSetId))
    setCurrent(0)
    setPhase('question')
    setCorrectCount(0)
    setSelected(null)
  }, [quizSetId])

  if (questions.length === 0) return null

  const q = questions[current]
  const total = questions.length

  const handleChoice = (idx: number) => {
    if (phase !== 'question') return
    setSelected(idx)
    if (idx === q.answer) {
      const newCorrect = correctCount + 1
      setCorrectCount(newCorrect)
      if (current + 1 >= total && newCorrect === total) {
        onAllCorrect()
      }
      setPhase('correct')
    } else {
      setPhase('wrong')
    }
  }

  const handleNext = () => {
    if (current + 1 >= total) {
      setPhase('result')
    } else {
      setCurrent(c => c + 1)
      setPhase('question')
      setSelected(null)
    }
  }

  const page: React.CSSProperties = { width: '100%', minHeight: '100vh', background: '#f8f9fc', display: 'flex', flexDirection: 'column' }

  if (phase === 'result') {
    const perfect = correctCount === total
    return (
      <div style={{ ...page, background: perfect ? 'linear-gradient(180deg, #fffbeb, #fff)' : 'linear-gradient(180deg, #f0f9ff, #fff)', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 60 }}>
        <div style={{ textAlign: 'center', padding: 24, width: '100%', maxWidth: 400 }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>{perfect ? '🎊' : '😊'}</div>
          <h2 style={{ fontSize: 24, fontWeight: 'bold', color: '#555', marginBottom: 6 }}>
            {perfect ? 'ぜんもん せいかい！' : 'おわったよ！'}
          </h2>
          <p style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>{quizSetLabel}</p>

          <div style={{ background: 'white', borderRadius: 20, padding: 24, boxShadow: '0 4px 16px rgba(0,0,0,0.1)', marginBottom: 16 }}>
            <p style={{ fontSize: 48, fontWeight: 'bold', color: '#7c3aed' }}>
              {correctCount} <span style={{ fontSize: 22, color: '#aaa' }}>/ {total}</span>
            </p>
            <p style={{ color: '#888', fontSize: 13, marginTop: 4 }}>
              せいかい {Math.round((correctCount / total) * 100)}%
            </p>
            {perfect
              ? <div style={{ marginTop: 12 }}>
                  <div style={{ fontSize: 28 }}>⭐ スタンプ GET！</div>
                  <p style={{ fontSize: 11, color: '#f59e0b', marginTop: 4 }}>このもんだいしゅうの スタンプを もらったよ！</p>
                </div>
              : <div style={{ marginTop: 12, fontSize: 14, color: '#888' }}>
                  <p>💪 全問正解でスタンプが もらえるよ！</p>
                  <p style={{ fontSize: 11, marginTop: 4 }}>もう一度 ちょうせんしよう！</p>
                </div>
            }
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={onBack}
              style={{ flex: 1, borderRadius: 20, padding: '12px', fontWeight: 'bold', fontSize: 14, color: '#666', background: '#f0f0f0', border: 'none', cursor: 'pointer' }}
            >
              もどる
            </button>
            {!perfect && (
              <button
                onClick={() => {
                  setQuestions(getQuestions(quizSetId))
                  setCurrent(0)
                  setPhase('question')
                  setCorrectCount(0)
                  setSelected(null)
                }}
                style={{ flex: 1, borderRadius: 20, padding: '12px', fontWeight: 'bold', fontSize: 14, color: 'white', background: subjectColor, border: 'none', cursor: 'pointer' }}
              >
                もう一度！
              </button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (phase === 'correct') {
    return (
      <div style={{ ...page, background: 'linear-gradient(180deg, #fffbeb, #fff)', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 60 }}>
        <div style={{ textAlign: 'center', padding: 24, width: '100%', maxWidth: 400 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }} className="animate-pop">🎉</div>
          <h2 style={{ fontSize: 26, fontWeight: 'bold', color: '#f59e0b', marginBottom: 16 }}>せいかい！</h2>
          <div className="animate-pop" style={{ width: 96, height: 96, borderRadius: '50%', background: 'linear-gradient(135deg, #ffd700, #ffaa00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, margin: '0 auto 12px', boxShadow: '0 4px 20px rgba(255,170,0,0.4)' }}>⭐</div>
          <p style={{ color: '#aaa', fontSize: 13, marginBottom: 8 }}>
            {current + 1} / {total} もん め
          </p>
          <div style={{ background: '#f5f5f5', borderRadius: 20, padding: '6px 20px', display: 'inline-block', fontSize: 13, color: '#666', marginBottom: 24 }}>
            こたえ：{q.choices[q.answer]}
          </div>
          <br />
          <button onClick={handleNext} style={{ width: '100%', maxWidth: 320, borderRadius: 20, padding: '14px', fontWeight: 'bold', fontSize: 15, color: 'white', background: 'linear-gradient(135deg, #667eea, #764ba2)', boxShadow: '0 4px 12px rgba(102,126,234,0.4)', border: 'none', cursor: 'pointer', marginTop: 8 }}>
            {current + 1 >= total ? 'けっかを みる 🎊' : 'つぎの もんだいへ →'}
          </button>
        </div>
      </div>
    )
  }

  if (phase === 'wrong') {
    return (
      <div style={{ ...page, background: 'linear-gradient(180deg, #fff5f5, #fff)', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 60 }}>
        <div style={{ textAlign: 'center', padding: 24, width: '100%', maxWidth: 400 }}>
          <div style={{ fontSize: 56, marginBottom: 8 }}>😢</div>
          <h2 style={{ fontSize: 26, fontWeight: 'bold', color: '#f87171', marginBottom: 16 }}>ざんねん…</h2>
          <div style={{ background: 'white', borderRadius: 20, padding: 20, boxShadow: '0 4px 16px rgba(0,0,0,0.08)', marginBottom: 20, textAlign: 'left' }}>
            <p style={{ fontSize: 12, color: '#aaa', marginBottom: 6 }}>せいかい</p>
            <p style={{ fontSize: 22, fontWeight: 'bold', color: '#22c55e', marginBottom: 8 }}>{q.choices[q.answer]}</p>
            <p style={{ fontSize: 12, color: '#888' }}>{q.explanation}</p>
          </div>
          <p style={{ fontSize: 11, color: '#f87171', marginBottom: 16 }}>⚠️ 全問正解でスタンプが もらえるよ。もう一度 チャレンジしよう！</p>
          <button onClick={handleNext} style={{ width: '100%', borderRadius: 20, padding: '14px', fontWeight: 'bold', fontSize: 15, color: 'white', background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', cursor: 'pointer' }}>
            {current + 1 >= total ? 'けっかを みる' : 'つぎへ →'}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={page}>
      <div style={{ width: '100%', maxWidth: 480, margin: '0 auto', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ background: subjectColor, padding: '40px 16px 16px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <button onClick={onBack} style={{ background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: 20, padding: '4px 12px', color: 'white', fontSize: 12, cursor: 'pointer' }}>✕ やめる</button>
            <span style={{ fontSize: 12, fontWeight: 'bold' }}>{quizSetLabel}</span>
            <span style={{ fontSize: 13 }}>✅ {correctCount}/{total}</span>
          </div>
          <div style={{ display: 'flex', gap: 3 }}>
            {questions.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 6, borderRadius: 3, background: i < current ? 'white' : i === current ? '#fde68a' : 'rgba(255,255,255,0.3)' }} />
            ))}
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', padding: '24px 16px', gap: 20 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '24px 16px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', border: '2px solid #e0e7ff' }}>
            <p style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>問題 {current + 1} / {total}</p>
            <p style={{ fontSize: 20, fontWeight: 'bold', color: '#333', lineHeight: 1.7 }}>{q.text}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {q.choices.map((choice, i) => (
              <button
                key={i}
                onClick={() => handleChoice(i)}
                style={{
                  borderRadius: 18, padding: '18px 8px', fontSize: 18, fontWeight: 'bold',
                  color: selected === i ? '#5b21b6' : '#333',
                  background: selected === i ? '#ede9fe' : 'white',
                  border: selected === i ? '2.5px solid #7c3aed' : '2.5px solid #e2e8f0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.07)', cursor: 'pointer',
                }}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
