import { createContext, useReducer } from 'react';

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],

    bookmarkItems: localStorage.getItem('bookmarks')
      ? JSON.parse(localStorage.getItem('bookmarks'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'BOOK__TRAIN': {
      //add train to cart
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );

      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'BOOKMARK__TRAIN': {
      //add train to cart
      const newItem = action.payload;
      const existItem = state.cart.bookmarkItems.find(
        (item) => item._id === newItem._id
      );

      const bookmarkItems = existItem
        ? state.cart.bookmarkItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.bookmarkItems, newItem];

      localStorage.setItem('bookmarks', JSON.stringify(bookmarkItems));
      return { ...state, cart: { ...state.cart, bookmarkItems } };
    }

    case 'REMOVE__TRAIN': {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'REMOVE__BOOKMARK': {
      const bookmarkItems = state.cart.bookmarkItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem('bookmarks', JSON.stringify(bookmarkItems));
      return { ...state, cart: { ...state.cart, bookmarkItems } };
    }

    default: {
      return state;
    }
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
