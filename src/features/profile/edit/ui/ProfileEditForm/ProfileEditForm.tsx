import { useState, type ReactNode } from "react";
import { FormProvider, useForm, type FieldErrors } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import type { Profile } from "@/entities/profile";
import { ROUTES } from "@/shared/config/routes";
import { Button } from "@/shared/ui/Button/Button";
import { PROFILE_EDIT_TABS, type ProfileEditTab } from "../../model/constants";
import { getFirstInvalidTab, toFormValues } from "../../model/mappers";
import type { ProfileFormValues } from "../../model/types";
import { useSaveProfile } from "../../model/useSaveProfile";
import { AboutSection } from "../AboutSection/AboutSection";
import { EducationSection } from "../EducationSection/EducationSection";
import { ExperienceSection } from "../ExperienceSection/ExperienceSection";
import { PersonalSection } from "../PersonalSection/PersonalSection";
import { ProjectsSection } from "../ProjectsSection/ProjectsSection";
import { SkillsSection } from "../SkillsSection/SkillsSection";
import styles from "./ProfileEditForm.module.css";

interface ProfileEditFormProps {
  profile: Profile;
}

export function ProfileEditForm({ profile }: ProfileEditFormProps) {
  const navigate = useNavigate();
  const [tab, setTab] = useState<ProfileEditTab>("personal");

  const methods = useForm<ProfileFormValues>({
    defaultValues: toFormValues(profile),
  });
  const { save, isSaving, hasError } = useSaveProfile(profile);

  const onSubmit = async (values: ProfileFormValues) => {
    if (await save(values)) navigate(ROUTES.profile);
  };

  // Ошибка может быть на скрытой вкладке — открываем её.
  const onInvalid = (errors: FieldErrors<ProfileFormValues>) => {
    const invalidTab = getFirstInvalidTab(errors);
    if (invalidTab) setTab(invalidTab);
  };

  const currentTabIndex = PROFILE_EDIT_TABS.findIndex(
    (item) => item.id === tab
  );
  const isLastTab = currentTabIndex === PROFILE_EDIT_TABS.length - 1;

  const handleNext = () => {
    const nextTab = PROFILE_EDIT_TABS[currentTabIndex + 1];
    if (nextTab) setTab(nextTab.id);
  };

  // Все секции смонтированы, неактивные скрыты через hidden:
  // так RHF валидирует поля со всех вкладок и не теряет их состояние.
  const sections: Record<ProfileEditTab, ReactNode> = {
    personal: <PersonalSection avatarUrl={profile.avatarUrl} />,
    about: <AboutSection />,
    skills: <SkillsSection />,
    projects: <ProjectsSection />,
    experience: <ExperienceSection />,
    education: <EducationSection />,
  };

  return (
    <FormProvider {...methods}>
      <form
        className={styles.form}
        noValidate
        onSubmit={methods.handleSubmit(onSubmit, onInvalid)}
      >
        <div className={styles.top}>
          <h1>Редактирование профиля</h1>
        </div>

        <nav className={styles.tabs} aria-label="Разделы профиля">
          {PROFILE_EDIT_TABS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.tab} ${
                tab === item.id ? styles.activeTab : ""
              }`}
              onClick={() => setTab(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {PROFILE_EDIT_TABS.map(({ id }) => (
          <div key={id} hidden={tab !== id}>
            {sections[id]}
          </div>
        ))}

        {hasError && (
          <p className={styles.error}>
            Не удалось сохранить профиль. Проверьте данные и попробуйте ещё раз.
          </p>
        )}

        <div className={styles.footerActions}>
          <button
            type="button"
            className={styles.cancel}
            onClick={() => navigate(ROUTES.profile)}
          >
            Отмена
          </button>

          {/* Разные key — чтобы React не переиспользовал один DOM-узел и
              клик по «Далее» не превращался в submit при смене type. */}
          {isLastTab ? (
            <Button key="save" type="submit" disabled={isSaving}>
              {isSaving ? "Сохраняем..." : "Сохранить изменения"}
            </Button>
          ) : (
            <Button key="next" type="button" onClick={handleNext}>
              Далее →
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
