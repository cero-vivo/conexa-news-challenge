import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '../entities/User'

interface UsersState {
    users: User[]
    selectedUser: User | null
    loading: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: string | null
}

const initialState: UsersState = {
    users: [],
    selectedUser: null,
    loading: 'idle',
    error: null
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload
            state.loading = 'succeeded'
            state.error = null
        },
        setSelectedUser: (state, action: PayloadAction<User | null>) => {
            state.selectedUser = action.payload
        },
        clearSelectedUser: (state) => {
            state.selectedUser = null
        },
        setLoading: (state, action: PayloadAction<'idle' | 'loading' | 'succeeded' | 'failed'>) => {
            state.loading = action.payload
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload
            state.loading = 'failed'
        },
        clearError: (state) => {
            state.error = null
        }
    }
})

export const { 
    setUsers, 
    setSelectedUser, 
    clearSelectedUser, 
    setLoading, 
    setError, 
    clearError 
} = usersSlice.actions

export default usersSlice.reducer 