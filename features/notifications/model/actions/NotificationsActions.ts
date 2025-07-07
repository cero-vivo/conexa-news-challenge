import { Notification } from '../entities/Notification';
import { INotificationsGateway } from '../gateways/INotificationsGateway';

export interface INotificationsActions {
  requestPermissions: () => Promise<boolean>;
  scheduleNotification: (title: string, body: string, delaySeconds: number) => Promise<string>;
  getNotifications: () => Promise<Notification[]>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAll: () => Promise<void>;
}

export const NotificationsActions = (gateway: INotificationsGateway): INotificationsActions => ({
  requestPermissions: () => gateway.requestPermissions(),
  scheduleNotification: (title, body, delay) => gateway.scheduleNotification(title, body, delay),
  getNotifications: () => gateway.getNotifications(),
  markAsRead: (id) => gateway.markAsRead(id),
  markAllAsRead: () => gateway.markAllAsRead(),
  deleteNotification: (id) => gateway.deleteNotification(id),
  clearAll: () => gateway.clearAll(),
}); 