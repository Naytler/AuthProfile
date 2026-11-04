import { Outlet } from "react-router-dom";
import styles from "./AuthLayout.module.css";

export function AuthLayout() {
  return (
    <main className={styles.auth_layout}>
      <section className={styles.auth_promo}>
        <div>
          <h1>Yeahub</h1>
          <p>Yeahub объединяет IT-специалистов</p>
        </div>
        <div>
          <h2>Стань частью сообщества Yeahub и получи:</h2>
          <ul>
            <li>Пошаговый план обучения</li>
            <li>Карьерный рост</li>
            <li>Большое сообщество специалистов</li>
            <li>Обучение с ментором</li>
            <li>Возможность прохождения стажировки</li>
          </ul>
        </div>
      </section>
      <section className={styles.auth_content}>
        <Outlet />
      </section>
    </main>
  );
}
