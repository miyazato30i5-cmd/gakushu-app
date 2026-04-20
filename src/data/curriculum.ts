import type { SubjectDef } from '../types'

export const CURRICULUM: SubjectDef[] = [
  {
    id: 'kokugo',
    label: '国語',
    emoji: '📖',
    color: 'linear-gradient(135deg, #f093fb, #f5576c)',
    genres: [
      {
        id: 'kokugo-kotoba',
        label: '言葉',
        categories: [
          {
            id: 'kokugo-kotoba-ruigigo',
            label: '類似語',
            quizSets: [
              { id: 'kokugo-kotoba-ruigigo-1', label: '類似語①', grade: 2 },
              { id: 'kokugo-kotoba-ruigigo-2', label: '類似語②', grade: 2 },
            ],
          },
          {
            id: 'kokugo-kotoba-hantaigo',
            label: '反対語',
            quizSets: [
              { id: 'kokugo-kotoba-hantaigo-1', label: '反対語①', grade: 2 },
              { id: 'kokugo-kotoba-hantaigo-2', label: '反対語②', grade: 2 },
            ],
          },
        ],
      },
      {
        id: 'kokugo-kanji',
        label: '漢字',
        categories: [
          {
            id: 'kokugo-kanji-2nen',
            label: '2年生の漢字',
            quizSets: [
              { id: 'kokugo-kanji-2nen-1', label: '2年生①', grade: 2 },
              { id: 'kokugo-kanji-2nen-2', label: '2年生②', grade: 2 },
            ],
          },
          {
            id: 'kokugo-kanji-3nen',
            label: '3年生の漢字',
            quizSets: [
              { id: 'kokugo-kanji-3nen-1', label: '3年生①', grade: 3 },
              { id: 'kokugo-kanji-3nen-2', label: '3年生②', grade: 3 },
            ],
          },
        ],
      },
      {
        id: 'kokugo-bunsho',
        label: '文章問題',
        categories: [
          {
            id: 'kokugo-bunsho-yomitori',
            label: '読み取り',
            quizSets: [
              { id: 'kokugo-bunsho-yomitori-1', label: '読み取り①', grade: 2 },
              { id: 'kokugo-bunsho-yomitori-2', label: '読み取り②', grade: 3 },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 'sansu',
    label: '算数',
    emoji: '🔢',
    color: 'linear-gradient(135deg, #4facfe, #00f2fe)',
    genres: [
      {
        id: 'sansu-keisan',
        label: '計算',
        categories: [
          {
            id: 'sansu-keisan-tashihiki',
            label: '足し算・引き算',
            quizSets: [
              { id: 'sansu-keisan-tashihiki-1', label: '足し算・引き算①', grade: 2 },
              { id: 'sansu-keisan-tashihiki-2', label: '足し算・引き算②', grade: 2 },
            ],
          },
          {
            id: 'sansu-keisan-kuku',
            label: '九九・かけ算',
            quizSets: [
              { id: 'sansu-keisan-kuku-1', label: '九九①', grade: 2 },
              { id: 'sansu-keisan-kuku-2', label: '九九②', grade: 2 },
            ],
          },
          {
            id: 'sansu-keisan-wari',
            label: '割り算',
            quizSets: [
              { id: 'sansu-keisan-wari-1', label: '割り算①', grade: 3 },
              { id: 'sansu-keisan-wari-2', label: '割り算②', grade: 3 },
            ],
          },
        ],
      },
      {
        id: 'sansu-zukei',
        label: '図形',
        categories: [
          {
            id: 'sansu-zukei-kihon',
            label: '基本の図形',
            quizSets: [
              { id: 'sansu-zukei-kihon-1', label: '図形①', grade: 2 },
              { id: 'sansu-zukei-kihon-2', label: '図形②', grade: 3 },
            ],
          },
        ],
      },
      {
        id: 'sansu-bunsho',
        label: '文章題',
        categories: [
          {
            id: 'sansu-bunsho-kihon',
            label: '文章題',
            quizSets: [
              { id: 'sansu-bunsho-kihon-1', label: '文章題①', grade: 2 },
              { id: 'sansu-bunsho-kihon-2', label: '文章題②', grade: 3 },
            ],
          },
        ],
      },
    ],
  },
]

export function getSubject(id: string) {
  return CURRICULUM.find(s => s.id === id)
}

export function getGenre(subjectId: string, genreId: string) {
  return getSubject(subjectId)?.genres.find(g => g.id === genreId)
}

export function getAllQuizSetsInGenre(genre: { categories: { quizSets: { id: string }[] }[] }) {
  return genre.categories.flatMap(c => c.quizSets)
}
