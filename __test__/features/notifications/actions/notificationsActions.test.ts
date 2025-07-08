import { NotificationsActions } from '@/features/notifications/model/actions/NotificationsActions';

describe('NotificationsActions', () => {
  it('delegan correctamente al gateway', async () => {
    const gw = {
      requestPermissions: jest.fn().mockResolvedValue(true),
      scheduleNotification: jest.fn().mockResolvedValue('id'),
      getNotifications: jest.fn().mockResolvedValue([]),
      markAsRead: jest.fn(),
      markAllAsRead: jest.fn(),
      deleteNotification: jest.fn(),
      clearAll: jest.fn(),
    };
    const actions = NotificationsActions(gw as any);
    await actions.requestPermissions();
    expect(gw.requestPermissions).toHaveBeenCalled();
    await actions.scheduleNotification('t','b',1);
    expect(gw.scheduleNotification).toHaveBeenCalled();
    await actions.getNotifications();
    expect(gw.getNotifications).toHaveBeenCalled();
    await actions.markAsRead('1');
    expect(gw.markAsRead).toHaveBeenCalledWith('1');
    await actions.markAllAsRead();
    expect(gw.markAllAsRead).toHaveBeenCalled();
    await actions.deleteNotification('2');
    expect(gw.deleteNotification).toHaveBeenCalledWith('2');
    await actions.clearAll();
    expect(gw.clearAll).toHaveBeenCalled();
  });
}); 