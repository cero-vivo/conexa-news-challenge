import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { News } from '../entities/News'

interface NewsState {
    news: News[]
    selectedNews: News | null
    loading: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: NewsState = {
    news: [],
    selectedNews: null,
    loading: 'idle',
    error: null
}

const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {
        setSelectedNews: (state, action: PayloadAction<News | null>) => {
            state.selectedNews = action.payload
        },
        clearSelectedNews: (state) => {
            state.selectedNews = null
        },
        clearError: (state) => {
            state.error = null
        }
    }
})

export const { setSelectedNews, clearSelectedNews, clearError } = newsSlice.actions
export default newsSlice.reducer 