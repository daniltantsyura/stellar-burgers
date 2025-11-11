import {
  addIngredient,
  constructorReducer,
  moveIngredient,
  removeIngredient,
  TConstructorState
} from './ConstructorSlice';

const initialState: TConstructorState = {
  constructor: {
    bun: null,
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa094a',
        name: 'Сыр с астероидной плесенью',
        type: 'main',
        proteins: 84,
        fat: 48,
        carbohydrates: 420,
        calories: 3377,
        price: 4142,
        image: 'https://code.s3.yandex.net/react/code/cheese.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
        id: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0949',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
        id: 1
      }
    ]
  },
  counter: 2
};

const sortedIngredients = [
  {
    _id: '643d69a5c3f7b9001cfa0949',
    name: 'Мини-салат Экзо-Плантаго',
    type: 'main',
    proteins: 1,
    fat: 2,
    carbohydrates: 3,
    calories: 6,
    price: 4400,
    image: 'https://code.s3.yandex.net/react/code/salad.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
    id: 1
  },
  {
    _id: '643d69a5c3f7b9001cfa094a',
    name: 'Сыр с астероидной плесенью',
    type: 'main',
    proteins: 84,
    fat: 48,
    carbohydrates: 420,
    calories: 3377,
    price: 4142,
    image: 'https://code.s3.yandex.net/react/code/cheese.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
    id: 0
  }
];

describe('тесты синхронных экшенов constructorSlice', () => {
  test('добавление ингредиента', () => {
    const mockIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa094a',
        name: 'Сыр с астероидной плесенью',
        type: 'main',
        proteins: 84,
        fat: 48,
        carbohydrates: 420,
        calories: 3377,
        price: 4142,
        image: 'https://code.s3.yandex.net/react/code/cheese.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
        id: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0949',
        name: 'Мини-салат Экзо-Плантаго',
        type: 'main',
        proteins: 1,
        fat: 2,
        carbohydrates: 3,
        calories: 6,
        price: 4400,
        image: 'https://code.s3.yandex.net/react/code/salad.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/salad-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/salad-large.png',
        id: 1
      },
      {
        _id: '643d69a5c3f7b9001cfa0948',
        name: 'Кристаллы марсианских альфа-сахаридов',
        type: 'main',
        proteins: 234,
        fat: 432,
        carbohydrates: 111,
        calories: 189,
        price: 762,
        image: 'https://code.s3.yandex.net/react/code/core.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/core-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/core-large.png',
        id: 2
      }
    ];

    const newState = constructorReducer(
      initialState,
      addIngredient(mockIngredients[2])
    );

    const { ingredients } = newState.constructor;

    expect(ingredients).toEqual(mockIngredients);
  });

  test('удаление ингредиента', () => {
    const newState = constructorReducer(
      initialState,
      removeIngredient({ id: 0 })
    );

    const { ingredients } = newState.constructor;

    expect(ingredients.length).toBe(1);
  });

  test('перемещение ингредиента вниз', () => {
    const newState = constructorReducer(
      initialState,
      moveIngredient({
        ingredient: initialState.constructor.ingredients[0],
        direction: 1
      })
    );

    const { ingredients } = newState.constructor;

    expect(ingredients).toEqual(sortedIngredients);
  });

  test('перемещение ингредиента вверх', () => {
    const newState = constructorReducer(
      initialState,
      moveIngredient({
        ingredient: initialState.constructor.ingredients[1],
        direction: -1
      })
    );

    const { ingredients } = newState.constructor;

    expect(ingredients).toEqual(sortedIngredients);
  });
});
