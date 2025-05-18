import React from "react";
import { userAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { categories } from "../src/assets/assets";
import ProductCard from "../components/ProductCard";

const ProductCategory = () => {
  const { products } = userAppContext();
  const { category } = useParams();
  const searchCategory = categories.find(
    (item) => item.path.toLocaleLowerCase() === category
  );
  const filteredProducts = products.filter(
    (product) => product.category.toLocaleLowerCase() === category
  );
  return (
    <div className=" mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium">
            {searchCategory.text.toUpperCase()}
          </p>
          <div className="w-16 h-0.5 bg-primary rounded-full"></div>
        </div>
      )}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {
            filteredProducts.map((product, index) => (
              <ProductCard key={index} product={product}></ProductCard>
            ))
           }
      </div>) : (
          <div className="flex flex-col items-center justify-center h-[60vh] mt-16">
            <p className="text-2xl font-medium">No Products Found</p>
            <div className="w-16 h-0.5 bg-primary rounded-full"></div>
          </div>
      )}
    </div>
  );
};

export default ProductCategory;
