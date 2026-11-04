import type { Profile } from "../../model/types";
import styles from "./ProfileCard.module.css";

export function ProfileCard({ profile }: { profile: Profile }) {
  const initials = profile.username
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <section className={styles.card}>
      <div className={styles.top}>
        <div className={styles.avatar}>
          {profile.avatarUrl ? (
            <img src={profile.avatarUrl} alt="" />
          ) : (
            initials || "Y"
          )}
        </div>

        <div className={styles.identity}>
          <div className={styles.nameRow}>
            <h1>{profile.username || "Ваш профиль"}</h1>
            <span>Кандидат</span>
          </div>
          <p>{profile.specialization || "Специализация не указана"}</p>
          {profile.city && <small>{profile.city}</small>}
        </div>
      </div>

      <div className={styles.body}>
        <h2>Обо мне</h2>
        <p>{profile.about || "Расскажите о себе, опыте и профессиональных интересах."}</p>
      </div>

      <div className={styles.body}>
        <h2>Навыки</h2>
        {profile.skillNames?.length ? (
          <div className={styles.tags}>
            {profile.skillNames.map((skill, index) => (
              <span key={`${skill}-${index}`}>{skill}</span>
            ))}
          </div>
        ) : (
          <p>Навыки пока не добавлены.</p>
        )}
      </div>
    </section>
  );
}
