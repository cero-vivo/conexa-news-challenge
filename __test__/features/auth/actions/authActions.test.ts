import { AuthActions } from '@/features/auth/model/actions/AuthActions';
import { AuthUser } from '@/features/auth/model/entities/AuthUser';

describe('AuthActions', () => {
  const sampleUser: AuthUser = { id: '1', email: 'a@b.com', name: 'a', isAnonymous: false, createdAt: '' };

  it('login delega al gateway', async () => {
    const gatewayMock = { login: jest.fn().mockResolvedValue(sampleUser) };
    const actions = AuthActions(gatewayMock as any);

    const result = await actions.login('a@b.com', 'x');
    expect(gatewayMock.login).toHaveBeenCalledWith('a@b.com', 'x');
    expect(result).toBe(sampleUser);
  });

  it('register delega al gateway', async () => {
    const gatewayMock = { register: jest.fn().mockResolvedValue(sampleUser) };
    const actions = AuthActions(gatewayMock as any);
    await actions.register('a@b.com', 'x', 'A');
    expect(gatewayMock.register).toHaveBeenCalledWith('a@b.com', 'x', 'A');
  });

  it('loginAnonymous delega al gateway', async () => {
    const gatewayMock = { loginAnonymous: jest.fn().mockResolvedValue(sampleUser) };
    const actions = AuthActions(gatewayMock as any);
    await actions.loginAnonymous();
    expect(gatewayMock.loginAnonymous).toHaveBeenCalled();
  });

  it('logout delega al gateway', async () => {
    const gatewayMock = { logout: jest.fn().mockResolvedValue(undefined) };
    const actions = AuthActions(gatewayMock as any);
    await actions.logout();
    expect(gatewayMock.logout).toHaveBeenCalled();
  });
}); 