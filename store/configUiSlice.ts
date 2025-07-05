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
    }
  },
})

export const { setShowOnboarding } = configUISlice.actions
export default configUISlice.reducer 