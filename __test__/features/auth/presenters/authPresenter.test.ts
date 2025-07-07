import { AuthPresenter } from '../../../../features/auth/infrastructure/presenters/AuthPresenter';
import { IAuthActions } from '../../../../features/auth/model/actions/AuthActions';
import { AuthUser } from '../../../../features/auth/model/entities/AuthUser';

describe('AuthPresenter', () => {
  const sampleUser: AuthUser = {
    id: '1',
    email: 'john@example.com',
    name: 'John',
    isAnonymous: false,
    createdAt: '2024-01-01T00:00:00Z',
  };

  const createActionsMock = (): jest.Mocked<IAuthActions> => ({
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
    const actions = createActionsMock();
    actions.login.mockResolvedValue(sampleUser);
    const screen = createScreenMock();

    const presenter = AuthPresenter(actions, screen);
    const result = await presenter.login('john@example.com', '123456');

    expect(actions.login).toHaveBeenCalledWith('john@example.com', '123456');
    expect(screen.loginSuccess).toHaveBeenCalledWith(sampleUser);
    expect(result).toEqual({ success: true });
  });

  it('login error: debe llamar loginError y devolver success false', async () => {
    const actions = createActionsMock();
    const err = new Error('invalid');
    actions.login.mockRejectedValue(err);
    const screen = createScreenMock();

    const presenter = AuthPresenter(actions, screen);
    const result = await presenter.login('x', 'y');

    expect(screen.loginError).toHaveBeenCalledWith(err);
    expect(result.success).toBe(false);
  });

  it('register éxito: debe llamar registerSuccess', async () => {
    const actions = createActionsMock();
    actions.register.mockResolvedValue(sampleUser);
    const screen = createScreenMock();

    const presenter = AuthPresenter(actions, screen);
    await presenter.register('john@example.com', '123', 'John');

    expect(actions.register).toHaveBeenCalledWith('john@example.com', '123', 'John');
    expect(screen.registerSuccess).toHaveBeenCalledWith(sampleUser);
  });

  it('loginAnonymous éxito', async () => {
    const actions = createActionsMock();
    actions.loginAnonymous.mockResolvedValue({ ...sampleUser, isAnonymous: true });
    const screen = createScreenMock();

    const presenter = AuthPresenter(actions, screen);
    await presenter.loginAnonymous();

    expect(actions.loginAnonymous).toHaveBeenCalled();
    expect(screen.anonymousLoginSuccess).toHaveBeenCalled();
  });

  it('logout éxito', async () => {
    const actions = createActionsMock();
    actions.logout.mockResolvedValue();
    const screen = createScreenMock();

    const presenter = AuthPresenter(actions, screen);
    await presenter.logout();

    expect(actions.logout).toHaveBeenCalled();
    expect(screen.logoutSuccess).toHaveBeenCalled();
  });
}); 