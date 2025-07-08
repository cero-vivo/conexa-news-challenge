import { apiClient } from '@/constants/ApiClient'
import { Endpoints } from '@/constants/Endpoints'
import { User } from '@/features/users/model/entities/User'
import { IUsersGateway } from '@/features/users/model/gateways/IUsersGateway'

export const HttpUsersGateway = () : IUsersGateway => {
    return {
        getUsers: async() : Promise<User[]> => {
            try {
                const response = await apiClient.get<User[]>(Endpoints.usersFeed.getAll)
                return response.data
            } catch (error) {
                console.log('Error fetching users:', error);
                throw error;
            }
        }
    }
}


