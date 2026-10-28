import React from "react";
import { useOutletContext } from "react-router";
import ProductDetail from "../components/ProductDetail";

const ProductPage = () => {
  const { handleAddToCart } = useOutletContext();

  return (
    <div>
      <ProductDetail onAddToCart={handleAddToCart} />
    </div>
  );
};

export default ProductPage;