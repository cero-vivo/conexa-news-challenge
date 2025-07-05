import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigUIState {
  showOnboarding: boolean
}

const initialState: ConfigUIState = {
  showOnboarding: true,
}

const configUISlice = createSlice({
  name: 'configUI',
  initialState,
  reducers: {
    setShowOnboarding: (state, action: PayloadAction<boolean>) => {
      state.showOnboarding = action.payload
    },
    resetOnboarding: (state) => {
      state.showOnboarding = true
    },
  },
})

export const { setShowOnboarding, resetOnboarding } = configUISlice.actions
export default configUISlice.reducer 