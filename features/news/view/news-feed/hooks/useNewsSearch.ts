import { News } from '@/features/news/model/entities/News'
import { useMemo, useState } from 'react'

export const useNewsSearch = (news: News[]) => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return news
    const q = query.toLowerCase().trim()

    return news.filter((n) => {
      const title = n.title.toLowerCase()
      const queryWords = q.split(/\s+/).filter(word => word.length > 0)

      if (queryWords.length === 0) return true

      return queryWords.every(queryWord => {
        const titleWords = title.split(/\s+/)
        return titleWords.some(titleWord =>
          titleWord.includes(queryWord) || queryWord.includes(titleWord)
        )
      })
    })
  }, [news, query])

  return { filteredNews: filtered, handleSearch: setQuery, handleClear: () => setQuery('') }
}  