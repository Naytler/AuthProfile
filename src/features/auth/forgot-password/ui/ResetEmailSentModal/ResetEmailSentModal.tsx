import { useEffect, useState } from "react";
import styles from "./ResetEmailSentModal.module.css";
import envelop from "./assets/envelop.svg";

interface ResetEmailSentModalProps {
  onClose: () => void;
  onResend: () => Promise<void>;
}

export function ResetEmailSentModal({
  onClose,
  onResend,
}: ResetEmailSentModalProps) {
  const [seconds, setSeconds] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (seconds <= 0) {
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  const handleResend = async () => {
    if (seconds > 0 || isResending) return;

    try {
      setIsResending(true);

      await onResend();

      setSeconds(60);
    } finally {
      setIsResending(false);
    }
  };
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Закрыть"
        >
          ×
        </button>

        <img src={envelop} alt="envelope" />

        <h2>
          Мы отправили письмо
          <br />с инструкциями
        </h2>

        <p>
          Если вы не получили письмо с инструкциями, проверьте, пожалуйста,
          папку «Спам» или попробуйте отправить заявку снова.
        </p>

        <button
          type="button"
          className={styles.resend}
          onClick={handleResend}
          disabled={seconds > 0 || isResending}
        >
          {isResending
            ? "Отправляем..."
            : seconds > 0
            ? `Отправить повторно через ${seconds} сек.`
            : "Отправить повторно"}
        </button>
      </div>
    </div>
  );
}
