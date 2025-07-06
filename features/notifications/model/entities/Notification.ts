export interface Notification {
  id: string
  title: string
  body: string
  isRead: boolean
  timestamp: string // ISO 8601 string para simplicidad
} 