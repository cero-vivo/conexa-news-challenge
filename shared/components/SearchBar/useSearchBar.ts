import { useCallback, useEffect, useRef, useState } from 'react'

interface Params {
  onSearch: (q: string) => void
  onClear?: () => void
  debounceMs?: number
}

export const useSearchBar = ({ onSearch, onClear, debounceMs = 600 }: Params) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text)
    setIsSearching(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      onSearch(text)
      setIsSearching(false)
    }, debounceMs)
  }, [onSearch, debounceMs])

  const handleClear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setSearchQuery('')
    onSearch('')
    onClear?.()
    setIsSearching(false)
  }, [onSearch, onClear])

  useEffect(() => () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }, [])

  return { searchQuery, handleSearchChange, handleClear, isSearching }
} 