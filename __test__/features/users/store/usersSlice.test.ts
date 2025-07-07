import { User } from '@/features/users/model/entities/User';
import usersReducer, { clearError, clearSelectedUser, setError, setLoading, setSelectedUser, setUsers } from '@/features/users/store/usersSlice';

describe('usersSlice', () => {
  const sampleUser: User = ({ id: 1, firstname: 'Jane', lastname: 'Doe' } as unknown as User);

  it('setUsers guarda la lista y actualiza loading', () => {
    const state = usersReducer(undefined, setUsers([sampleUser]));
    expect(state.users).toEqual([sampleUser]);
    expect(state.loading).toBe('succeeded');
    expect(state.error).toBeNull();
  });

  it('setSelectedUser y clearSelectedUser gestionan selección', () => {
    const selected = usersReducer(undefined, setSelectedUser(sampleUser));
    expect(selected.selectedUser).toEqual(sampleUser);
    const cleared = usersReducer(selected, clearSelectedUser());
    expect(cleared.selectedUser).toBeNull();
  });

  it('setLoading cambia el estado de carga', () => {
    const loadingState = usersReducer(undefined, setLoading('loading'));
    expect(loadingState.loading).toBe('loading');
  });

  it('setError establece mensaje y marca failed', () => {
    const errorState = usersReducer(undefined, setError('oops'));
    expect(errorState.error).toBe('oops');
    expect(errorState.loading).toBe('failed');
  });

  it('clearError limpia el error', () => {
    const withError = usersReducer(undefined, setError('x'));
    const cleared = usersReducer(withError, clearError());
    expect(cleared.error).toBeNull();
  });
}); 