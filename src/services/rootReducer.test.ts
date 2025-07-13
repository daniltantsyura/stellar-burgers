import { rootReducer } from './RootReducer';
import { constructorSlice } from './slices/ConstructorSlice/ConstructorSlice';
import { feedsSlice } from './slices/FeedSlice/FeedSlice';
import { ingredientsSlice } from './slices/IngredientSlice/IngredientsSlice';
import { ordersSlice } from './slices/OrderSlice/OrdersSlice';
import { userSlice } from './slices/UserSlice/UserSlice';

describe('Инициализация rootReducer', () => {
  test('rootReducer корректно объединяет слайсы', () => {
    const initialState = rootReducer(undefined, { type: 'unknown' });

    expect(initialState).toEqual({
      [constructorSlice.name]: constructorSlice.getInitialState(),
      [feedsSlice.name]: feedsSlice.getInitialState(),
      [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
      [ordersSlice.name]: ordersSlice.getInitialState(),
      [userSlice.name]: userSlice.getInitialState()
    });
  });
});
