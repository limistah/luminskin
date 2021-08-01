import React, { MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface IProps {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactElement | string;
}

function Button({ children, type = "button", onClick }: IProps) {
  return (
    <button onClick={onClick} className={styles.button} type={type}>
      {children}
    </button>
  );
}

export default Button;
