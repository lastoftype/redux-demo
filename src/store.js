import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import mySaga from './sagas';

// Sagas
const sagaMiddleware = createSagaMiddleware();

//
//  Actions
//
export const setLoading = bool => ({
  type: 'SET_LOADING',
  payload: bool,
});

export const addOrder = order => ({
  type: 'ADD_ORDER',
  payload: {
    id: order.id,
    name: order.name,
  },
});

export const getUsers = () => ({
  type: 'GET_USERS',
});

export const getSingleUser = id => ({
  type: 'GET_SINGLE_USER',
  id,
});

//
//  Reducer
//
export const INITIAL_STATE = {
  loading: false,
  orders: [],
  users: [],
  activeUser: {},
};

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'GET_USERS':
    case 'GET_SINGLE_USER':
      return { ...state, loading: true };
    case 'GET_USERS_SUCCEEDED':
      return { ...state, users: action.payload, loading: false };
    case 'GET_SINGLE_USER_SUCCEEDED':
      return { ...state, activeUser: action.payload, loading: false };
    default:
      return state;
  }
};

const loggerMiddleware = store => next => action => {
  console.log(action);
  next(action);
};
//
//  Store
//
const middlewares = [sagaMiddleware, loggerMiddleware];
export const store = createStore(appReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(mySaga);
