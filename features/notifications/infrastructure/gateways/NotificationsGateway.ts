import { Notification } from '@/features/notifications/model/entities/Notification'
import { INotificationsGateway } from '@/features/notifications/model/gateways/INotificationsGateway'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'

const STORAGE_KEY = '@notifications'

export const createNotificationsGateway = (): INotificationsGateway => {
  const requestPermissions = async (): Promise<boolean> => {
    try {
      const { status } = await Notifications.requestPermissionsAsync()
      return status === 'granted'
    } catch (error) {
      console.log('Error requesting permissions', error)
      return false
    }
  }

  const scheduleNotification = async (
    title: string,
    body: string,
    delaySeconds: number
  ): Promise<string> => {
    const fireDate = new Date(Date.now() + delaySeconds * 1000)
    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: {},
      },
      trigger: { type: 'date', date: fireDate } as any,
    })
    return id
  }

  const getNotifications = async (): Promise<Notification[]> => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as Notification[]) : []
    } catch (error) {
      console.log('Error getting notifications', error)
      return []
    }
  }

  const saveNotifications = async (notifications: Notification[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notifications))
    } catch (error) {
      console.log('Error saving notifications', error)
    }
  }

  const markAsRead = async (id: string): Promise<void> => {
    const notifications = await getNotifications()
    const updated = notifications.map((n) =>
      n.id === id ? { ...n, isRead: true } : n
    )
    await saveNotifications(updated)
  }

  const markAllAsRead = async (): Promise<void> => {
    const notifications = await getNotifications()
    const updated = notifications.map((n) => ({ ...n, isRead: true }))
    await saveNotifications(updated)
  }

  const deleteNotification = async (id: string): Promise<void> => {
    const notifications = await getNotifications()
    const filtered = notifications.filter((n) => n.id !== id)
    await saveNotifications(filtered)
  }

  const clearAll = async (): Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_KEY)
  }

  return {
    requestPermissions,
    scheduleNotification,
    getNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAll,
  }
} 