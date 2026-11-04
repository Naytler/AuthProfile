import { ROUTES } from "@/shared/config/routes";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button/Button";
import { getApiErrorMessage } from "@/shared/lib/apiError";
import { Input } from "@/shared/ui/Input/Input";
import { useLoginMutation } from "../../api/authApi";
import styles from "./LoginForm.module.css";
import { SocialAuth } from "@/shared/ui/SocialAuth/SocialAuth";
import { AuthSwitch } from "@/shared/ui/AuthSwitch/AuthSwitch";

interface LoginFormValues {
  username: string;
  password: string;
}

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const [login, { isLoading, error }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const onSubmit = async (values: LoginFormValues) => {
    try {
      await login({
        username: values.username,
        password: values.password,
      }).unwrap();

      const from =
        typeof location.state?.from === "string"
          ? location.state.from
          : ROUTES.dashboard;

      navigate(from, { replace: true });
    } catch {}
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Вход в личный кабинет</h2>

        <Input
          label="Электронная почта"
          placeholder="Введите электронную почту"
          autoComplete="username"
          {...register("username", { required: "Введите электронную почту" })}
          error={errors.username?.message}
        />

        <Input
          label="Пароль"
          type="password"
          placeholder="Введите пароль"
          autoComplete="current-password"
          {...register("password", { required: "Введите пароль" })}
          error={errors.password?.message}
        />

        <Link className={styles.small_link} to={ROUTES.forgotPassword}>
          Забыли пароль?
        </Link>

        {error && <p className={styles.error}>{getApiErrorMessage(error, "Не удалось выполнить вход")}</p>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Входим..." : "Вход"}
        </Button>

        <SocialAuth />
      </form>

      <AuthSwitch
        text="Нет аккаунта?"
        linkText="Зарегистрироваться"
        to={ROUTES.register}
      />
    </>
  );
}
