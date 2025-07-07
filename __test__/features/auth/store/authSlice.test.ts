import { AuthUser } from '@/features/auth/model/entities/AuthUser';
import authReducer, { clearError, loginFailure, loginStart, loginSuccess, logout, registerFailure, registerStart, registerSuccess, setUser } from '@/features/auth/store/authSlice';

describe('authSlice', () => {
  const user: AuthUser = { id: '1', email: 'x@y.com', name: 'X', isAnonymous: false, createdAt: '' };

  it('setUser establece usuario autenticado', () => {
    const state = authReducer(undefined, setUser(user));
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
    expect(state.loading).toBe('succeeded');
  });

  it('loginStart cambia loading a loading', () => {
    const st = authReducer(undefined, loginStart());
    expect(st.loading).toBe('loading');
    expect(st.error).toBeNull();
  });

  it('loginSuccess actualiza usuario y estado', () => {
    const st = authReducer(undefined, loginSuccess(user));
    expect(st.user).toEqual(user);
    expect(st.isAuthenticated).toBe(true);
  });

  it('loginFailure establece error y failed', () => {
    const st = authReducer(undefined, loginFailure('bad'));
    expect(st.error).toBe('bad');
    expect(st.loading).toBe('failed');
  });

  it('register flow funciona', () => {
    let st = authReducer(undefined, registerStart());
    expect(st.loading).toBe('loading');
    st = authReducer(st, registerSuccess(user));
    expect(st.loading).toBe('succeeded');
    st = authReducer(st, registerFailure('err'));
    expect(st.loading).toBe('failed');
  });

  it('logout limpia estado', () => {
    const st = authReducer(undefined, logout());
    expect(st.user).toBeNull();
    expect(st.isAuthenticated).toBe(false);
    expect(st.loading).toBe('idle');
  });

  it('clearError resetea error', () => {
    const st = authReducer(undefined, loginFailure('oops'));
    const cleared = authReducer(st, clearError());
    expect(cleared.error).toBeNull();
  });
}); 