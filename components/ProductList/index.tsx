import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button";
import styles from "./ProductList.module.css";
import ProductSidebar from "../ProductSidebar";

export type IProductOption = {
  prefix: string;
  suffix: string;
  title: string;
  options: Array<{
    id: string;
    value: string;
  }>;
};

export type IProductItem = {
  title: string;
  price: string;
  currency: string;
  product_options: Array<IProductOption>;
  id: string;
  image_url: string;
};

export interface IProductListProps {
  products: Array<IProductItem>;
  currentCurrency: string;
}

function ProductItem({
  title,
  price,
  image_url,
  currency,
  ...props
}: IProductItem): React.ReactElement {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleAddToCart = () => {
    setShowSidebar(true);
  };

  return (
    <div className={styles.productItemContainer}>
      <ProductSidebar
        show={showSidebar}
        onClose={() => setShowSidebar(false)}
        product={{ ...props, title, price, image_url, currency }}
      />
      <a>
        <Image src={image_url} className="" width="100px" height="90px" />
      </a>
      <div className={styles.productItemTitle}>{title}</div>
      <div className={styles.productItemPrice}>
        {currency} {price}
      </div>
      <div className={styles.productItemButton}>
        <Button onClick={handleAddToCart}>Add to cart</Button>
      </div>
    </div>
  );
}

function ProductList({
  products,
  currentCurrency,
}: IProductListProps): React.ReactElement {
  return (
    <div className={styles.productListContainer}>
      {products.map((product) => {
        return (
          <ProductItem
            key={product.id}
            title={product.title}
            image_url={product.image_url}
            price={product.price}
            id={product.id}
            product_options={product.product_options}
            currency={currentCurrency}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
