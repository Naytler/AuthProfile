import { ROUTES } from "@/shared/config/routes";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button/Button";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { Input } from "@/shared/ui/Input/Input";
import { useRegisterMutation } from "../../api/authApi";

import { AuthSwitch } from "@/shared/ui/AuthSwitch/AuthSwitch";
import { SocialAuth } from "@/shared/ui/SocialAuth/SocialAuth";
import { ConsentFields } from "./ConsentFields/ConsentFields";

import styles from "./RegisterForm.module.css";

import type { RegisterFormValues } from "../model/types";

function getRegisterErrorMessage(error: unknown) {
  if (error && typeof error === "object" && "status" in error && error.status === 409) {
    return "Пользователь с такими данными уже существует";
  }

  return getApiErrorMessage(error, "Не удалось зарегистрировать пользователя");
}

export function RegisterForm() {
  const navigate = useNavigate();

  const [registerUser, { isLoading, error }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      await registerUser({
        username: values.username,
        email: values.email,
        password: values.password,
      }).unwrap();

      navigate(ROUTES.dashboard, { replace: true });
    } catch {
      // Ошибка уже отображается через error из RTK Query.
    }
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Регистрация</h2>

        <Input
          label="Имя"
          placeholder="Ваше имя"
          autoComplete="username"
          {...register("username", {
            required: "Введите имя",
          })}
          error={errors.username?.message}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Введите email"
          autoComplete="email"
          {...register("email", {
            required: "Введите email",
          })}
          error={errors.email?.message}
        />

        <Input
          label="Пароль"
          type="password"
          autoComplete="new-password"
          placeholder="Минимум 8 символов"
          {...register("password", {
            required: "Введите пароль",
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
          placeholder="Повторите пароль"
          {...register("confirmPassword", {
            required: "Повторите пароль",
            validate: (value) =>
              value === getValues("password") || "Пароли не совпадают",
          })}
          error={errors.confirmPassword?.message}
        />

        {error && <p className={styles.error}>{getRegisterErrorMessage(error)}</p>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Создаём..." : "Зарегистрироваться"}
        </Button>

        <ConsentFields register={register} errors={errors} />

        <SocialAuth />
      </form>

      <AuthSwitch text="Уже есть аккаунт?" linkText="Войти" to={ROUTES.login} />
    </>
  );
}
