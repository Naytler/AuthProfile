import { useFormContext, useWatch } from "react-hook-form";

import type { ProfileFormValues } from "../../model/types";
import shared from "../shared.module.css";
import styles from "./AboutSection.module.css";

const ABOUT_MAX_LENGTH = 1000;

export function AboutSection() {
  const { register, control } = useFormContext<ProfileFormValues>();
  const about = useWatch({ control, name: "about" });

  return (
    <section className={shared.card}>
      <div className={shared.simpleGrid}>
        <div>
          <h2>О себе любимом(-ой)</h2>
          <p className={shared.hint}>Расскажите о себе своему сообществу.</p>
        </div>
        <label className={shared.field}>
          <span>О себе</span>
          <textarea
            rows={9}
            maxLength={ABOUT_MAX_LENGTH}
            placeholder="Расскажите немного о себе"
            {...register("about")}
          />
          <small className={styles.counter}>
            {about.length}/{ABOUT_MAX_LENGTH}
          </small>
        </label>
      </div>
    </section>
  );
}
