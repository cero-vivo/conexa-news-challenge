import { News } from '@/feature/news/model/entities/News'
import { useEffect, useState } from 'react'

interface UseNewsDetailScreenProps {
    newsId: string
}

interface UseNewsDetailScreenReturn {
    news: News | null
    loading: boolean
    error: string | null
    refetch: () => void
}

export const useNewsDetailScreen = ({ newsId }: UseNewsDetailScreenProps): UseNewsDetailScreenReturn => {
    const [news, setNews] = useState<News | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchNewsDetail = async () => {
        try {
            setLoading(true)
            setError(null)
            
            // Simular llamada a API - en un caso real, esto vendría de tu API
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${newsId}`)
            if (!response.ok) {
                throw new Error('Failed to fetch news detail')
            }
            
            const data = await response.json()
            
            // Transformar los datos al formato de News
            const newsData: News = {
                id: data.id,
                slug: data.title.toLowerCase().replace(/\s+/g, '-'),
                url: `https://example.com/news/${data.id}`,
                title: data.title,
                content: data.body,
                image: `https://picsum.photos/800/400?random=${data.id}`,
                thumbnail: `https://picsum.photos/200/200?random=${data.id}`,
                status: 'published' as any,
                category: 'General',
                publishedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                userId: data.userId || 1
            }
            
            setNews(newsData)
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (newsId) {
            fetchNewsDetail()
        }
    }, [newsId])

    return {
        news,
        loading,
        error,
        refetch: fetchNewsDetail
    }
} 