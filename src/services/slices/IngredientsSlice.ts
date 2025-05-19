import { getIngredientsApi } from "@api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TIngredient } from "@utils-types";
import { TRejecedAction, TRejectedData } from "../store";

type TIngredientsState = {
    buns: TIngredient[];
    mains: TIngredient[];
    sauces: TIngredient[];

    ingredientsError: unknown | null;
    ingredientsLoading: boolean;
}

const initialState: TIngredientsState = {
    buns: [],
    mains: [],
    sauces: [],
    ingredientsError: null,
    ingredientsLoading: false,
}

const handlePending = (state: TIngredientsState) => {
    state.ingredientsLoading = true;
    state.ingredientsError = null;
    state.buns = [];
    state.mains = [];
    state.sauces = [];
}

const handleRejected = (state: TIngredientsState, action: TRejecedAction<TRejectedData<void>>) => {
    state.ingredientsLoading = false;
    state.ingredientsError = action.payload;
}

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase(getIngredientsThunk.pending, handlePending)
        .addCase(getIngredientsThunk.rejected, handleRejected)
        .addCase(getIngredientsThunk.fulfilled, (state: TIngredientsState, action) => {
            state.buns = action.payload.filter((ingredient) => ingredient.type === 'bun');
            state.mains = action.payload.filter((ingredient) => ingredient.type === 'main');
            state.sauces = action.payload.filter((ingredient) => ingredient.type === 'sauce');
            state.ingredientsError = null;
            state.ingredientsLoading = false;
        });
    },
    selectors: {
        getBunIngredients: (state) => (state.buns),
        getMainIngredients: (state) => (state.mains),
        getSauses: (state) => (state.sauces),
        getIngredientsLoading: (state) => (state.ingredientsLoading),
        getIngredientsError: (state) => (state.ingredientsError),
    }
});

export const {getSauses, getMainIngredients, getBunIngredients, getIngredientsLoading, getIngredientsError} = ingredientsSlice.selectors;

export const getIngredientsThunk = createAsyncThunk('ingredients/get',
    async () => {
        return await getIngredientsApi();
    }
);