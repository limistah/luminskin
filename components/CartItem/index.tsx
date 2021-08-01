import React from "react";
import { IProductItem } from "../ProductList";
import Image from "next/image";
import style from "./CartItem.module.css";

export interface ICartItem {
  product: IProductItem;
  options: Array<string>;
  count: number;
  currency?: string;
  index?: number;
  onUpdateItem?: Function;
}

function Cartitem({
  product,
  options,
  count,
  currency,
  index,
  onUpdateItem = () => {},
}: ICartItem) {
  const handleUpdateCount = (increment = true) => {
    let newCount = count;
    newCount = increment ? newCount + 1 : newCount - 1;
    // New count must not be less than 1
    newCount = newCount < 1 ? 1 : newCount;
    onUpdateItem(
      {
        product,
        options,
        count: newCount,
      },
      index
    );
  };
  return (
    <div className={style.cartItemContainer}>
      <div className={style.cartItemInfo}>
        <h6 className={style.cartItemTitle}>{product.title}</h6>
        <div className={style.cartItemOptions}>
          {options.map((option, index) => {
            return (
              <>
                <span className={style.cartItemOption} key={index}>
                  {option}
                </span>
                {/* {index + 1 < options.length && " | "} */}
              </>
            );
          })}
        </div>
        <div className={style.cartItemSubType}>
          One time purchase of Two Month supply.
        </div>
        <div className={style.cartItemQty}>
          <div className={style.cartItemCounter}>
            <div
              className={style.cartItemCountAction}
              onClick={() => handleUpdateCount(false)}
            >
              -
            </div>
            <div className={style.cartItemCountVal}>{count}</div>
            <div
              className={style.cartItemCountAction}
              onClick={() => handleUpdateCount()}
            >
              +
            </div>
          </div>
          <div>
            {currency} {count * Number(product.price)}
          </div>
        </div>
      </div>

      <div className={style.cartItemImage}>
        <Image src={product.image_url} width="80" height="80" />
      </div>
    </div>
  );
}

export default Cartitem;
