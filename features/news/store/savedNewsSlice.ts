import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { News } from '../entities/News'

interface SavedNewsState {
  savedNews: News[]
}

const initialState: SavedNewsState = {
  savedNews: [],
}

const savedNewsSlice = createSlice({
  name: 'savedNews',
  initialState,
  reducers: {
    toggleSaveNews: (state, action: PayloadAction<News>) => {
      const exists = state.savedNews.find((item) => item.id === action.payload.id)
      if (exists) {
        // Remove if already saved
        state.savedNews = state.savedNews.filter((item) => item.id !== action.payload.id)
      } else {
        // Add if not saved yet
        state.savedNews.push(action.payload)
      }
    },
    clearSavedNews: (state) => {
      state.savedNews = []
    },
  },
})

export const { toggleSaveNews, clearSavedNews } = savedNewsSlice.actions
export default savedNewsSlice.reducer 