import { Link } from "react-router-dom";
import styles from "./AuthSwitch.module.css";

interface AuthSwitchProps {
  text: string;
  linkText: string;
  to: string;
}

export function AuthSwitch({ text, linkText, to }: AuthSwitchProps) {
  return (
    <p className={styles.hint}>
      {text} <Link to={to}>{linkText}</Link>
    </p>
  );
}
