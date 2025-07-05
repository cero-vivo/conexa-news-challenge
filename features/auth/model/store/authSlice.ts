import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  isAnonymous: boolean
  createdAt: string
}

interface AuthState {
  user: User | null
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
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuthenticated = true
      state.loading = 'succeeded'
      state.error = null
    },
    loginStart: (state) => {
      state.loading = 'loading'
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
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
    registerSuccess: (state, action: PayloadAction<User>) => {
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
      console.log("🔄 Logout reducer called")
      state.user = null
      state.isAuthenticated = false
      state.loading = 'idle'
      state.error = null
      console.log("✅ Logout state updated:", { user: state.user, isAuthenticated: state.isAuthenticated })
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