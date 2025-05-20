import { loginUserApi, registerUserApi, TAuthResponse, TLoginData, TRegisterData, updateUserApi } from "@api";
import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { AsyncThunkConfig } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { RejectedActionFromAsyncThunk } from "@reduxjs/toolkit/dist/matchers";
import { TUser } from "@utils-types";
import { TRejecedAction, TRejectedData } from "../store";
import { setCookie } from "../../utils/cookie";

type TUserState = {
    user: TUser | null,
    userError: unknown | null,
    userLoading: boolean
}

const initialState: TUserState = {
    user: null,
    userError: null,
    userLoading: false
}

const handlePending = (state: TUserState) => {
    state.userLoading = true;
    state.userError = null;
    state.user = null;
}

const handleRejected = (state: TUserState, action: TRejecedAction<TRejectedData<TRegisterData | TLoginData | Partial<TRegisterData>>>) => {
    state.userLoading = false;
    state.userError = action.payload;
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUserThunk.pending, handlePending)
            .addCase(registerUserThunk.rejected, handleRejected)
            .addCase(registerUserThunk.fulfilled, (state: TUserState, action) => {
                state.userLoading = false;
                state.userError = null;
                state.user = action.payload.user;
            })
            .addCase(loginUserThunk.pending, handlePending)
            .addCase(loginUserThunk.rejected, handleRejected)
            .addCase(loginUserThunk.fulfilled, (state: TUserState, action) => {
                state.userLoading = false;
                state.userError = null;
                setCookie('accessToken', action.payload.accessToken);
                state.user = action.payload.user;
            })
            .addCase(updateUserThunk.pending, handlePending)
            .addCase(updateUserThunk.rejected, handleRejected)
            .addCase(updateUserThunk.fulfilled, (state: TUserState, action) => {
                state.userLoading = false;
                state.userError = null;
                state.user = action.payload.user;
            });
    },
    selectors: {
        getUser: (state) => (state.user),
        getUserLoading: (state) => (state.userLoading),
    },
});

export const {getUser, getUserLoading} = userSlice.selectors;

export const registerUserThunk = createAsyncThunk('user/register', 
    async (data: TRegisterData) => {
        return await registerUserApi(data);
    }
);

export const loginUserThunk = createAsyncThunk('user/login', 
    async (data: TLoginData) => {
        return await loginUserApi(data);
    }
);

export const updateUserThunk = createAsyncThunk('user/update', 
    async (data: Partial<TRegisterData>) => {
        return await updateUserApi(data);
    }
);
