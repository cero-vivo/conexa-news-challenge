import { UsersPresenter } from '../../../../features/users/infrastructure/presenters/UsersPresenter';
import { IUsersActions } from '../../../../features/users/model/actions/UsersActions';
import { User } from '../../../../features/users/model/entities/User';

describe('UsersPresenter', () => {
  const sampleUsers: User[] = [
    ({ id: 1 } as unknown as User),
  ];

  const createActionsMock = (): jest.Mocked<IUsersActions> => ({
    getUsers: jest.fn(),
  });

  const createScreenMock = () => ({
    getUsersSuccess: jest.fn(),
    getUsersError: jest.fn(),
  });

  it('debe invocar getUsersSuccess cuando gateway responde OK', async () => {
    const actions = createActionsMock();
    actions.getUsers.mockResolvedValue(sampleUsers);

    const screen = createScreenMock();

    const presenter = UsersPresenter(actions, screen);
    await presenter.getUsers();

    expect(actions.getUsers).toHaveBeenCalled();
    expect(screen.getUsersSuccess).toHaveBeenCalledWith(sampleUsers);
  });

  it('debe invocar getUsersError cuando gateway lanza error', async () => {
    const actions = createActionsMock();
    const err = new Error('fail');
    actions.getUsers.mockRejectedValue(err);

    const screen = createScreenMock();
    const presenter = UsersPresenter(actions, screen);

    await presenter.getUsers();

    expect(screen.getUsersError).toHaveBeenCalledWith(err);
  });
}); 