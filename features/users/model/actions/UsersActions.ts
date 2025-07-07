import { User } from '../entities/User';
import { IUsersGateway } from '../gateways/IUsersGateway';

export interface IUsersActions {
  getUsers: () => Promise<User[]>;
}

export const UsersActions = (gateway: IUsersGateway): IUsersActions => {
  return {
    getUsers: () => gateway.getUsers(),
  };
}; 