import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export function Button({
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
}
