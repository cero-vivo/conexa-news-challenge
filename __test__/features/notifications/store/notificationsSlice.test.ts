import { Notification } from '@/features/notifications/model/entities/Notification';
import notificationsReducer, { addNotification, clearAll, deleteNotification, markAllAsRead, markAsRead, setNotifications } from '@/features/notifications/store/notificationsSlice';

describe('notificationsSlice', () => {
  const n1: Notification = { id: '1', title: 'hi', body: '', isRead: false } as Notification;
  const n2: Notification = { id: '2', title: 'bye', body: '', isRead: true } as Notification;

  it('setNotifications actualiza lista y unreadCount', () => {
    const state = notificationsReducer(undefined, setNotifications([n1,n2]));
    expect(state.notifications.length).toBe(2);
    expect(state.unreadCount).toBe(1);
  });

  it('addNotification incrementa unreadCount si no leída', () => {
    let st = notificationsReducer(undefined, setNotifications([]));
    st = notificationsReducer(st, addNotification(n1));
    expect(st.unreadCount).toBe(1);
  });

  it('markAsRead reduce contador', () => {
    let st = notificationsReducer(undefined, setNotifications([n1]));
    st = notificationsReducer(st, markAsRead('1'));
    expect(st.notifications[0].isRead).toBe(true);
    expect(st.unreadCount).toBe(0);
  });

  it('markAllAsRead pone contador a 0', () => {
    let st = notificationsReducer(undefined, setNotifications([n1,n2]));
    st = notificationsReducer(st, markAllAsRead());
    expect(st.unreadCount).toBe(0);
  });

  it('deleteNotification actualiza lista y contador', () => {
    let st = notificationsReducer(undefined, setNotifications([n1]));
    st = notificationsReducer(st, deleteNotification('1'));
    expect(st.notifications.length).toBe(0);
    expect(st.unreadCount).toBe(0);
  });

  it('clearAll vacía lista y contador', () => {
    let st = notificationsReducer(undefined, setNotifications([n1]));
    st = notificationsReducer(st, clearAll());
    expect(st.notifications.length).toBe(0);
    expect(st.unreadCount).toBe(0);
  });
}); 