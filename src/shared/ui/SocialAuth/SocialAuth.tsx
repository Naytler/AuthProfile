import styles from "./SocialAuth.module.css";
import telegramIcon from "./assets/Telegram.svg";
import googleIcon from "./assets/google.svg";
import facebookIcon from "./assets/facebook.svg";

export function SocialAuth() {
  return (
    <div className={styles.socialAuth}>
      <p>Зарегистрироваться через социальные сети</p>

      <div className={styles.socials}>
        <a href="#">
          <img src={telegramIcon} alt="Telegram" />
        </a>

        <a href="#">
          <img src={googleIcon} alt="Google" />
        </a>

        <a href="#">
          <img src={facebookIcon} alt="Facebook" />
        </a>
      </div>
    </div>
  );
}
