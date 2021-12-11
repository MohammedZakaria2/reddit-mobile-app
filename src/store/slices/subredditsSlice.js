import {createSlice} from '@reduxjs/toolkit';

const subredditsSlice = createSlice({
  name: 'subreddits',
  initialState: {
    followedSubreddits: [],
    subreddits: [],
  },
  reducers: {
    setFollow(state, action) {
      state.followedSubreddits = action.payload;
    },
    setSubreddits(state, action) {
      state.subreddits = action.payload;
    },
  },
});

export const {setFollow, setSubreddits} = subredditsSlice.actions;
export default subredditsSlice.reducer;
