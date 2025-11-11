import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TAuthResponse,
  updateUserApi
} from '../../../utils/burger-api';
import mockUser from '../../../../mocks/userResponse.json';
import { configureStore } from '@reduxjs/toolkit';
import {
  getUserThunk,
  loginUserThunk,
  logoutThunk,
  registerUserThunk,
  TUserState,
  updateUserThunk,
  userReducer
} from './UserSlice';
import cookie from '../../../utils/cookie';

const mockAuthResponse: TAuthResponse = {
  user: mockUser,
  accessToken: 'access-token',
  refreshToken: 'refresh-token',
  success: true
};

jest.mock('../../../utils/burger-api');
jest.mock('../../../utils/cookie', () => ({
  setCookie: jest.fn(),
  deleteCookie: jest.fn()
}));

const localStorageMock = (function () {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    })
  };
})();

Object.defineProperty(global, 'localStorage', {
  value: localStorageMock
});

const initialState: TUserState = {
  user: null,
  userError: null,
  userLoading: false
};

describe('тесты асинхронных экшенов userSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('регистрация', () => {
    test('состояние fulfiled', async () => {
      (registerUserApi as jest.Mock).mockResolvedValue(mockAuthResponse);

      const store = configureStore({
        reducer: {
          user: userReducer
        }
      });

      await store.dispatch(
        registerUserThunk({
          email: 'test@example.com',
          password: 'password',
          name: 'Test User'
        })
      );

      const state = store.getState().user;
      expect(state.user).toEqual(mockUser);
      expect(state.userLoading).toBe(false);
      expect(state.userError).toBeNull();
    });
  });

  describe('вход', () => {
    test('состояние fulfiled', async () => {
      (loginUserApi as jest.Mock).mockResolvedValue(mockAuthResponse);

      cookie.setCookie = jest.fn();

      const store = configureStore({
        reducer: {
          user: userReducer
        }
      });

      await store.dispatch(
        loginUserThunk({
          email: 'test@example.com',
          password: 'password'
        })
      );

      const state = store.getState().user;
      expect(state.user).toEqual(mockUser);
      expect(state.userLoading).toBe(false);
      expect(state.userError).toBeNull();
      expect(cookie.setCookie).toHaveBeenCalledWith(
        'accessToken',
        'access-token'
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
        'refreshToken',
        'refresh-token'
      );
    });
  });

  describe('обновление пользователя', () => {
    test('состояние fulfiled', async () => {
      (updateUserApi as jest.Mock).mockResolvedValue({
        user: {
          email: 'updated@example.com',
          name: 'Updated User'
        }
      });

      const store = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: {
            user: mockUser,
            userLoading: false,
            userError: null
          }
        }
      });

      await store.dispatch(
        updateUserThunk({
          email: 'updated@example.com',
          name: 'Updated User'
        })
      );

      const state = store.getState().user;
      expect(state.user).toEqual({
        email: 'updated@example.com',
        name: 'Updated User'
      });
      expect(state.userLoading).toBe(false);
      expect(state.userError).toBeNull();
    });
  });

  describe('получение информации о пользователе', () => {
    test('состояние fulfiled', async () => {
      (getUserApi as jest.Mock).mockResolvedValue({ user: mockUser });

      const store = configureStore({
        reducer: {
          user: userReducer
        }
      });

      await store.dispatch(getUserThunk());

      const state = store.getState().user;
      expect(state.user).toEqual(mockUser);
      expect(state.userLoading).toBe(false);
      expect(state.userError).toBeNull();
    });
  });

  describe('выход', () => {
    test('should handle logout flow and clear tokens', async () => {
      (logoutApi as jest.Mock).mockResolvedValue({});

      const store = configureStore({
        reducer: {
          user: userReducer
        },
        preloadedState: {
          user: {
            user: mockUser,
            userLoading: false,
            userError: null
          }
        }
      });

      await store.dispatch(logoutThunk());

      const state = store.getState().user;
      expect(state.user).toBeNull();
      expect(state.userLoading).toBe(false);
      expect(state.userError).toBeNull();
      expect(cookie.deleteCookie).toHaveBeenCalledWith('accessToken');
      expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('Обработка ошибок', () => {
    test('rejected', async () => {
      const errorMessage = 'Network Error';
      const actions = [
        {
          type: loginUserThunk.rejected.type,
          payload: errorMessage
        },
        {
          type: registerUserThunk.rejected.type,
          payload: errorMessage
        },
        {
          type: updateUserThunk.rejected.type,
          payload: errorMessage
        },
        {
          type: getUserThunk.rejected.type,
          payload: errorMessage
        },
        {
          type: logoutThunk.rejected.type,
          payload: errorMessage
        }
      ];

      actions.forEach((action) => {
        const state = userReducer(initialState, action);

        expect(state).toEqual({
          ...initialState,
          userLoading: false,
          userError: errorMessage,
          user: null
        });
      });
    });
  });

  describe('состояние запроса', () => {
    test('pending', () => {
      const actions = [
        { type: loginUserThunk.pending.type },
        { type: registerUserThunk.pending.type },
        { type: updateUserThunk.pending.type },
        { type: getUserThunk.pending.type },
        { type: logoutThunk.pending.type }
      ];
      actions.forEach((action) => {
        const state = userReducer(initialState, action);

        expect(state.userLoading).toBe(true);
        expect(state.userError).toBeNull();
        expect(state.user).toBeNull();
      });
    });
  });
});
