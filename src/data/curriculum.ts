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
          {
            id: 'kokugo-kotoba-okurigana',
            label: '送り仮名',
            quizSets: [
              { id: 'kokugo-kotoba-okurigana-1', label: '送り仮名①', grade: 2 },
              { id: 'kokugo-kotoba-okurigana-2', label: '送り仮名②', grade: 2 },
            ],
          },
          {
            id: 'kokugo-kotoba-katakana',
            label: 'カタカナ',
            quizSets: [
              { id: 'kokugo-kotoba-katakana-1', label: 'カタカナ①', grade: 2 },
              { id: 'kokugo-kotoba-katakana-2', label: 'カタカナ②', grade: 2 },
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
          {
            id: 'kokugo-kanji-ana',
            label: '漢字の穴埋め',
            quizSets: [
              { id: 'kokugo-kanji-ana-1', label: '穴埋め①', grade: 2 },
              { id: 'kokugo-kanji-ana-2', label: '穴埋め②', grade: 3 },
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
      {
        id: 'kokugo-bun',
        label: '文の組み立て',
        categories: [
          {
            id: 'kokugo-bun-shugo',
            label: '主語・述語',
            quizSets: [
              { id: 'kokugo-bun-shugo-1', label: '主語・述語①', grade: 2 },
              { id: 'kokugo-bun-shugo-2', label: '主語・述語②', grade: 3 },
            ],
          },
          {
            id: 'kokugo-bun-tsunagi',
            label: 'つなぎ言葉',
            quizSets: [
              { id: 'kokugo-bun-tsunagi-1', label: 'つなぎ言葉①', grade: 2 },
              { id: 'kokugo-bun-tsunagi-2', label: 'つなぎ言葉②', grade: 3 },
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
            id: 'sansu-keisan-hissan',
            label: 'ひっ算',
            quizSets: [
              { id: 'sansu-keisan-hissan-1', label: 'ひっ算①', grade: 2 },
              { id: 'sansu-keisan-hissan-2', label: 'ひっ算②', grade: 2 },
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
        id: 'sansu-okisa',
        label: '数と大きさ',
        categories: [
          {
            id: 'sansu-okisa-ogakazu',
            label: '大きな数',
            quizSets: [
              { id: 'sansu-okisa-ogakazu-1', label: '大きな数①', grade: 2 },
              { id: 'sansu-okisa-ogakazu-2', label: '大きな数②', grade: 2 },
            ],
          },
          {
            id: 'sansu-okisa-tokei',
            label: '時刻',
            quizSets: [
              { id: 'sansu-okisa-tokei-1', label: '時刻①', grade: 2 },
              { id: 'sansu-okisa-tokei-2', label: '時刻②', grade: 2 },
            ],
          },
          {
            id: 'sansu-okisa-kasa',
            label: '水のかさ',
            quizSets: [
              { id: 'sansu-okisa-kasa-1', label: '水のかさ①', grade: 2 },
              { id: 'sansu-okisa-kasa-2', label: '水のかさ②', grade: 2 },
            ],
          },
          {
            id: 'sansu-okisa-nagasa',
            label: '長さ',
            quizSets: [
              { id: 'sansu-okisa-nagasa-1', label: '長さ①', grade: 2 },
              { id: 'sansu-okisa-nagasa-2', label: '長さ②', grade: 2 },
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
