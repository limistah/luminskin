import React from "react";
import Image from "next/image";
import Button from "../Button";
import styles from "./ProductList.module.css";

type IProductItem = {
  title: string;
  price: string;
  currency: string;
  product_options: Array<{
    prefix: string;
    suffix: string;
    title: string;
    options: {
      id: string;
      value: string;
    };
  }>;
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
}: IProductItem): React.ReactElement {
  return (
    <div className={styles.productItemContainer}>
      <a>
        <Image src={image_url} className="" width="100px" height="90px" />
      </a>
      <div className={styles.productItemTitle}>{title}</div>
      <div className={styles.productItemPrice}>
        {currency} {price}
      </div>
      <div className={styles.productItemButton}>
        <Button>Add to cart</Button>
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
            title={product.title}
            image_url={product.image_url}
            price={product.price}
            currency={currentCurrency}
          />
        );
      })}
    </div>
  );
}

export default ProductList;
