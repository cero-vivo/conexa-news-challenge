import { User } from '../entities/User'

export interface IUsersGateway {
    getUsers(): Promise<User[]>
    getUserById(id: string): Promise<User>
} 