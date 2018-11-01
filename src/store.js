import { createStore } from "redux";

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

//
//  Reducer
//
export const INITIAL_STATE = {
  loading: false,
  orders: []
};

export const appReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "ADD_ORDER":
      return { ...state, orders: [...state.orders, action.payload] };
    default:
      return state;
  }
};

//
//  Store
//
export const store = createStore(appReducer);
