import { getIngredientsApi } from '../../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { TRejecedAction, TRejectedData } from '../../store';

export type TIngredientsState = {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  all: TIngredient[];

  ingredientsError: unknown | null;
  ingredientsLoading: boolean;
};

const initialState: TIngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  all: [],
  ingredientsError: null,
  ingredientsLoading: false
};

const handlePending = (state: TIngredientsState) => {
  state.ingredientsLoading = true;
};

const handleRejected = (
  state: TIngredientsState,
  action: TRejecedAction<TRejectedData<void>>
) => {
  state.ingredientsLoading = false;
  state.ingredientsError = action.payload;
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredientsThunk.pending, handlePending)
      .addCase(getIngredientsThunk.rejected, handleRejected)
      .addCase(
        getIngredientsThunk.fulfilled,
        (state: TIngredientsState, action) => {
          state.all = action.payload;
          state.buns = action.payload.filter(
            (ingredient) => ingredient.type === 'bun'
          );
          state.mains = action.payload.filter(
            (ingredient) => ingredient.type === 'main'
          );
          state.sauces = action.payload.filter(
            (ingredient) => ingredient.type === 'sauce'
          );
          state.ingredientsError = null;
          state.ingredientsLoading = false;
        }
      );
  },
  selectors: {
    getBunIngredients: (state) => state.buns,
    getMainIngredients: (state) => state.mains,
    getSauses: (state) => state.sauces,
    getAllIngredients: (state) => state.all,
    getIngredientsLoading: (state) => state.ingredientsLoading,
    getIngredientsError: (state) => state.ingredientsError
  }
});

export const {
  getSauses,
  getMainIngredients,
  getBunIngredients,
  getIngredientsLoading,
  getIngredientsError,
  getAllIngredients
} = ingredientsSlice.selectors;

export const getIngredientsThunk = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

export const ingredientReducer = ingredientsSlice.reducer;
