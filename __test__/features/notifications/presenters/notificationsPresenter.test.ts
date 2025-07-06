import { createNotificationsPresenter } from '../../../../features/notifications/infrastructure/presenters/NotificationsPresenter';
import { Notification } from '../../../../features/notifications/model/entities/Notification';
import { INotificationsGateway } from '../../../../features/notifications/model/gateways/INotificationsGateway';

describe('NotificationsPresenter', () => {
  const sampleNotifications: Notification[] = [
    { id: '1', title: 'Hi', body: 'there', isRead: false, timestamp: '2024-01-01T00:00:00Z' } as unknown as Notification,
  ];

  const createGatewayMock = (): jest.Mocked<INotificationsGateway> => ({
    requestPermissions: jest.fn(),
    scheduleNotification: jest.fn(),
    getNotifications: jest.fn(),
    markAsRead: jest.fn(),
    markAllAsRead: jest.fn(),
    deleteNotification: jest.fn(),
    clearAll: jest.fn(),
  });

  it('scheduleWelcomeNotifications no programa cuando permisos denegados', async () => {
    const gateway = createGatewayMock();
    gateway.requestPermissions.mockResolvedValue(false);
    const presenter = createNotificationsPresenter(gateway);

    await presenter.scheduleWelcomeNotifications();

    expect(gateway.requestPermissions).toHaveBeenCalled();
    expect(gateway.scheduleNotification).not.toHaveBeenCalled();
  });

  it('scheduleWelcomeNotifications programa 2 notificaciones cuando permisos concedidos', async () => {
    const gateway = createGatewayMock();
    gateway.requestPermissions.mockResolvedValue(true);
    gateway.scheduleNotification.mockResolvedValue('ok');

    const presenter = createNotificationsPresenter(gateway);

    await presenter.scheduleWelcomeNotifications();

    expect(gateway.scheduleNotification).toHaveBeenCalledTimes(2);
  });

  it('getNotifications retorna lista', async () => {
    const gateway = createGatewayMock();
    gateway.getNotifications.mockResolvedValue(sampleNotifications);

    const presenter = createNotificationsPresenter(gateway);
    const result = await presenter.getNotifications();

    expect(gateway.getNotifications).toHaveBeenCalled();
    expect(result).toEqual(sampleNotifications);
  });
}); 