import { useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/shared/ui/Input/Input";
import { emptyExperience } from "../../model/constants";
import type { ProfileFormValues } from "../../model/types";
import { RepeatableSection } from "../RepeatableSection/RepeatableSection";
import shared from "../shared.module.css";

export function ExperienceSection() {
  const { register, control } = useFormContext<ProfileFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  return (
    <RepeatableSection
      title="Опыт работы"
      hint="Добавьте места работы и расскажите о своих обязанностях."
      addLabel="Добавить место работы"
      onAdd={() => append(emptyExperience)}
    >
      {fields.map((field, index) => (
        <div className={shared.repeatCard} key={field.id}>
          <div className={shared.grid}>
            <Input
              label="Компания"
              {...register(`experience.${index}.company`)}
            />
            <Input
              label="Должность"
              {...register(`experience.${index}.position`)}
            />
            <Input
              label="Дата начала"
              type="month"
              {...register(`experience.${index}.startDate`)}
            />
            <Input
              label="Дата окончания"
              type="month"
              {...register(`experience.${index}.endDate`)}
            />
          </div>
          <label className={shared.field}>
            <span>Описание</span>
            <textarea
              rows={4}
              {...register(`experience.${index}.description`)}
            />
          </label>
          <button
            type="button"
            className={shared.remove}
            onClick={() => remove(index)}
          >
            Удалить место работы
          </button>
        </div>
      ))}
    </RepeatableSection>
  );
}
