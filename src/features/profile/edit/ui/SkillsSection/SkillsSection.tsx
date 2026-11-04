import { useFormContext, useWatch } from "react-hook-form";

import { useGetSkillsQuery } from "@/entities/skill";
import type { ProfileFormValues } from "../../model/types";
import shared from "../shared.module.css";
import styles from "./SkillsSection.module.css";

export function SkillsSection() {
  const { setValue, control } = useFormContext<ProfileFormValues>();
  const selectedIds = useWatch({ control, name: "skillIds" });
  const { data: skills = [], isLoading } = useGetSkillsQuery();

  const selectedSkills = skills.filter((skill) =>
    selectedIds.includes(String(skill.id))
  );
  const availableSkills = skills.filter(
    (skill) => !selectedIds.includes(String(skill.id))
  );

  const addSkill = (id: string) => {
    if (!id || selectedIds.includes(id)) return;
    setValue("skillIds", [...selectedIds, id], { shouldDirty: true });
  };

  const removeSkill = (id: string) => {
    setValue(
      "skillIds",
      selectedIds.filter((item) => item !== id),
      { shouldDirty: true }
    );
  };

  return (
    <section className={shared.card}>
      <div className={shared.simpleGrid}>
        <div>
          <h2>Твои навыки</h2>
          <p className={shared.hint}>
            Покажи что ты умеешь и чем ты действительно хорошо владеешь
          </p>
        </div>
        <div>
          <label className={shared.field}>
            <span>Навык</span>
            <select
              value=""
              disabled={isLoading}
              onChange={(event) => addSkill(event.target.value)}
            >
              <option value="">Выбери навыки из списка</option>
              {availableSkills.map((skill) => (
                <option key={String(skill.id)} value={String(skill.id)}>
                  {skill.title}
                </option>
              ))}
            </select>
          </label>

          <div className={styles.selectedTitle}>Выбранные навыки</div>
          <div className={styles.chips}>
            {selectedSkills.map((skill) => (
              <button
                type="button"
                key={String(skill.id)}
                className={styles.chip}
                onClick={() => removeSkill(String(skill.id))}
              >
                {skill.title}
                <span>×</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
