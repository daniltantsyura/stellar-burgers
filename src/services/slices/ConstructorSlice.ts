import { createSlice } from "@reduxjs/toolkit";
import { TConstructorIngredient, TIngredient } from "@utils-types";
import { useSelector } from "../store";

type TConstructorState = {
    constructor: {
        bun: TIngredient | null,
        ingredients: Array<TConstructorIngredient>,
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
            state.constructor.ingredients?.push(action.payload);
        },
        removeIngredient: (state, action) => {
            state.constructor.ingredients = state.constructor.ingredients?.filter((ingredient) => {
                ingredient.id !== action.payload.id;
            });
        }
    },
    selectors: {
        getConstructor: (state) => (state.constructor),
        getConstructorBun: (state) => (state.constructor.bun),
        getConstructorIngredients: (state) => (state.constructor.ingredients),
    }
});


export const {chooseBun, addIngredient, removeIngredient} = constructorSlice.actions;

export const {getConstructor, getConstructorBun, getConstructorIngredients} = constructorSlice.selectors;
