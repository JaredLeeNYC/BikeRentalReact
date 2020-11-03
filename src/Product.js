import React, { useContext } from "react";
import { CartContext } from "./CartStore";
import { QuantityControl } from "./QuantityControl";
import * as _ from "lodash";

const PRODUCTS_ARRAY = [
  { id: 1, name: "Adult Male Bike", price: 20.5, type: "bike" },
  { id: 2, name: "Adult Female Bike", price: 20.5, type: "bike" },
  { id: 3, name: "Kids Unisex Bike", price: 12.75, type: "bike" },
  { id: 4, name: "Adult Unisex Helmet", price: 4.0, type: "accessory" },
  { id: 5, name: "Kids Unisex Helmet", price: 3.5, type: "accessory" },
  { id: 6, name: "Insurance", price: 9.99, type: "addon" }
];
export const PRODUCTS = _.keyBy(PRODUCTS_ARRAY, "id");
export const ProductList = () => (
  <div className="flex flex-wrap">{PRODUCTS_ARRAY.map(Product)}</div>
);

const Product = ({ id, name, price, type }) => {
  const { cart, dispatch } = useContext(CartContext);

  const isBike = type === "bike";
  const isCartHasBike = Object.keys(cart)
    .map(id => PRODUCTS[id].type)
    .includes("bike");
  if (!isBike && !isCartHasBike) return null;

  const addToCart = () => {
    dispatch({ type: "ADD_ITEM", payload: { id } });
  };
  const cartButton = cart[id] ? (
    <QuantityControl item={cart[id]} />
  ) : (
    <div className="cursor-pointer text-xl" onClick={addToCart}>
      🛍
    </div>
  );

  return (
    <div key={id} className="w-full md:w-1/3 lg:w-1/4 sm:w-1/2 px-2 my-4">
      <div className="text-gray-700 border border-gray-400 flex flex-col items-center mx-2 px-2">
        <div style={{ fontSize: 50 }}>{isBike ? "🚲" : "🧩"}</div>
        <div className="pb-2">
          {name} - ${price}
        </div>
        {cartButton}
      </div>
    </div>
  );
};
