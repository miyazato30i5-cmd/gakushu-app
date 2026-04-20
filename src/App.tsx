import { useState } from 'react'
import type { AppState } from './types'
import { loadState, earnStamp } from './store'
import { CURRICULUM, getSubject, getGenre } from './data/curriculum'
import Dashboard from './components/Dashboard'
import SubjectTop from './components/SubjectTop'
import GenreScreen from './components/GenreScreen'
import QuizScreen from './components/QuizScreen'
import ProgressScreen from './components/ProgressScreen'

type Screen = 'dashboard' | 'subject' | 'genre' | 'quiz' | 'progress'

export default function App() {
  const [state, setState] = useState<AppState>(loadState)
  const [screen, setScreen] = useState<Screen>('dashboard')
  const [selectedSubjectId, setSelectedSubjectId] = useState('kokugo')
  const [selectedGenreId, setSelectedGenreId] = useState('')
  const [selectedQuizSetId, setSelectedQuizSetId] = useState('')
  const [selectedQuizSetLabel, setSelectedQuizSetLabel] = useState('')

  const subject = getSubject(selectedSubjectId) ?? CURRICULUM[0]
  const genre = getGenre(selectedSubjectId, selectedGenreId)

  const handleAllCorrect = () => {
    setState(prev => earnStamp(prev, selectedQuizSetId))
  }

  return (
    <>
      {screen === 'dashboard' && (
        <Dashboard
          state={state}
          onSelectSubject={id => { setSelectedSubjectId(id); setScreen('subject') }}
          onShowProgress={() => setScreen('progress')}
        />
      )}
      {screen === 'subject' && (
        <SubjectTop
          subject={subject}
          state={state}
          onSelectGenre={gid => { setSelectedGenreId(gid); setScreen('genre') }}
          onBack={() => setScreen('dashboard')}
        />
      )}
      {screen === 'genre' && genre && (
        <GenreScreen
          subject={subject}
          genre={genre}
          state={state}
          onSelectQuizSet={(qsId) => {
            const qs = genre.categories.flatMap(c => c.quizSets).find(q => q.id === qsId)
            setSelectedQuizSetId(qsId)
            setSelectedQuizSetLabel(qs?.label ?? '')
            setScreen('quiz')
          }}
          onBack={() => setScreen('subject')}
        />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          quizSetId={selectedQuizSetId}
          quizSetLabel={selectedQuizSetLabel}
          subjectColor={subject.color}
          onAllCorrect={handleAllCorrect}
          onBack={() => setScreen('genre')}
        />
      )}
      {screen === 'progress' && (
        <ProgressScreen
          state={state}
          onBack={() => setScreen('dashboard')}
        />
      )}
    </>
  )
}
