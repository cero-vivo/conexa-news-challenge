import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ConfigUIState {
  language: 'es' | 'en'
}

const initialState: ConfigUIState = {
  language: 'es',
}

const configUISlice = createSlice({
  name: 'configUI',
  initialState,
  reducers: {
    setLanguage: (state, action: PayloadAction<'es' | 'en'>) => {
      state.language = action.payload
    }
  },
})

export const { setLanguage } = configUISlice.actions
export default configUISlice.reducer 