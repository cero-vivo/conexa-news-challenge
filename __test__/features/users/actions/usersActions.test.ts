import { UsersActions } from '@/features/users/model/actions/UsersActions';
import { User } from '@/features/users/model/entities/User';

describe('UsersActions', () => {
  const sampleUsers: User[] = [({ id: 1 } as unknown as User)];

  it('resuelve con la lista cuando el gateway responde OK', async () => {
    const gatewayMock = {
      getUsers: jest.fn().mockResolvedValue(sampleUsers),
    };

    const actions = UsersActions(gatewayMock as any);

    const result = await actions.getUsers();

    expect(gatewayMock.getUsers).toHaveBeenCalled();
    expect(result).toEqual(sampleUsers);
  });

  it('rechaza con el error cuando el gateway falla', async () => {
    const err = new Error('fail');
    const gatewayMock = {
      getUsers: jest.fn().mockRejectedValue(err),
    };

    const actions = UsersActions(gatewayMock as any);

    await expect(actions.getUsers()).rejects.toThrow('fail');
    expect(gatewayMock.getUsers).toHaveBeenCalled();
  });
}); 