import React from "react";
import ProductCard from "./ProductCard";
import { userAppContext } from "../context/AppContext";

const BestSeller = () => {
  const { products } = userAppContext();
  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Best Seller</p>
      <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 mt-6">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product}></ProductCard>
          ))}
      </div>
    </div>
  );
};

export default BestSeller;
