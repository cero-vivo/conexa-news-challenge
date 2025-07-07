import { Endpoints } from '@/constants/Endpoints';
import { HttpUsersGateway } from '@/features/users/infrastructure/gateways/UsersGateway';
import { User } from '@/features/users/model/entities/User';

// Mock HTTP client
jest.mock('@/constants/ApiClient', () => ({
  apiClient: {
    get: jest.fn(),
  },
}));

import { apiClient } from '@/constants/ApiClient';

describe('HttpUsersGateway', () => {
  const sampleUsers: User[] = [
    ({ id: 1, firstname: 'John', lastname: 'Doe' } as unknown as User),
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('devuelve la lista de usuarios cuando la petición es exitosa', async () => {
    (apiClient.get as jest.Mock).mockResolvedValue({ data: sampleUsers, status: 200 });

    const gateway = HttpUsersGateway();
    const result = await gateway.getUsers();

    expect(apiClient.get).toHaveBeenCalledWith(Endpoints.usersFeed.getAll);
    expect(result).toEqual(sampleUsers);
  });

  it('propaga el error cuando la petición falla', async () => {
    const mockErr = new Error('network');
    (apiClient.get as jest.Mock).mockRejectedValue(mockErr);

    const gateway = HttpUsersGateway();

    await expect(gateway.getUsers()).rejects.toThrow('network');
    expect(apiClient.get).toHaveBeenCalledWith(Endpoints.usersFeed.getAll);
  });
}); 