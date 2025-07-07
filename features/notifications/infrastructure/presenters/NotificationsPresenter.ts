import { INotificationsActions } from '@/features/notifications/model/actions/NotificationsActions'
import { Notification } from '@/features/notifications/model/entities/Notification'

export interface INotificationsPresenter {
	requestPermissions(): Promise<boolean>
	getNotifications(): Promise<Notification[]>
	markAsRead(id: string): Promise<void>
	markAllAsRead(): Promise<void>
	deleteNotification(id: string): Promise<void>
	clearAll(): Promise<void>
	scheduleWelcomeNotifications(): Promise<void>
}

export const createNotificationsPresenter = (actions: INotificationsActions): INotificationsPresenter => {
	const requestPermissions = async () => actions.requestPermissions()

	const getNotifications = async () => actions.getNotifications()

	const markAsRead = async (id: string) => actions.markAsRead(id)

	const markAllAsRead = async () => actions.markAllAsRead()

	const deleteNotification = async (id: string) => actions.deleteNotification(id)

	const clearAll = async () => actions.clearAll()

	const scheduleWelcomeNotifications = async () => {
		// Solicitar permisos primero
		const granted = await actions.requestPermissions()
		if (!granted) {
			return
		}

		const notifications = [
			{
				delay: 10,
				title: '¡Hola Equipo de Conexa!',
				body:
					'Soy Luis Espinoza. Bienvenidos al challage. App con Clean Architecture, React Native + Expo, TypeScript y Redux.',
			},
			{
				delay: 15,
				title: 'Funciones Clave',
				body:
					'Feed de noticias con búsqueda instantánea y guardado offline, autenticación dummy, soporte multiidioma, UI adaptable con modo oscuro, Dev tools, notificaciones y más. ¡Explora y disfruta!',
			},
		]

		for (const n of notifications) {
			await actions.scheduleNotification(n.title, n.body, n.delay)
		}
	}

	return {
		requestPermissions,
		getNotifications,
		markAsRead,
		markAllAsRead,
		deleteNotification,
		clearAll,
		scheduleWelcomeNotifications,
	}
} 