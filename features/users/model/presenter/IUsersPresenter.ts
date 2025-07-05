import { User } from '../entities/User'

export interface IUsersScreen {
    getUsersSuccess(users: User[]): void
    getUsersError(error: any): void
}

export interface IUsersPresenter {
    getUsers(): void
} 