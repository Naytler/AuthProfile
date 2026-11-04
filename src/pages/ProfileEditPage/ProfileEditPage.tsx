import { useGetProfileQuery } from "@/entities/profile";
import { ProfileEditForm } from "@/features/profile/edit";
import styles from "./ProfileEditPage.module.css";

export function ProfileEditPage() {
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  if (isLoading) {
    return <div className={styles.center}>Загрузка профиля...</div>;
  }

  if (isError || !profile) {
    return <div className={styles.center}>Не удалось загрузить профиль.</div>;
  }

  if (profile.profileId === undefined) {
    return (
      <div className={styles.center}>
        Не удалось определить идентификатор профиля для редактирования.
      </div>
    );
  }

  return <ProfileEditForm profile={profile} />;
}
