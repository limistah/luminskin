import React from "react";
import { IProductItem } from "../ProductList";
import Image from "next/image";

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
    <div>
      <div>
        <div className="title">{product.title}</div>
        <div>
          {options.map((option, index) => {
            return (
              <>
                <span key={index}>{option}</span>
                {/* {index + 1 < options.length && " | "} */}
              </>
            );
          })}
        </div>
        <div>One time purchase of Two Month supply.</div>
        <div>
          <div>
            <div onClick={() => handleUpdateCount(false)}>-</div>
            <div>{count}</div>
            <div onClick={() => handleUpdateCount()}>+</div>
          </div>
          <div>
            {currency} {count * Number(product.price)}
          </div>
        </div>
      </div>

      <div>
        <Image src={product.image_url} width="150" height="150" />
      </div>
    </div>
  );
}

export default Cartitem;
