import { UsersPresenter } from '../../../../features/users/infrastructure/presenters/UsersPresenter';
import { User } from '../../../../features/users/model/entities/User';
import { IUsersGateway } from '../../../../features/users/model/gateways/IUsersGateway';

describe('UsersPresenter', () => {
  const sampleUsers: User[] = [
    ({ id: 1 } as unknown as User),
  ];

  const createGatewayMock = (): jest.Mocked<IUsersGateway> => ({
    getUsers: jest.fn(),
  });

  const createScreenMock = () => ({
    getUsersSuccess: jest.fn(),
    getUsersError: jest.fn(),
  });

  it('debe invocar getUsersSuccess cuando gateway responde OK', async () => {
    const gateway = createGatewayMock();
    gateway.getUsers.mockResolvedValue(sampleUsers);

    const screen = createScreenMock();

    const presenter = UsersPresenter(gateway)(screen);
    await presenter.getUsers();

    expect(gateway.getUsers).toHaveBeenCalled();
    expect(screen.getUsersSuccess).toHaveBeenCalledWith(sampleUsers);
  });

  it('debe invocar getUsersError cuando gateway lanza error', async () => {
    const gateway = createGatewayMock();
    const err = new Error('fail');
    gateway.getUsers.mockRejectedValue(err);

    const screen = createScreenMock();
    const presenter = UsersPresenter(gateway)(screen);

    await presenter.getUsers();

    expect(screen.getUsersError).toHaveBeenCalledWith(err);
  });
}); 