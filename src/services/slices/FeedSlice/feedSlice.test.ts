import { getFeedsApi } from '../../../utils/burger-api';
import { feedReducer, getFeedsThunk, TFeedsInitialState } from './FeedSlice';

const mockFeeds = [
  {
    _id: '687377475a54df001b6de0e8',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa093f',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Краторный бессмертный spicy бургер',
    createdAt: '2025-07-13T09:07:19.882Z',
    updatedAt: '2025-07-13T09:07:21.121Z',
    number: 84229
  },
  {
    _id: '687377375a54df001b6de0e6',
    ingredients: [
      '643d69a5c3f7b9001cfa0942',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Space флюоресцентный spicy люминесцентный бургер',
    createdAt: '2025-07-13T09:07:03.152Z',
    updatedAt: '2025-07-13T09:07:03.970Z',
    number: 84228
  }
];

const initialState: TFeedsInitialState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  feedsLoading: false,
  feedsError: null
};

jest.mock('../../../utils/burger-api');

afterEach(() => {
  jest.clearAllMocks();
});

describe('тесты асинхронных экшенов feedSlice', () => {
  describe('получение ингредиентов', () => {
    test('состояние pending при получении ленты заказов', () => {
      const action = { type: getFeedsThunk.pending.type };
      const state = feedReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        feeds: [],
        feedsLoading: true,
        feedsError: null
      });
    });

    test('состояние fulfilled при успешном получении ленты заказов', () => {
      const mockApiResponse = {
        orders: mockFeeds,
        total: 2,
        totalToday: 2
      };

      (getFeedsApi as jest.Mock).mockResolvedValue(mockApiResponse);

      const action = {
        type: getFeedsThunk.fulfilled.type,
        payload: mockApiResponse
      };
      const state = feedReducer(initialState, action);

      expect(state).toEqual({
        feeds: mockFeeds,
        total: 2,
        totalToday: 2,
        feedsLoading: false,
        feedsError: null
      });
    });

    test('состояние rejected при ошибке получения ленты заказов', () => {
      const errorMessage = 'Network Error';
      (getFeedsApi as jest.Mock).mockRejectedValue(new Error(errorMessage));

      const action = {
        type: getFeedsThunk.rejected.type,
        payload: errorMessage
      };
      const state = feedReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        feedsLoading: false,
        feedsError: errorMessage
      });
    });
  });
});
