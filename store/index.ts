import newsReducer from '@/features/news/model/store/newsSlice'
import savedNewsReducer from '@/features/news/model/store/savedNewsSlice'
import usersReducer from '@/features/users/model/store/usersSlice'

import {
    combineReducers,
    configureStore,
} from '@reduxjs/toolkit'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { persistReducer, persistStore } from 'redux-persist'

// Combine all reducers
const rootReducer = combineReducers({
    news: newsReducer,
    users: usersReducer,
    savedNews: savedNewsReducer,
})

// Persist configuration - only persist savedNews slice
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['savedNews'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable to avoid redux-persist warnings
        }),
})

// Persistor instance for PersistGate
export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Re-export hooks
export { useAppDispatch, useAppSelector } from './hooks'
