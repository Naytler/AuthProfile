import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, ...props }: InputProps) {
  return (
    <label className={styles.field}>
      <span>{label}</span>
      <input {...props} />
      {error && <small className={styles.error}>{error}</small>}
    </label>
  );
}
