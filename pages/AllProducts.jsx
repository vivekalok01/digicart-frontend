import React, { useEffect } from "react";
import { userAppContext } from "../context/AppContext";
import ProductCard from "../components/ProductCard";

const AllProducts = () => {
  const { products, searchQuery } = userAppContext();
  const [filteredProducts, setFilteredProducts] = React.useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col">
      <div className="flex flex-col items-end w-max">
        <p className="text-2xl font-medium uppercase">ALL PRODUCTS</p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
        {
          filteredProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCard key={index} product={product} ></ProductCard>
          ) )
        }
      </div>
    </div>
  );
};

export default AllProducts;
AllProducts;
