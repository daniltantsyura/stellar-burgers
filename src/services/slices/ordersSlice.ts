import { getOrdersApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { TRejecedAction, TRejectedData } from "../store";

type TOrdersState = {
    orders: TOrder[],
    ordersLoading: boolean,
    ordersError: unknown | null 
}

const handlePending = (state: TOrdersState) => {
    state = {...initialState, ordersLoading: true}
}

const handleRejected = (state: TOrdersState, action: TRejecedAction<TRejectedData<void>>) => {
    state.ordersLoading = false;
    state.ordersError = action.payload;
}

const initialState: TOrdersState = {
    orders: [],
    ordersLoading: false,
    ordersError: null,
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersThunk.pending, handlePending)
            .addCase(getOrdersThunk.rejected, handleRejected);
    }
});

export const getOrdersThunk = createAsyncThunk('orders/get', 
    async () => {
        await getOrdersApi();
    }
);