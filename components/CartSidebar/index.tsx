import React from "react";
import { IProductItem } from "../ProductList";
import Sidebar from "../Sidebar";
import style from "./ProductSidebar.module.css";
import Image from "next/image";
import PersonalizationForm from "../PersonalizationForm";

interface IProps {
  show: boolean;
  onClose: Function;
  cartDetails: {};
}

function ProductSidebar({ show, onClose, cartDetails }: IProps) {
  const handleSubmitPersonalizationForm = (formValues: {}) => {
    console.log(formValues);
  };

  return (
    <Sidebar show={show} onClose={onClose}>
      <>Cart</>
    </Sidebar>
  );
}

export default ProductSidebar;
