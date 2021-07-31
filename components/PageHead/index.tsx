import React from "react";
import styles from "./PageHead.module.css";

function PageHead() {
  return (
    <div className={styles.pageHeadcontainer}>
      <div>
        <h2 className={styles.pageHeadTitle}>All Products</h2>
        <p className={styles.pageHeadSlug}>A 360° look with lumin</p>
      </div>
      <div>
        <select className={styles.pageHeadSelectInput}>
          <option disabled>filter by:</option>
          <option selected value="All Products">
            All Products
          </option>
          <option value="New Products">New Products</option>
          <option value="Packs">Packs</option>
          <option value="Skin Care">Skin Care</option>
          <option value="Hair and body care">Hair and body care</option>
          <option value="Accessories">Accessories</option>
        </select>
      </div>
    </div>
  );
}

export default PageHead;
