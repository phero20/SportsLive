import { configureStore } from '@reduxjs/toolkit'
import apiFetch from './features/apiFetch/apiFetch'

export const store = configureStore({
    reducer: {
      matches: apiFetch, // now use state.scores in selector
    },
  });
  