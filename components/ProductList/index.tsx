import React from "react";

type Products = {};

export interface IProductListProps {
  products: Array<Products>;
  currentCurrency: string;
}

function ProductList({
  products,
  currentCurrency,
}: IProductListProps): React.ReactElement {
  return <div>Hello</div>;
}

export default ProductList;
