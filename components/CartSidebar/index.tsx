import React from "react";
import Sidebar from "../Sidebar";
import style from "./CartSidebar.module.css";
import Cartitem, { ICartItem } from "../CartItem";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Button from "../Button";

interface IProps {
  show: boolean;
  onClose: Function;
  cartDetails: Array<ICartItem>;
  currency?: string;
  onUpdateItem: Function;
  onRemoveItem: Function;
}

function CartSidebar({
  show,
  onClose,
  cartDetails,
  currency,
  onUpdateItem = () => {},
  onRemoveItem = () => {},
}: IProps) {
  const handleSubmitPersonalizationForm = (formValues: {}) => {
    console.log(formValues);
  };

  const total = cartDetails.reduce((currPrice, item) => {
    return currPrice + item.count * Number(item.product.price);
  }, 0);

  return (
    <Sidebar show={show} onClose={onClose}>
      <div className={style.sidebar}>
        <div className={style.header}>
          <span className={style.headerBackIcon} onClick={() => onClose(false)}>
            <ChevronRightIcon />
          </span>
          <span className={style.headerText}>Your cart</span>
        </div>
        <div className={style.cartItems}>
          <div>
            {cartDetails.map((cartItem, index) => (
              <Cartitem
                {...cartItem}
                key={index}
                index={index}
                currency={currency}
                onUpdateItem={onUpdateItem}
                onRemoveItem={onRemoveItem}
              />
            ))}
          </div>
        </div>
        <div className={style.cartFooter}>
          <div className={style.cartFooterTotal}>
            <span>Subtotal</span>
            <span>
              {currency} {total}
            </span>
          </div>
          <div>
            <Button>PROCEED TO CHECKOUT</Button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default CartSidebar;
