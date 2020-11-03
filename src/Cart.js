import React, { useContext } from "react";
import { CartContext } from "./CartStore";
import { PRODUCTS } from "./Product";
import { QuantityControl } from "./QuantityControl";

export const Cart = () => {
  const { cart } = useContext(CartContext);
  const items = Object.values(cart);
  const total = items.reduce(
    (total, item) => total + PRODUCTS[item.id].price * item.quantity,
    0
  );
  const isValid = Object.keys(cart)
    .map(id => PRODUCTS[id].type)
    .includes("bike");
  return (
    <div className="fixed bottom-0 right-0 bg-blue-100 text-gray-700 border border-blue-200">
      <div className="p-2 flex justify-between text-xl">
        Cart <div>Total: ${total.toFixed(2)}</div>
      </div>
      {items.map(item => (
        <CartItem key={item.id} item={item} />
      ))}
      <div className="p-2 flex justify-between">
        <button
          disabled={!isValid}
          className={`${
            isValid ? "text-blue-700" : "text-gray-400 cursor-not-allowed"
          } font-bold`}
        >
          Checkout
        </button>
        {!isValid && <div className="text-red-500">no bike</div>}
      </div>
    </div>
  );
};

const CartItem = ({ item }) => {
  const { id } = item;
  const { dispatch } = useContext(CartContext);
  const { name, type, price } = PRODUCTS[id];
  const remove = () => dispatch({ type: "REMOVE_ITEM", payload: id });
  return (
    <div
      key={id}
      className="flex items-center justify-between p-2 border-b border-blue-200"
      style={{ width: 340 }}
    >
      <div>
        <button className="mr-2 text-red-500 cursor-pointer" onClick={remove}>
          x
        </button>
        {type === "bike" ? "🚲" : "🧩"} {name} - ${price}
      </div>
      <QuantityControl item={item} />
    </div>
  );
};
