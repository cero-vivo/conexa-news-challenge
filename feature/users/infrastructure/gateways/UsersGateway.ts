import { User } from '@/feature/users/model/entities/User'
import { IUsersGateway } from '@/feature/users/model/gateways/IUsersGateway'

export class HttpUsersGateway implements IUsersGateway {
    async getUsers(): Promise<User[]> {
        try {
            const response = await fetch('https://jsonplaceholder.org/users')
            if (!response.ok) {
                throw new Error('Failed to fetch users')
            }
            const data = await response.json()
            return data as User[]
        } catch (error) {
            throw new Error('Error fetching users')
        }
    }

    async getUserById(id: string): Promise<User> {
        try {
            const response = await fetch(`https://jsonplaceholder.org/users/${id}`)
            if (!response.ok) {
                throw new Error('Failed to fetch user')
            }
            const data = await response.json()
            return data as User
        } catch (error) {
            throw new Error('Error fetching user')
        }
    }
} 