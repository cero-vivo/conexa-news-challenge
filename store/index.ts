import newsReducer from '@/features/news/model/store/newsSlice'
import usersReducer from '@/features/users/model/store/usersSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
    reducer: {
        news: newsReducer,
        users: usersReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Re-export hooks
export { useAppDispatch, useAppSelector } from './hooks'
