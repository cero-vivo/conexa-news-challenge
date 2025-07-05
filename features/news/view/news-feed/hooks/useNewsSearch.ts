import { News } from '@/features/news/model/entities/News'
import { useMemo, useState } from 'react'

export const useNewsSearch = (news: News[]) => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return news
    const q = query.toLowerCase().trim()

    return news.filter(n => {
      const titleWords = n.title.toLowerCase().split(/\s+/)
      return titleWords.some(w => q.includes(w))
    })
  }, [news, query])

  return { filteredNews: filtered, handleSearch: setQuery, handleClear: () => setQuery('') }
} 