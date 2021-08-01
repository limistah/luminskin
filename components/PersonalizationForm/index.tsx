import React, { useState } from "react";
import styles from "./PersonalizationForm.module.css";
import { IProductOption } from "../ProductList";
import Button from "../Button";

interface IProps {
  productOptions: Array<IProductOption>;
  onSubmit: Function;
}

function PersonalizationForm({ productOptions, onSubmit = () => {} }: IProps) {
  const [formValues, setFormValues] = useState({});

  const handleInputChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formValues);
  };

  return (
    <form onSubmit={handleSubmit}>
      {productOptions.map((productOption) => {
        return (
          <div className={styles.inputGroup} key={productOption.title}>
            <label className={styles.inputLabel}>{productOption.title}</label>
            <select
              className={styles.inputSelect}
              onChange={handleInputChange}
              name={productOption.title}
            >
              {productOption.options.map((option) => {
                return (
                  <option value={option.value} key={option.id}>
                    {option.value}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}

      <Button type="submit">ADD TO CART</Button>
    </form>
  );
}

export default PersonalizationForm;
