import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { registerApi } from 'redux/actions/authAction'
import { IRegister } from 'types'

export interface AuthState {
  currentUser?: any,
  loading: boolean
}

const initialState: AuthState = {
  currentUser: undefined,
  loading: false
}

export const authRegister = createAsyncThunk('auth/register', async(user: IRegister) => {
  return await registerApi(user)
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.currentUser = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(authRegister.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(authRegister.fulfilled, (state) => {
      state.loading = false;
    });
    // dung khi ko co trycatch
    // builder.addCase(authRegister.rejected, (state) => {
    //   state.loading = false;
    // });

  }
})

export const { addUser} = authSlice.actions

export default authSlice.reducer