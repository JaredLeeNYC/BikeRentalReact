import React from "react";
import { CartProvider } from "./CartStore";
import { Cart } from "./Cart";
import { ProductList } from "./Product";

export default function App() {
  return (
    <CartProvider>
      <div className="m-10">
        <h1 className="leading-loose text-2xl text-center">Bike Rentals</h1>
        <ProductList />
        <Cart />
      </div>
    </CartProvider>
  );
}
