import { useFieldArray, useFormContext } from "react-hook-form";

import { Input } from "@/shared/ui/Input/Input";
import { emptyEducation } from "../../model/constants";
import type { ProfileFormValues } from "../../model/types";
import { RepeatableSection } from "../RepeatableSection/RepeatableSection";
import shared from "../shared.module.css";

export function EducationSection() {
  const { register, control } = useFormContext<ProfileFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <RepeatableSection
      title="Образование"
      hint="Добавьте образование и специальность."
      addLabel="Добавить образование"
      onAdd={() => append(emptyEducation)}
    >
      {fields.map((field, index) => (
        <div className={shared.repeatCard} key={field.id}>
          <div className={shared.grid}>
            <Input
              label="Учебное заведение"
              {...register(`education.${index}.institution`)}
            />
            <Input
              label="Специальность"
              {...register(`education.${index}.specialty`)}
            />
            <Input
              label="Дата начала"
              type="month"
              {...register(`education.${index}.startDate`)}
            />
            <Input
              label="Дата окончания"
              type="month"
              {...register(`education.${index}.endDate`)}
            />
          </div>
          <button
            type="button"
            className={shared.remove}
            onClick={() => remove(index)}
          >
            Удалить образование
          </button>
        </div>
      ))}
    </RepeatableSection>
  );
}
