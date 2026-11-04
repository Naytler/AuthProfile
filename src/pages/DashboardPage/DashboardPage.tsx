import { useGetProfileQuery } from "@/entities/profile";
import { ProfileCompletion } from "@/widgets/ProfileCompletion";
import styles from "./DashboardPage.module.css";

export function DashboardPage() {
  const { data: profile, isLoading } = useGetProfileQuery();

  if (isLoading || !profile) {
    return <div className={styles.center}>Загрузка...</div>;
  }

  return (
    <section className={styles.page}>
      <div className={styles.heading}>
        <p>Главная</p>
        <h1>Добро пожаловать, {profile.username || "пользователь"}!</h1>
      </div>

      <ProfileCompletion profile={profile} />

      <div className={styles.grid}>
        <article>
          <h2>Обучение</h2>
          <p>Здесь будут ваши курсы и прогресс обучения.</p>
        </article>
        <article>
          <h2>Последняя активность</h2>
          <p>После заполнения профиля здесь появятся рекомендации.</p>
        </article>
      </div>
    </section>
  );
}
