import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedsInitialState = {
  feeds: TOrder[];
  total: number;
  totalToday: number;
  feedsLoading: boolean;
  feedsError: unknown | null;
};

const initialState: TFeedsInitialState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  feedsLoading: false,
  feedsError: null
};

export const feedsSlice = createSlice({
  name: 'feedsOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeedsThunk.pending, (state) => {
        state.feeds = [];
        state.feedsError = null;
        state.feedsLoading = true;
      })
      .addCase(getFeedsThunk.rejected, (state, action) => {
        state.feedsError = action.payload;
        state.feedsLoading = false;
      })
      .addCase(getFeedsThunk.fulfilled, (state, action) => {
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
        state.feedsError = null;
        state.feedsLoading = false;
      });
  },
  selectors: {
    getFeedsOrders: ({ feeds }) => feeds,
    getTotal: ({ total }) => total,
    getTotalToday: ({ totalToday }) => totalToday
  }
});

export const { getFeedsOrders, getTotal, getTotalToday } = feedsSlice.selectors;

export const getFeedsThunk = createAsyncThunk(
  'feeds/get',
  async () => await getFeedsApi()
);
