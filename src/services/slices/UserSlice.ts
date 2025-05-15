import { registerUserApi, TAuthResponse, TRegisterData } from "@api";
import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit";
import { TUser } from "@utils-types";

type TUserState = {
    user: TUser | null,
    error: unknown | null,
    loading: boolean
}

const initialState: TUserState = {
    user: null,
    error: null,
    loading: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state: TUserState) => {
                state.loading = true;
                state.error = null;
                state.user = null;
            })
            .addCase(registerUser.rejected, (state: TUserState, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(registerUser.fulfilled, (state: TUserState, action) => {
                state.loading = false;
                state.error = null;
                state.user = action.payload.user;
            })
    },
    selectors: {
        getUser: (state) => (state.user),
    }
});

export const {getUser} = userSlice.selectors;

export const registerUser = createAsyncThunk('user/register', 
    async (data: TRegisterData) => {
        return await registerUserApi(data);
    }
);