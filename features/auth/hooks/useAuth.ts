import { Routes } from '@/constants/Routes'
import {
    clearError,
    loginFailure,
    loginStart,
    loginSuccess,
    logout,
    registerFailure,
    registerStart,
    registerSuccess,
    User
} from '@/features/auth/model/store/authSlice'
import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'expo-router'
import { useCallback } from 'react'

export const useAuth = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, isAuthenticated, loading, error } = useAppSelector((state) => state.auth)

  // Debug log for authentication state
  console.log("🔐 useAuth hook - isAuthenticated:", isAuthenticated, "user:", user?.name || 'null');

  const login = useCallback(async (email: string, password: string) => {
    dispatch(loginStart())
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0], // Use email prefix as name
        isAnonymous: false,
        createdAt: new Date().toISOString(),
        avatar: require('@/assets/images/me.jpeg')
      }
      
      dispatch(loginSuccess(mockUser))
      return { success: true }
    } catch (err) {
      dispatch(loginFailure('Error al iniciar sesión'))
      return { success: false, error: 'Error al iniciar sesión' }
    }
  }, [dispatch])

  const register = useCallback(async (email: string, password: string, name: string) => {
    dispatch(registerStart())
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user data
      const mockUser: User = {
        id: Date.now().toString(),
        email,
        name,
        isAnonymous: false,
        createdAt: new Date().toISOString(),
        avatar: require('@/assets/images/me.jpeg')
      }
      
      dispatch(registerSuccess(mockUser))
      return { success: true }
    } catch (err) {
      dispatch(registerFailure('Error al registrarse'))
      return { success: false, error: 'Error al registrarse' }
    }
  }, [dispatch])

  const loginAnonymous = useCallback(async () => {
    dispatch(loginStart())
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Mock anonymous user
      const anonymousUser: User = {
        id: 'anonymous_' + Date.now(),
        email: 'anonymous@user.com',
        name: 'Usuario Anónimo',
        isAnonymous: true,
        createdAt: new Date().toISOString()
      }
      
      dispatch(loginSuccess(anonymousUser))
      return { success: true }
    } catch (err) {
      dispatch(loginFailure('Error al entrar como anónimo'))
      return { success: false, error: 'Error al entrar como anónimo' }
    }
  }, [dispatch])

  const logoutUser = useCallback(() => {
    console.log("🚪 Logging out user...")
    dispatch(logout())
    console.log("✅ Logout action dispatched")
    
    // Force navigation to auth screen after logout
    setTimeout(() => {
      console.log("🔄 Force navigating to auth after logout")
      router.replace(Routes.AUTH)
    }, 100)
  }, [dispatch, router])

  const clearAuthError = useCallback(() => {
    dispatch(clearError())
  }, [dispatch])

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    loginAnonymous,
    logout: logoutUser,
    clearError: clearAuthError
  }
} 