import { AuthPresenter } from '../../../../features/auth/infrastructure/presenters/AuthPresenter';
import { AuthUser } from '../../../../features/auth/model/entities/AuthUser';
import { IAuthGateway } from '../../../../features/auth/model/gateways/IAuthGateway';

describe('AuthPresenter', () => {
  const sampleUser: AuthUser = {
    id: '1',
    email: 'john@example.com',
    name: 'John',
    isAnonymous: false,
    createdAt: '2024-01-01T00:00:00Z',
  };

  const createGatewayMock = (): jest.Mocked<IAuthGateway> => ({
    login: jest.fn(),
    register: jest.fn(),
    loginAnonymous: jest.fn(),
    logout: jest.fn(),
  });

  const createScreenMock = () => ({
    loginSuccess: jest.fn(),
    loginError: jest.fn(),
    registerSuccess: jest.fn(),
    registerError: jest.fn(),
    anonymousLoginSuccess: jest.fn(),
    anonymousLoginError: jest.fn(),
    logoutSuccess: jest.fn(),
    logoutError: jest.fn(),
  });

  it('login éxito: debe llamar loginSuccess y devolver success true', async () => {
    const gateway = createGatewayMock();
    gateway.login.mockResolvedValue(sampleUser);
    const screen = createScreenMock();

    const presenter = AuthPresenter(gateway, screen);
    const result = await presenter.login('john@example.com', '123456');

    expect(gateway.login).toHaveBeenCalledWith('john@example.com', '123456');
    expect(screen.loginSuccess).toHaveBeenCalledWith(sampleUser);
    expect(result).toEqual({ success: true });
  });

  it('login error: debe llamar loginError y devolver success false', async () => {
    const gateway = createGatewayMock();
    const err = new Error('invalid');
    gateway.login.mockRejectedValue(err);
    const screen = createScreenMock();

    const presenter = AuthPresenter(gateway, screen);
    const result = await presenter.login('x', 'y');

    expect(screen.loginError).toHaveBeenCalledWith(err);
    expect(result.success).toBe(false);
  });

  it('register éxito: debe llamar registerSuccess', async () => {
    const gateway = createGatewayMock();
    gateway.register.mockResolvedValue(sampleUser);
    const screen = createScreenMock();

    const presenter = AuthPresenter(gateway, screen);
    await presenter.register('john@example.com', '123', 'John');

    expect(gateway.register).toHaveBeenCalledWith('john@example.com', '123', 'John');
    expect(screen.registerSuccess).toHaveBeenCalledWith(sampleUser);
  });

  it('loginAnonymous éxito', async () => {
    const gateway = createGatewayMock();
    gateway.loginAnonymous.mockResolvedValue({ ...sampleUser, isAnonymous: true });
    const screen = createScreenMock();

    const presenter = AuthPresenter(gateway, screen);
    await presenter.loginAnonymous();

    expect(gateway.loginAnonymous).toHaveBeenCalled();
    expect(screen.anonymousLoginSuccess).toHaveBeenCalled();
  });

  it('logout éxito', async () => {
    const gateway = createGatewayMock();
    gateway.logout.mockResolvedValue();
    const screen = createScreenMock();

    const presenter = AuthPresenter(gateway, screen);
    await presenter.logout();

    expect(gateway.logout).toHaveBeenCalled();
    expect(screen.logoutSuccess).toHaveBeenCalled();
  });
}); 