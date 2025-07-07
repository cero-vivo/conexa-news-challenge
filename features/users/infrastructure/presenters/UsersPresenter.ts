import { IUsersActions } from '@/features/users/model/actions/UsersActions'
import { IUsersPresenter, IUsersScreen } from '@/features/users/model/presenter/IUsersPresenter'

export const UsersPresenter = (actions: IUsersActions, screen: IUsersScreen): IUsersPresenter => {
    return {
        getUsers: async () => {
            try {
                const users = await actions.getUsers()
                screen.getUsersSuccess(users)
            } catch (error) {
                screen.getUsersError(error)
            }
        }
    }
} 