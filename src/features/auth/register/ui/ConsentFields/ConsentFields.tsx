import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { RegisterFormValues } from "../../model/types";
import styles from "./ConsentFields.module.css";

interface ConsentFieldsProps {
  register: UseFormRegister<RegisterFormValues>;
  errors: FieldErrors<RegisterFormValues>;
}

export function ConsentFields({ register, errors }: ConsentFieldsProps) {
  return (
    <div className={styles.consents}>
      <p className={styles.description}>
        Поставив галочку («✓») и нажимая «Зарегистрироваться»:
      </p>

      <label className={styles.item}>
        <input
          type="checkbox"
          {...register("personalData", {
            required: "Необходимо согласие на обработку персональных данных",
          })}
        />
        <span>
          Даю согласие на <a href="#">обработку ПД</a>, в соответствии с{" "}
          <a href="#">Политикой в отношении ПД</a>
        </span>
      </label>
      {errors.personalData?.message && (
        <small className={styles.error}>{errors.personalData.message}</small>
      )}

      <label className={styles.item}>
        <input
          type="checkbox"
          {...register("offer", {
            required: "Необходимо принять договор-оферту",
          })}
        />
        <span>Я подтверждаю, что ознакомился(-ась) с Договором-офертой</span>
      </label>
      {errors.offer?.message && (
        <small className={styles.error}>{errors.offer.message}</small>
      )}

      <label className={styles.item}>
        <input type="checkbox" {...register("marketing")} />
        <span>
          Даю согласие на получение рекламных и информационных рассылок
        </span>
      </label>
    </div>
  );
}
