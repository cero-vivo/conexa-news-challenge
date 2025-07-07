import { createNotificationsGateway } from '@/features/notifications/infrastructure/gateways/NotificationsGateway';
import { Notification } from '@/features/notifications/model/entities/Notification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

jest.mock('expo-notifications', () => ({
  requestPermissionsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
}));

describe('NotificationsGateway', () => {
  const gateway = createNotificationsGateway();
  const STORAGE_KEY = '@notifications';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('requestPermissions devuelve true si permisos concedidos', async () => {
    (Notifications.requestPermissionsAsync as jest.Mock).mockResolvedValue({ status: 'granted' });
    expect(await gateway.requestPermissions()).toBe(true);
  });

  it('scheduleNotification llama a API y retorna id', async () => {
    (Notifications.scheduleNotificationAsync as jest.Mock).mockResolvedValue('123');
    const id = await gateway.scheduleNotification('t', 'b', 10);
    expect(id).toBe('123');
  });

  it('getNotifications devuelve array almacenado', async () => {
    const sample: Notification[] = [{ id: '1', title: 'hi', body: '', isRead: false } as Notification];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(sample));
    const result = await gateway.getNotifications();
    expect(result).toEqual(sample);
  });

  it('markAsRead actualiza notificación leída', async () => {
    const sample: Notification[] = [
      { id: '1', title: 'hi', body: '', isRead: false } as Notification,
    ];
    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(sample));
    const setMock = AsyncStorage.setItem as jest.Mock;
    await gateway.markAsRead('1');
    expect(setMock).toHaveBeenCalledWith(STORAGE_KEY, JSON.stringify([{ ...sample[0], isRead: true }]));
  });

  it('clearAll borra storage', async () => {
    await gateway.clearAll();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(STORAGE_KEY);
  });
}); 