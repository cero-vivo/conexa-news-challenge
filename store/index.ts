import authReducer from '@/features/auth/store/authSlice'
import newsReducer from '@/features/news/store/newsSlice'
import savedNewsReducer from '@/features/news/store/savedNewsSlice'
import notificationsReducer from '@/features/notifications/store/notificationsSlice'
import usersReducer from '@/features/users/store/usersSlice'
import configUIReducer from './configUiSlice'

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
    configUI: configUIReducer,
    auth: authReducer,
    notifications: notificationsReducer,
})

// Persist configuration - persist auth and configUI slices
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['savedNews', 'configUI', 'auth', 'notifications'],
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
