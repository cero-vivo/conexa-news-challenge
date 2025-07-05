import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Onboarding } from '../entities/Onboarding'

type OnboardingState = Onboarding

const initialState: OnboardingState = {
  showOnboarding: true,
}

const onboardingSlice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setShowOnboarding: (state, action: PayloadAction<boolean>) => {
      state.showOnboarding = action.payload
    },
  },
})

export const { setShowOnboarding } = onboardingSlice.actions
export default onboardingSlice.reducer 