import { combineSlices } from '@reduxjs/toolkit';
import { userSlice } from './slices/UserSlice/UserSlice';
import { ingredientsSlice } from './slices/IngredientSlice/IngredientsSlice';
import { constructorSlice } from './slices/ConstructorSlice/ConstructorSlice';
import { ordersSlice } from './slices/OrderSlice/OrdersSlice';
import { feedsSlice } from './slices/FeedSlice/FeedSlice';

export const rootReducer = combineSlices(
  userSlice,
  ingredientsSlice,
  constructorSlice,
  ordersSlice,
  feedsSlice
);
console.log(rootReducer);
