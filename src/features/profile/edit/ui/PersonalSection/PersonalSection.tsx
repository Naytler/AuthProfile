import { useRef } from "react";
import { useFormContext } from "react-hook-form";

import { SOCIAL_LINKS } from "@/entities/profile";
import { useGetSpecializationsQuery } from "@/entities/specialization";
import { Input } from "@/shared/ui/Input/Input";
import { EMAIL_PATTERN, SPECIALIST_LEVELS } from "../../model/constants";
import type { ProfileFormValues } from "../../model/types";
import { useAvatarPreview } from "../../model/useAvatarPreview";
import shared from "../shared.module.css";
import styles from "./PersonalSection.module.css";

interface PersonalSectionProps {
  avatarUrl?: string | null;
}

export function PersonalSection({ avatarUrl }: PersonalSectionProps) {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<ProfileFormValues>();
  const { data: specializations = [], isLoading: specializationsLoading } =
    useGetSpecializationsQuery();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const { avatarPreview, onAvatarChange, clearAvatar } = useAvatarPreview(
    avatarUrl,
    setValue
  );

  const openFileDialog = () => fileInputRef.current?.click();

  return (
    <section className={shared.card}>
      <div className={shared.sectionGrid}>
        <div>
          <h2>Фото профиля</h2>
          <p className={shared.hint}>
            Поделитесь своим профилем в других соц. сетях
          </p>
        </div>
        <div className={styles.avatarRow}>
          <div className={styles.avatar}>
            {avatarPreview ? (
              <img src={avatarPreview} alt="Фото профиля" />
            ) : (
              <span>Фото</span>
            )}
          </div>
          <div className={styles.avatarActions}>
            <button
              type="button"
              className={styles.uploadButton}
              onClick={openFileDialog}
            >
              Загрузить фото
            </button>
            {avatarPreview && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={clearAvatar}
              >
                Удалить фото
              </button>
            )}
            <input
              ref={fileInputRef}
              hidden
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(event) => onAvatarChange(event.target.files?.[0])}
            />
          </div>
          <button
            type="button"
            className={styles.dropzone}
            onClick={openFileDialog}
          >
            <strong>Кликни для изменения</strong> или перетащи сюда фотографию
            <span>JPG, PNG, JPEG (не более 5Мб)</span>
          </button>
        </div>
      </div>

      <div className={shared.sectionGrid}>
        <div>
          <h2>Персональная информация</h2>
          <p className={shared.hint}>Поделитесь своими данными в профиле</p>
        </div>
        <div className={shared.fields}>
          <div className={shared.grid}>
            <Input
              label="Никнейм *"
              {...register("username", { required: "Введите никнейм" })}
              error={errors.username?.message}
            />
            <Input
              label="Номер для связи"
              placeholder="+7 000 000-00-00"
              {...register("phone")}
            />
            <label className={shared.field}>
              <span>IT Специальность *</span>
              <select
                {...register("specializationId")}
                disabled={specializationsLoading}
              >
                <option value="">Выберите специальность</option>
                {specializations.map((item) => (
                  <option key={String(item.id)} value={String(item.id)}>
                    {item.title ?? item.name}
                  </option>
                ))}
              </select>
            </label>
            <Input
              label="Email для связи"
              placeholder="Example text"
              type="email"
              {...register("email", {
                pattern: {
                  value: EMAIL_PATTERN,
                  message: "Введите корректный email",
                },
              })}
              error={errors.email?.message}
            />
            <Input
              label="Локация"
              placeholder="Напр. Санкт-Петербург, Россия"
              {...register("city")}
            />
            <label className={shared.field}>
              <span>Уровень специалиста</span>
              <select {...register("level")}>
                <option value="">Выберите уровень</option>
                {SPECIALIST_LEVELS.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className={styles.linksBlock}>
            <h3>Личные ссылки</h3>
            <p className={shared.hint}>
              Поделитесь своими профилями в других соц. сетях
            </p>
            <div className={`${shared.grid} ${styles.linksGrid}`}>
              {SOCIAL_LINKS.map(({ key, label }) => (
                <Input
                  key={key}
                  label={label}
                  placeholder="Ссылка"
                  {...register(`links.${key}`)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
