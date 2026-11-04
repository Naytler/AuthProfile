import { ROUTES } from "@/shared/config/routes";
import { Link } from "react-router-dom";
import { ProfileCard, useGetProfileQuery } from "@/entities/profile";

import styles from "./ProfilePage.module.css";

export function ProfilePage() {
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return <div className={styles.center}>Загрузка профиля...</div>;
  }

  if (isError || !profile) {
    return <div className={styles.center}>Не удалось загрузить профиль.</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <div>
          <p>Мой профиль</p>
          <h1>Профиль</h1>
        </div>
        <Link className={styles.editButton} to={ROUTES.profileEdit}>
          Редактировать профиль
        </Link>
      </div>

      <div className={styles.layout}>
        <ProfileCard profile={profile} />

        <aside className={styles.achievements}>
          <h2>Достижения</h2>
          <p>У тебя пока нет достижений</p>
        </aside>
      </div>
    </section>
  );
}
