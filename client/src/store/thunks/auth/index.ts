import { createAsyncThunk } from '@reduxjs/toolkit';
import { IGoogleToken, IUser } from '../../../common/types/auth';

import { IError } from '../../../common/types/errors';
import { instance } from '../../../utils/axios';

export const registerOrLoginGoogle = createAsyncThunk<
  IUser | null,
  IGoogleToken,
  { rejectValue: string }
>('auth/google', async (data: IGoogleToken, { rejectWithValue }) => {
  try {
  
    const dataUser = await instance.post<IUser>('/auth/google', data);
    if (dataUser.data.verifyLink) {
      localStorage.setItem('token', dataUser.data.token.accuseToken);

      return dataUser.data;
    }
    return null;
  } catch (error) {
    const typedError = error as IError;

    console.log(typedError.message);
    if (typedError.response && typedError.response.data?.message) {
      return rejectWithValue(typedError.response.data.message);
    } else {
      return rejectWithValue(typedError.message);
    }
  }
});
