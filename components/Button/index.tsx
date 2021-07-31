import React from "react";
import styles from "./Button.module.css";

function Button({ children, onClick }) {
  return (
    <div onClick={onClick} className={styles.button}>
      {children}
    </div>
  );
}

export default Button;
