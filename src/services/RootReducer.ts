import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from './slices/UserSlice';
import { ingredientsSlice } from './slices/IngredientsSlice';
import { constructorSlice } from './slices/ConstructorSlice';
import { ordersSlice } from './slices/OrdersSlice';
import { feedsSlice } from './slices/FeedSlice';

export const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  constructorSlice,
  ordersSlice,
  feedsSlice
);
