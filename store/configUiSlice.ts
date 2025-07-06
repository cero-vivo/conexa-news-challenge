import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigUIState {
  language: 'es' | 'en'
  theme: 'system' | 'light' | 'dark'
}

const initialState: ConfigUIState = {
  language: 'es',
  theme: 'system',
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
    }
  },
})

export const { setLanguage, setTheme, toggleTheme } = configUISlice.actions
export default configUISlice.reducer 