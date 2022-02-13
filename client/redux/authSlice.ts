import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    isLoaded: false,
    authID: '',
    role: '',
  },
  reducers: {
    setAuth(state: any, action: { payload: any }) {
      state.isAuth = action.payload.isAuth;
    },
    setLoaded(state: any, action: { payload: any }) {
      state.isLoaded = action.payload.isLoaded;
    },
    setAuthID(state: any, action: { payload: any }) {
      state.authID = action.payload.authID;
    },
    setRole(state: any, action: { payload: any }) {
      state.role = action.payload.role;
    },
  },
});

export default authSlice.reducer;
export const { setAuth, setLoaded, setAuthID, setRole } = authSlice.actions;
