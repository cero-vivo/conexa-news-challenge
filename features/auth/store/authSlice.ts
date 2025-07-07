import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthUser } from '../entities/AuthUser'

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  loading: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: 'idle',
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = 'succeeded'
      state.error = null
    },
    loginStart: (state) => {
      state.loading = 'loading'
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = 'succeeded'
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = 'failed'
      state.error = action.payload
    },
    registerStart: (state) => {
      state.loading = 'loading'
      state.error = null
    },
    registerSuccess: (state, action: PayloadAction<AuthUser>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = 'succeeded'
      state.error = null
    },
    registerFailure: (state, action: PayloadAction<string>) => {
      state.loading = 'failed'
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.loading = 'idle'
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    }
  }
})

export const { 
  setUser, 
  loginStart, 
  loginSuccess, 
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout, 
  clearError 
} = authSlice.actions

export default authSlice.reducer 