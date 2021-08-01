import React from "react";
import styles from "./PageHead.module.css";

function PageHead() {
  return (
    <div className={styles.pageHeadcontainer}>
      <div>
        <h2 className={styles.pageHeadTitle}>All Products</h2>
        <p className={styles.pageHeadSlug}>A 360° look with lumin</p>
      </div>
      <div></div>
    </div>
  );
}

export default PageHead;
