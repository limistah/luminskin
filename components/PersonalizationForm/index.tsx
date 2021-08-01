import React, { useEffect, useState } from "react";
import styles from "./PersonalizationForm.module.css";
import { IProductOption } from "../ProductList";
import Button from "../Button";

interface IProps {
  productOptions: Array<IProductOption>;
  onSubmit: Function;
}

function PersonalizationForm({ productOptions, onSubmit = () => {} }: IProps) {
  const [formValues, setFormValues] = useState({});

  // Select the first item for the default values
  useEffect(() => {
    const defaultValues = {};
    productOptions.map((o) => {
      // @ts-ignore
      defaultValues[o.title] = o.options[0].value;
    });
    setFormValues(defaultValues);
  }, []);

  // Always submit this personalization if there is no product options
  useEffect(() => {
    if (!productOptions.length) {
      const values = Object.values(formValues);
      onSubmit(formValues, values);
    }
  }, []);

  // Handle when the input changes
  const handleInputChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setFormValues({
      ...formValues,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  // Handle when the form is submitted
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = Object.values(formValues);
    onSubmit(formValues, values);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroups}>
        {productOptions.map((productOption) => {
          return (
            !productOption.title.includes("Frequency") && (
              <div className={styles.inputGroup} key={productOption.title}>
                <label className={styles.inputLabel}>
                  {productOption.title}
                </label>
                <select
                  className={styles.inputSelect}
                  onChange={handleInputChange}
                  name={productOption.title}
                  defaultValue={productOption.options[0].value}
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
            )
          );
        })}
      </div>

      <div className={styles.btnContainer}>
        <Button type="submit">ADD TO CART</Button>
      </div>
    </form>
  );
}

export default PersonalizationForm;
