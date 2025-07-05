import { IUsersGateway } from '@/features/users/model/gateways/IUsersGateway'
import { IUsersPresenter, IUsersScreen } from '@/features/users/model/presenter/IUsersPresenter'

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