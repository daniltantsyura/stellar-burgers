import { Action, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { useSelector } from '../store';

type TConstructorState = {
  constructor: {
    bun: TIngredient | null;
    ingredients: Array<TConstructorIngredient>;
  };
};

const initialState: TConstructorState = {
  constructor: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    chooseBun: (
      state: TConstructorState,
      action: PayloadAction<TIngredient>
    ) => {
      state.constructor.bun = action.payload;
    },
    addIngredient: (state, action) => {
      const payloadWithId = {
        ...action.payload,
        id: state.constructor.ingredients.length
      };
      state.constructor.ingredients.push(payloadWithId);
    },
    removeIngredient: (state, action) => {
      state.constructor.ingredients = state.constructor.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload.id
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{
        ingredient: TConstructorIngredient;
        direction: -1 | 1;
      }>
    ) => {
      const { ingredient, direction } = action.payload;
      const ingredients = state.constructor.ingredients;
      const index = ingredients.findIndex((i) => i.id === ingredient.id);

      if (index === -1) {
        return;
      }

      if (
        (direction === -1 && index > 0) ||
        (direction === 1 && index < ingredients.length - 1)
      ) {
        const targetIndex = index + direction;
        [ingredients[index], ingredients[targetIndex]] = [
          ingredients[targetIndex],
          ingredients[index]
        ];
      }
    }
  },
  selectors: {
    getConstructor: (state) => state.constructor,
    getConstructorBun: (state) => state.constructor.bun,
    getConstructorIngredients: (state) => state.constructor.ingredients
  }
});

export const { chooseBun, addIngredient, removeIngredient, moveIngredient } =
  constructorSlice.actions;

export const { getConstructor, getConstructorBun, getConstructorIngredients } =
  constructorSlice.selectors;
