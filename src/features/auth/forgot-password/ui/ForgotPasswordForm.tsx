import { ROUTES } from "@/shared/config/routes";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRequestResetMutation } from "../../api/authApi";
import { ResetEmailSentModal } from "./ResetEmailSentModal/ResetEmailSentModal";
import { Button } from "@/shared/ui/Button/Button";
import { Input } from "@/shared/ui/Input/Input";
import { AuthSwitch } from "@/shared/ui/AuthSwitch/AuthSwitch";


import styles from "./ForgotPasswordForm.module.css";

interface Values {
  email: string;
}

export function ForgotPasswordForm() {
  const [requestReset, { isLoading, error }] = useRequestResetMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Values>();

  const onSubmit = async (data: Values) => {
    try {
      await requestReset(data).unwrap();
      setIsModalOpen(true);
    } catch {}
  };

  const handleResend = async () => {
    const email = getValues("email");

    try {
      await requestReset({ email }).unwrap();
    } catch {}
  };

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <h2>Забыли пароль?</h2>

        <p className={styles.hint}>
          Для восстановления пароля введите адрес эл. почты, на который вы
          регистрировались. Мы отправим письмо для восстановления пароля
        </p>

        <Input
          label="Электронная почта"
          placeholder="Введите электронную почту"
          type="email"
          {...register("email", {
            required: "Введите email",
          })}
          error={errors.email?.message}
        />

        {error && (
          <p className={styles.error}>
            Не удалось отправить письмо. Проверьте email и попробуйте ещё раз.
          </p>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Отправляем..." : "Отправить"}
        </Button>

        <Link className={styles.small_link} to={ROUTES.login}>
          Вернуться ко входу
        </Link>
      </form>

      <AuthSwitch
        text="Нет аккаунта?"
        linkText="Зарегистрироваться"
        to={ROUTES.register}
      />

      {isModalOpen && (
        <ResetEmailSentModal
          onClose={() => setIsModalOpen(false)}
          onResend={handleResend}
        />
      )}
    </>
  );
}
