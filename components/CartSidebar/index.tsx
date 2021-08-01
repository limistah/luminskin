import React from "react";
import Sidebar from "../Sidebar";
import style from "./CartSidebar.module.css";
import Cartitem, { ICartItem } from "../CartItem";

interface IProps {
  show: boolean;
  onClose: Function;
  cartDetails: Array<ICartItem>;
  currency?: string;
  onUpdateItem: Function;
}

function CartSidebar({
  show,
  onClose,
  cartDetails,
  currency,
  onUpdateItem = () => {},
}: IProps) {
  const handleSubmitPersonalizationForm = (formValues: {}) => {
    console.log(formValues);
  };

  return (
    <Sidebar show={show} onClose={onClose}>
      <>
        {cartDetails.map((cartItem, index) => (
          <Cartitem
            {...cartItem}
            key={index}
            index={index}
            currency={currency}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </>
    </Sidebar>
  );
}

export default CartSidebar;
