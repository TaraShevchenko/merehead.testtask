import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoading: false,
  error: false
};

export const counterSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsersFetch: (state) => {
      state.isLoading = true;
    },
    getUsersSuccess: (state, action) => {
      state.users = action.payload;
      state.isLoading = true;
    },
    getUsersFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },

    actionWithUserFetch: (state) => {
      state.isLoading = true;
    },
    actionWithUserFailure: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  }
});

export const { getUsersFetch, getUsersSuccess, getUsersFailure, actionWithUserFetch, actionWithUserFailure } = counterSlice.actions;

export default counterSlice.reducer;
