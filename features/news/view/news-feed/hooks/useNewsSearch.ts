import { News } from '@/features/news/model/entities/News'
import { useMemo, useState } from 'react'

export const useNewsSearch = (news: News[]) => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query.trim()) return news
    const q = query.toLowerCase()
    return news.filter(n => n.title.toLowerCase().includes(q)/*  || n.content.toLowerCase().includes(q) */)
  }, [news, query])

  return { filteredNews: filtered, handleSearch: setQuery, handleClear: () => setQuery('') }
} 