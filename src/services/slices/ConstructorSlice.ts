import { createSlice } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient } from "@utils-types";

type TConstructorState = {
    constructor: {
        bun: TIngredient | null,
        ingredients: TConstructorIngredient[],
    },
};

const initialState: TConstructorState = {
    constructor: {
        bun: null,
        ingredients: [],
    },
}

export const constructorSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        chooseBun: (state, action) => {
            state.constructor.bun = action.payload;
        },
        addIngredient: (state, action) => {
            state.constructor.ingredients.push(action.payload);
        },
        removeIngredient: (state, action) => {
            state.constructor.ingredients = state.constructor.ingredients.filter((ingredient) => {
                ingredient.id !== action.payload.id;
            });
        }
    },
    extraReducers: (builder) => {
    },
    selectors: {
        getConstructorItems: (state) => (state.constructor),
    }
});

export const {chooseBun, addIngredient, removeIngredient} = constructorSlice.actions;

export const {getConstructorItems} = constructorSlice.selectors;