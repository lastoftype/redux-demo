import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import mySaga from "./sagas";

// Sagas
const sagaMiddleware = createSagaMiddleware();

//
//  Actions
//
export const setLoading = bool => ({
  type: "SET_LOADING",
  payload: bool
});

export const addOrder = order => ({
  type: "ADD_ORDER",
  payload: {
    id: order.id,
    name: order.name
  }
});

export const getUsers = () => ({
  type: "GET_USERS"
});

//
//  Reducer
//
export const INITIAL_STATE = {
  loading: false,
  orders: [],
  users: []
};

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    case "GET_USERS_SUCCEEDED":
      return { ...state, users: action.payload };
    default:
      return state;
  }
};

//
//  Store
//
export const store = createStore(appReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(mySaga);
