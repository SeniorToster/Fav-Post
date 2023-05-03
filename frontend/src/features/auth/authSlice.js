import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null },
  reducers: {
    logout: state => (state.user = null),
  },
});

export const actionsAuth = authSlice.actions;
export default authSlice.reducer;

export const selectUser = state => state.user;
