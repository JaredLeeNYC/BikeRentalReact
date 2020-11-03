import React, { useContext } from "react";
import { CartContext } from "./CartStore";

export const QuantityControl = ({ item }) => {
  const { dispatch } = useContext(CartContext);
  const { id, quantity } = item;

  const update = quantity =>
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } });

  return (
    <div className="flex text-xl">
      <button className="" onClick={() => update(quantity - 1)}>
        -
      </button>
      <div className="mx-2">{quantity}</div>
      <button className="" onClick={() => update(quantity + 1)}>
        +
      </button>
    </div>
  );
};
