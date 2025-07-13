import { getIngredientsApi } from '../../../utils/burger-api';
import mockIngredients from '../../../../mocks/ingredients.json';
import {
  getIngredientsThunk,
  ingredientReducer,
  TIngredientsState
} from './IngredientsSlice';

jest.mock('../../../utils/burger-api');

const initialState: TIngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  all: [],
  ingredientsError: null,
  ingredientsLoading: false
};

describe('тесты асинхронных экшенов ingredientsSlice', () => {
  describe('получение ингредиентов', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('состояние pending при загрузке ингредиентов', () => {
      const action = { type: getIngredientsThunk.pending.type };
      const newState = ingredientReducer(initialState, action);

      expect(newState).toEqual({
        buns: [],
        mains: [],
        sauces: [],
        all: [],
        ingredientsLoading: true,
        ingredientsError: null
      });
    });

    test('состояние fulfilled при успешной загрузке ингредиентов', () => {
      (getIngredientsApi as jest.Mock).mockResolvedValue(mockIngredients);

      const action = {
        type: getIngredientsThunk.fulfilled.type,
        payload: mockIngredients
      };
      const newState = ingredientReducer(initialState, action);

      const expectedBuns = mockIngredients.filter((i) => i.type === 'bun');
      const expectedMains = mockIngredients.filter((i) => i.type === 'main');
      const expectedSauces = mockIngredients.filter((i) => i.type === 'sauce');

      expect(newState).toEqual({
        all: mockIngredients,
        buns: expectedBuns,
        mains: expectedMains,
        sauces: expectedSauces,
        ingredientsLoading: false,
        ingredientsError: null
      });

      expect(newState.buns.length).toBe(2);
      expect(newState.mains.length).toBe(9);
      expect(newState.sauces.length).toBe(4);
    });

    test('состояние rejected при ошибке загрузки ингредиентов', () => {
      const errorMessage = 'Ошибка загрузки';
      (getIngredientsApi as jest.Mock).mockRejectedValue(
        new Error(errorMessage)
      );

      const action = {
        type: getIngredientsThunk.rejected.type,
        payload: errorMessage
      };
      const newState = ingredientReducer(initialState, action);

      expect(newState).toEqual({
        buns: [],
        mains: [],
        sauces: [],
        all: [],
        ingredientsLoading: false,
        ingredientsError: errorMessage
      });
    });
  });
});
