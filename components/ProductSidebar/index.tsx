import React from "react";
import { IProductItem } from "../ProductList";
import Sidebar from "../Sidebar";
import style from "./ProductSidebar.module.css";
import Image from "next/image";
import PersonalizationForm from "../PersonalizationForm";

interface IProps {
  product: IProductItem;
  show: boolean;
  onClose: Function;
}

function ProductSidebar({ show, onClose, product }: IProps) {
  const handleSubmitPersonalizationForm = (formValues: {}) => {
    console.log(formValues);
  };

  return (
    <Sidebar show={show} onClose={onClose}>
      <>
        <div className={style.header}>
          <span className={style.headerBackIcon}>Back Button</span>
          <span className={style.headerBackIcon}>
            <Image
              src={product.image_url}
              className=""
              width="100px"
              height="90px"
            />
          </span>
        </div>
        <div>
          <h2>First, let's personalize</h2>
          <p>
            Products that you receive may vary according to your age bracket &
            skin type to optimize results.
          </p>
        </div>
        <div>
          <p>Personlization details</p>
          <PersonalizationForm
            productOptions={product.product_options}
            onSubmit={handleSubmitPersonalizationForm}
          />
        </div>
      </>
    </Sidebar>
  );
}

export default ProductSidebar;
