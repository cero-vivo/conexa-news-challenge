import { IUsersGateway } from '@/feature/users/model/gateways/IUsersGateway'
import { IUsersPresenter, IUsersScreen } from '@/feature/users/model/presenter/IUsersPresenter'

export const UsersPresenter = (gateway: IUsersGateway) => {
    return (screen: IUsersScreen): IUsersPresenter => {
        return {
            getUsers: async () => {
                try {
                    const users = await gateway.getUsers()
                    screen.getUsersSuccess(users)
                } catch (error) {
                    screen.getUsersError(error)
                }
            }
        }
    }
} 