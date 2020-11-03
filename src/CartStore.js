import React, { createContext, useReducer } from "react";
const reducer = (cart, action) => {
  const { type, payload } = action;
  const _cart = { ...cart };
  switch (type) {
    case "ADD_ITEM":
      return { ...cart, [payload.id]: { id: payload.id, quantity: 1 } };
    case "REMOVE_ITEM":
      delete _cart[payload];
      return _cart;
    case "UPDATE_QUANTITY":
      if (payload.quantity > 0) {
        _cart[payload.id].quantity = payload.quantity;
      } else {
        delete _cart[payload.id];
      }
      return _cart;
    default:
      return cart;
  }
};
// const initial = {}
const initial = { 1: { id: 1, quantity: 2 } };
export const CartContext = createContext({});
export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(reducer, initial);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
