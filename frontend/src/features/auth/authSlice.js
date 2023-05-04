import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  tokenAccess: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => initialState,
    setCredential: (state, { payload }) => {
      state.user = payload.user;
      state.tokenAccess = payload.accessToken;
    },
  },
});

export const actionsAuth = authSlice.actions;
export default authSlice.reducer;

export const selectUser = state => state.user;
