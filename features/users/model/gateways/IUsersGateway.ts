import { User } from '../entities/User'

export interface IUsersGateway {
    getUsers(): Promise<User[]>
} 