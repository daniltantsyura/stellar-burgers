import { configureStore, PayloadAction, SerializedError } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

import { rootReducer } from './RootReducer';

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type TRejecedAction<DataType> = PayloadAction<unknown, string, DataType & ({
    rejectedWithValue: true;
} | ({
    rejectedWithValue: false;
} & {})), SerializedError>;

export type TRejectedData<TArg> = {
  arg: TArg;
  requestId: string;
  requestStatus: "rejected";
  aborted: boolean;
  condition: boolean;
}

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
