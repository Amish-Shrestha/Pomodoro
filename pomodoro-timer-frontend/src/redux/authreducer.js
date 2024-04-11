import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiManager from '../api/api';

const initialState = {
  isAuthenticated: false,
  token: null,
};

const authReducer = createSlice({
  name: "Auth",
  initialState: initialState,
  reducers: {
    // setLogin: (state, action) => {
    //   state.isAuthenticated = true;
    //   state.token = action.payload;
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(loginHandler.pending, (state) => {
      // state.loading = true;
      state.isAuthenticated = false;
      state.token = null
    });
    builder.addCase(loginHandler.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload;
    });
    builder.addCase(loginHandler.rejected, (state, action) => {
      state.isAuthenticated = false;
      state.token = null
    });
  }
});

export const loginHandler = createAsyncThunk("post/login", async ({ username, password, callBack }) => {
  const response = await apiManager.post('api/login/', { username, password });
  const token = response.data.token
  if (token && callBack) {
    callBack();
  }
  return token;

})

export const { setLogin } = authReducer.actions;
export default authReducer;
