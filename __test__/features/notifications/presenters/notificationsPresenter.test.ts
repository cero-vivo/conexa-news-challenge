import { createNotificationsPresenter } from '../../../../features/notifications/infrastructure/presenters/NotificationsPresenter';
import { INotificationsActions } from '../../../../features/notifications/model/actions/NotificationsActions';
import { Notification } from '../../../../features/notifications/model/entities/Notification';

describe('NotificationsPresenter', () => {
  const sampleNotifications: Notification[] = [
    { id: '1', title: 'Hi', body: 'there', isRead: false, timestamp: '2024-01-01T00:00:00Z' } as unknown as Notification,
  ];

  const createActionsMock = (): jest.Mocked<INotificationsActions> => ({
    requestPermissions: jest.fn(),
    scheduleNotification: jest.fn(),
    getNotifications: jest.fn(),
    markAsRead: jest.fn(),
    markAllAsRead: jest.fn(),
    deleteNotification: jest.fn(),
    clearAll: jest.fn(),
  });

  it('scheduleWelcomeNotifications no programa cuando permisos denegados', async () => {
    const actions = createActionsMock();
    actions.requestPermissions.mockResolvedValue(false);
    const presenter = createNotificationsPresenter(actions);

    await presenter.scheduleWelcomeNotifications();

    expect(actions.requestPermissions).toHaveBeenCalled();
    expect(actions.scheduleNotification).not.toHaveBeenCalled();
  });

  it('scheduleWelcomeNotifications programa 2 notificaciones cuando permisos concedidos', async () => {
    const actions = createActionsMock();
    actions.requestPermissions.mockResolvedValue(true);
    actions.scheduleNotification.mockResolvedValue('ok');

    const presenter = createNotificationsPresenter(actions);

    await presenter.scheduleWelcomeNotifications();

    expect(actions.scheduleNotification).toHaveBeenCalledTimes(2);
  });

  it('getNotifications retorna lista', async () => {
    const actions = createActionsMock();
    actions.getNotifications.mockResolvedValue(sampleNotifications);

    const presenter = createNotificationsPresenter(actions);
    const result = await presenter.getNotifications();

    expect(actions.getNotifications).toHaveBeenCalled();
    expect(result).toEqual(sampleNotifications);
  });
}); 