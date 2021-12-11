import {configureStore} from '@reduxjs/toolkit';
import subredditsSlice from './slices/subredditsSlice';

export const store = configureStore({
  reducer: {
    subreddits: subredditsSlice,
  },
});
