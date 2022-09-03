import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { changeProfile, getProfile } from 'redux/actions/profileAction';
import { IAuth, IProfile } from 'types';

export interface ProfileState {
  profile?: IProfile;
}

const initialState: ProfileState = {
  profile: undefined,
};

export const profileUpdate = createAsyncThunk(
  'profile/update',
  async (params: { user: IAuth; data: IProfile }) => {
    const { user, data } = params;
    return await changeProfile(user, data);
  }
);

export const fetchProfile = createAsyncThunk('profile/fetch', async (uid: string) => {
  return await getProfile(uid);
});

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      ({ type }) => type.startsWith('profile') && type.endsWith('/fulfilled'),
      (state, action: PayloadAction<IProfile | undefined>) => {
        state.profile = action.payload;
      }
    );
  },
});

export const { addUser } = profileSlice.actions;

export default profileSlice.reducer;
