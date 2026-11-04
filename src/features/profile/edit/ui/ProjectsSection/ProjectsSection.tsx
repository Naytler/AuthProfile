import { useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/shared/ui/Input/Input";
import { emptyProject } from "../../model/constants";
import type { ProfileFormValues } from "../../model/types";
import { RepeatableSection } from "../RepeatableSection/RepeatableSection";
import shared from "../shared.module.css";

export function ProjectsSection() {
  const { register, control } = useFormContext<ProfileFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <RepeatableSection
      title="Проекты"
      hint="Расскажите о проектах, которыми вы гордитесь."
      addLabel="Добавить проект"
      onAdd={() => append(emptyProject)}
    >
      {fields.map((field, index) => (
        <div className={shared.repeatCard} key={field.id}>
          <div className={shared.grid}>
            <Input
              label="Название проекта"
              placeholder="Например, интернет-магазин"
              {...register(`projects.${index}.title`)}
            />
            <Input
              label="Ссылка"
              placeholder="https://..."
              {...register(`projects.${index}.url`)}
            />
          </div>
          <label className={shared.field}>
            <span>Описание</span>
            <textarea rows={4} {...register(`projects.${index}.description`)} />
          </label>
          <button
            type="button"
            className={shared.remove}
            onClick={() => remove(index)}
          >
            Удалить проект
          </button>
        </div>
      ))}
    </RepeatableSection>
  );
}
