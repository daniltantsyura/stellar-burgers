import { configureStore } from '@reduxjs/toolkit';
import {
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '../../../utils/burger-api';
import {
  clearCurrentOrder,
  getOrderByNumberThunk,
  getOrdersThunk,
  orderBurgerThunk,
  orderReducer,
  TOrdersState
} from './OrdersSlice';

const mockOrders = [
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

const initialState: TOrdersState = {
  orders: [],
  ordersLoading: false,
  ordersError: null,
  currentOrder: null,
  orderRequest: false,
  orderSendError: null
};

jest.mock('../../../utils/burger-api');

afterEach(() => {
  jest.clearAllMocks();
});

describe('тесты асинхронных экшенов OrderSlice', () => {
  describe('получение совершенных заказов', () => {
    test('состояние pending', () => {
      const action = { type: getOrdersThunk.pending.type };
      const state = orderReducer(initialState, action);

      expect(state).toEqual({
        ...initialState,
        orders: [],
        ordersLoading: true,
        ordersError: null
      });
    });

    test('состояние fulfiled', () => {
      (getOrdersApi as jest.Mock).mockResolvedValue(mockOrders);

      const action = {
        type: getOrdersThunk.fulfilled.type,
        payload: mockOrders
      };
      const state = orderReducer(initialState, action);

      expect(state.orders).toEqual(mockOrders);
      expect(state.ordersLoading).toBe(false);
      expect(state.ordersError).toBeNull();
    });

    test('состояние rejected', () => {
      const error = 'Failed to fetch orders';
      (getOrdersApi as jest.Mock).mockRejectedValue(error);

      const action = {
        type: getOrdersThunk.rejected.type,
        payload: error
      };
      const state = orderReducer(initialState, action);

      expect(state.orders).toEqual([]);
      expect(state.ordersLoading).toBe(false);
      expect(state.ordersError).toBe(error);
    });
  });

  describe('отправка нового заказа', () => {
    const mockNewOrder = [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093c'
    ];

    const mockCreatedOrder = {
      _id: 'new_order_id',
      ingredients: mockNewOrder,
      status: 'created',
      name: 'Новый бургер',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      number: 12345
    };

    test('состояние pending', () => {
      const action = { type: orderBurgerThunk.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.orderSendError).toBeNull();
      expect(state.currentOrder).toBeNull();
    });

    test('состояние fulfiled', async () => {
      (orderBurgerApi as jest.Mock).mockResolvedValue({
        order: mockCreatedOrder
      });

      const store = configureStore({
        reducer: {
          burgerOrders: orderReducer
        },
        preloadedState: {
          burgerOrders: {
            ...initialState,
            orders: mockOrders
          }
        }
      });

      await store.dispatch(orderBurgerThunk(mockNewOrder));

      const state = store.getState();
      expect(state.burgerOrders.orders).toContainEqual(mockCreatedOrder);
      expect(state.burgerOrders.currentOrder).toEqual(mockCreatedOrder);
      expect(state.burgerOrders.orderRequest).toBe(false);
    });

    test('состояние rejected', () => {
      const error = 'Failed to create order';
      (orderBurgerApi as jest.Mock).mockRejectedValue(error);

      const action = {
        type: orderBurgerThunk.rejected.type,
        payload: error
      };

      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderSendError).toBe(error);
    });
  });

  describe('получение заказа по номеру', () => {
    const mockOrderResponse = {
      orders: [mockOrders[0]]
    };

    test('состояние pending', () => {
      const action = { type: getOrderByNumberThunk.pending.type };
      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(true);
      expect(state.orderSendError).toBeNull();
      expect(state.currentOrder).toBeNull();
    });

    test('состояние fulfiled', async () => {
      (getOrderByNumberApi as jest.Mock).mockResolvedValue(mockOrderResponse);

      const store = configureStore({
        reducer: {
          burgerOrders: orderReducer
        }
      });

      const initialState = store.getState();
      expect(initialState.burgerOrders.currentOrder).toBeNull();

      await store.dispatch(getOrderByNumberThunk(84229));

      const state = store.getState();
      expect(state.burgerOrders.currentOrder).toEqual(mockOrders[0]);
      expect(state.burgerOrders.orderRequest).toBe(false);
      expect(state.burgerOrders.orderSendError).toBeNull();
    });

    test('состояние rejected', async () => {
      const error = 'Failed to create order';
      (orderBurgerApi as jest.Mock).mockRejectedValue(error);

      const action = {
        type: orderBurgerThunk.rejected.type,
        payload: error
      };

      const state = orderReducer(initialState, action);

      expect(state.orderRequest).toBe(false);
      expect(state.orderSendError).toBe(error);
    });
  });
});

describe('тесты синхронных экшенов', () => {
  test('очистка текущего заказа', () => {
    const newState = orderReducer(initialState, clearCurrentOrder());

    const { currentOrder } = newState;

    expect(currentOrder).toBeNull();
  });
});
