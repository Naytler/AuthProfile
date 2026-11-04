import { ROUTES } from "@/shared/config/routes";
import { useForm } from "react-hook-form";
import { Link, useSearchParams } from "react-router-dom";

import { useResetPasswordMutation } from "../../api/authApi";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";

import styles from "./ResetPasswordForm.module.css";

interface ResetPasswordFormValues {
  password: string;
  confirm: string;
}

export function ResetPasswordForm() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";

  const [resetPassword, { isLoading, isSuccess, error }] =
    useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ResetPasswordFormValues>();

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit(({ password }) =>
        resetPassword({ token, password })
      )}
    >
      <h2>Изменение пароля</h2>

      <p className={styles.hint}>
        Пароль должен состоять минимум из 8 символов.
      </p>

      <Input
        label="Новый пароль"
        type="password"
        autoComplete="new-password"
        {...register("password", {
          required: "Введите новый пароль",
          minLength: {
            value: 8,
            message: "Минимум 8 символов",
          },
        })}
        error={errors.password?.message}
      />

      <Input
        label="Повторите пароль"
        type="password"
        autoComplete="new-password"
        {...register("confirm", {
          required: "Повторите пароль",
          validate: (value) =>
            value === getValues("password") || "Пароли не совпадают",
        })}
        error={errors.confirm?.message}
      />

      <Button type="submit" disabled={isLoading || !token}>
        {isLoading ? "Сохраняем..." : "Сохранить"}
      </Button>

      {isSuccess && (
        <p className={styles.success}>
          Пароль изменён. <Link to={ROUTES.login}>Войти</Link>
        </p>
      )}

      {error && (
        <p className={styles.error}>Ссылка недействительна или устарела.</p>
      )}
    </form>
  );
}
