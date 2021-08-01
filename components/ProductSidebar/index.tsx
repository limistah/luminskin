import React from "react";
import { IProductItem } from "../ProductList";
import Sidebar from "../Sidebar";
import style from "./ProductSidebar.module.css";
import Image from "next/image";
import PersonalizationForm from "../PersonalizationForm";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

interface IProps {
  product: IProductItem;
  show: boolean;
  onClose: Function;
  onPersonalized?: Function;
}

function ProductSidebar({
  show,
  onClose,
  product,
  onPersonalized = () => {},
}: IProps) {
  const handleSubmitPersonalizationForm = (formValues: {}) => {
    onPersonalized(formValues);
  };

  return (
    <Sidebar show={show} onClose={onClose}>
      <>
        <div className={style.header}>
          <span className={style.headerBackIcon} onClick={() => onClose(false)}>
            <ChevronLeftIcon />
          </span>
          <span className={style.headerImage}>
            <Image
              src={product.image_url}
              className=""
              width="50px"
              height="50px"
            />
          </span>
        </div>
        <div className={style.productSidebarDetails}>
          <div className={style.personalizeInfo}>
            <h2>{`First, let's personalize`}</h2>
            <p>
              Products that you receive may vary according to your age bracket &
              skin type to optimize results.
            </p>
          </div>
          <div className={style.personalizeFormContainer}>
            <p>Personlization details</p>
            <PersonalizationForm
              productOptions={product.product_options}
              onSubmit={handleSubmitPersonalizationForm}
            />
          </div>
        </div>
      </>
    </Sidebar>
  );
}

export default ProductSidebar;
