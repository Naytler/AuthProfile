import { Link } from "react-router-dom";
import type { Profile } from "@/entities/profile";
import { getProfileCompletion } from "@/entities/profile";
import { ROUTES } from "@/shared/config/routes";
import styles from "./ProfileCompletion.module.css";

export function ProfileCompletion({ profile }: { profile: Profile }) {
  const completion = getProfileCompletion(profile);

  return (
    <section className={styles.card}>
      <div>
        <p className={styles.eyebrow}>Ваш профиль</p>
        <h2>Профиль заполнен на {completion.percent}%</h2>
        <p>
          Заполните профиль, чтобы повысить узнаваемость и добавить больше
          информации о себе.
        </p>
      </div>

      <div className={styles.progress}>
        <div style={{ width: `${completion.percent}%` }} />
      </div>

      <Link to={ROUTES.profileEdit}>Заполнить профиль</Link>
    </section>
  );
}
