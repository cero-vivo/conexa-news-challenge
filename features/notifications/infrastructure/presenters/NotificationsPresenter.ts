import { Notification } from '@/features/notifications/model/entities/Notification'
import { INotificationsGateway } from '@/features/notifications/model/gateways/INotificationsGateway'

export interface INotificationsPresenter {
	requestPermissions(): Promise<boolean>
	getNotifications(): Promise<Notification[]>
	markAsRead(id: string): Promise<void>
	markAllAsRead(): Promise<void>
	deleteNotification(id: string): Promise<void>
	clearAll(): Promise<void>
	scheduleWelcomeNotifications(): Promise<void>
}

export const createNotificationsPresenter = (gateway: INotificationsGateway): INotificationsPresenter => {
	const requestPermissions = async () => gateway.requestPermissions()

	const getNotifications = async () => gateway.getNotifications()

	const markAsRead = async (id: string) => gateway.markAsRead(id)

	const markAllAsRead = async () => gateway.markAllAsRead()

	const deleteNotification = async (id: string) => gateway.deleteNotification(id)

	const clearAll = async () => gateway.clearAll()

	const scheduleWelcomeNotifications = async () => {
		// Solicitar permisos primero
		const granted = await gateway.requestPermissions()
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
			await gateway.scheduleNotification(n.title, n.body, n.delay)
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