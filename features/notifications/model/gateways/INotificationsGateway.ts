import { Notification } from '@/features/notifications/model/entities/Notification'

export interface INotificationsGateway {
  requestPermissions(): Promise<boolean>
  scheduleNotification(title: string, body: string, delaySeconds: number): Promise<string>
  getNotifications(): Promise<Notification[]>
  markAsRead(id: string): Promise<void>
  markAllAsRead(): Promise<void>
  deleteNotification(id: string): Promise<void>
  clearAll(): Promise<void>
} 