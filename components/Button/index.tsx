import React, { MouseEventHandler } from "react";
import styles from "./Button.module.css";

interface IProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  type: string;
  children: React.ReactElement;
}

function Button({ children, type, onClick }: IProps) {
  return (
    <button onClick={onClick} className={styles.button} type={type}>
      {children}
    </button>
  );
}

export default Button;
