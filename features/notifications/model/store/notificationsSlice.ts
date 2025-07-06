import { Notification } from '@/features/notifications/model/entities/Notification'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NotificationsState {
  notifications: Notification[]
  loading: boolean
  error: string | null
  unreadCount: number
}

const initialState: NotificationsState = {
  notifications: [],
  loading: false,
  error: null,
  unreadCount: 0,
}

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications: (state, action: PayloadAction<Notification[]>) => {
      state.notifications = action.payload
      state.unreadCount = action.payload.filter((n) => !n.isRead).length
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload)
      if (!action.payload.isRead) state.unreadCount++
    },
    markAsRead: (state, action: PayloadAction<string>) => {
      const notif = state.notifications.find((n) => n.id === action.payload)
      if (notif && !notif.isRead) {
        notif.isRead = true
        state.unreadCount--
      }
    },
    markAllAsRead: (state) => {
      state.notifications.forEach((n) => (n.isRead = true))
      state.unreadCount = 0
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const notif = state.notifications.find((n) => n.id === action.payload)
      if (notif && !notif.isRead) state.unreadCount--
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
    clearAll: (state) => {
      state.notifications = []
      state.unreadCount = 0
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
})

export const {
  setNotifications,
  addNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  clearAll,
  setLoading,
  setError,
} = notificationsSlice.actions

export default notificationsSlice.reducer 