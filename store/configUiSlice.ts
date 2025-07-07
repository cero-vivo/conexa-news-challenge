import AsyncStorage from '@react-native-async-storage/async-storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '.'

interface ConfigUIState {
  language: 'es' | 'en'
  theme: 'system' | 'light' | 'dark'
  showOnboarding: boolean
}

const initialState: ConfigUIState = {
  language: 'es',
  theme: 'system',
  showOnboarding: true,
}

const configUISlice = createSlice({
  name: 'configUI',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'es' | 'en'>) => {
      state.language = action.payload
    },
    setTheme: (state, action: PayloadAction<'system' | 'light' | 'dark'>) => {
      state.theme = action.payload
    },
    toggleTheme: (state) => {
      if (state.theme === 'light') state.theme = 'dark'
      else if (state.theme === 'dark') state.theme = 'light'
      else {
        // If system, default to light first toggle
        state.theme = 'light'
      }
    },
    setShowOnboarding: (state, action: PayloadAction<boolean>) => {
      state.showOnboarding = action.payload
    },
  },
})

export const { setLanguage, setTheme, toggleTheme, setShowOnboarding } = configUISlice.actions

// Thunk Action to persist flag in AsyncStorage and update state
export const persistShowOnboarding = (value: boolean) =>
  async (dispatch: AppDispatch) => {
    await AsyncStorage.setItem('show_onboarding', JSON.stringify(value))
    dispatch(setShowOnboarding(value))
  }

export default configUISlice.reducer 