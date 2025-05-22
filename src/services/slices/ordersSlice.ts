import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TOrder } from "@utils-types";
import { TRejecedAction, TRejectedData } from "../store";

type TOrdersState = {
    orders: TOrder[],
    ordersLoading: boolean,
    ordersError: unknown | null,
    currentOrder: TOrder | null,
    orderRequest: boolean,
    orderSendError: unknown | null,
}

const handleOrderPending = (state: TOrdersState) => {
    state.orderRequest = true;
    state.orderSendError = null;
    state.currentOrder = null;
}

const handleOrderRejected = (state: TOrdersState, action: TRejecedAction<TRejectedData<unknown>>) => {
    state.orderRequest = false;
    state.orderSendError = action.payload;
}

const initialState: TOrdersState = {
    orders: [],
    ordersLoading: false,
    ordersError: null,
    currentOrder: null,
    orderRequest: false,
    orderSendError: null,
}

export const ordersSlice = createSlice({
    name: 'burgerOrders',
    initialState,
    reducers: {
        clearCurrentOrder: (state) => {
            state.currentOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrdersThunk.pending, (state: TOrdersState) => {
                state.orders = [];
                state.ordersError = null;
                state.ordersLoading = true;
            })
            .addCase(getOrdersThunk.rejected, (state: TOrdersState, action: TRejecedAction<TRejectedData<unknown>>) => {
                state.ordersLoading = false;
                state.ordersError = action.payload;
            })
            .addCase(getOrdersThunk.fulfilled, (state, action) => {
                state.orders = action.payload;
                state.ordersError = null;
                state.ordersLoading = false;
            })
            .addCase(orderBurgerThunk.pending, handleOrderPending)
            .addCase(orderBurgerThunk.rejected, handleOrderRejected)
            .addCase(orderBurgerThunk.fulfilled, (state, action) => {
                state.orders = [...state.orders, action.payload.order];
                console.log(state.orders);
                state.currentOrder = action.payload.order;
                state.ordersError = null;
                state.orderRequest = false;
            })
            .addCase(getOrderByNumberThunk.pending, handleOrderPending)
            .addCase(getOrderByNumberThunk.rejected, handleOrderRejected)
            .addCase(getOrderByNumberThunk.fulfilled, (state, action) => {
                state.currentOrder = action.payload.orders[0];
                state.orderRequest = false;
                state.orderSendError = null;
            });
    },
    selectors: {
        getOrders: ({ orders }) => {
            return orders;
        },
        getOrdersLoading: ({ ordersLoading }) => {
            return ordersLoading;
        },
        getOrdersError: ({ ordersError }) => {
            return ordersError;
        },
        getOrderRequest: ({ orderRequest }) => {
            return orderRequest;
        },
        getOrderSendError: ({ orderSendError }) => {
            return orderSendError;
        },
        getCurrentOrder: ({ currentOrder }) => {
            return currentOrder;
        }
    }
});

export const { getOrders, getOrderRequest, getOrderSendError, getOrdersError, getOrdersLoading, getCurrentOrder } = ordersSlice.selectors;

export const { clearCurrentOrder } = ordersSlice.actions;

export const getOrdersThunk = createAsyncThunk('orders/get',
    async () => {
        return await getOrdersApi();
    }
);

export const orderBurgerThunk = createAsyncThunk('orders/send',
    async (data: string[]) => {
        return await orderBurgerApi(data);
    }
);

export const getOrderByNumberThunk = createAsyncThunk('orders/getOrderByNumber',
    async (data: number) => {
        return await getOrderByNumberApi(data);
    }
);