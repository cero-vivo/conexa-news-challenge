import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigUIState {
  showOnboarding: boolean
  language: 'es' | 'en'
}

const initialState: ConfigUIState = {
  showOnboarding: true,
  language: 'es',
}

const configUISlice = createSlice({
  name: 'configUI',
  initialState,
  reducers: {
    setShowOnboarding: (state, action: PayloadAction<boolean>) => {
      state.showOnboarding = action.payload
    },
    setLanguage: (state, action: PayloadAction<'es' | 'en'>) => {
      state.language = action.payload
    }
  },
})

export const { setShowOnboarding, setLanguage } = configUISlice.actions
export default configUISlice.reducer 