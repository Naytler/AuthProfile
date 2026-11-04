import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { isRecord } from "./json";

interface ApiErrorData {
  message?: string;
  description?: string;
}

export function isFetchBaseQueryError(
  error: unknown
): error is FetchBaseQueryError {
  return isRecord(error) && "status" in error;
}

export function getApiErrorMessage(
  error: unknown,
  fallback = "Произошла ошибка"
): string {
  if (!isFetchBaseQueryError(error)) return fallback;

  if (error.status === 401) {
    return "Неверное имя пользователя или пароль";
  }

  if (isRecord(error.data)) {
    const data = error.data as ApiErrorData;
    return data.description ?? data.message ?? fallback;
  }

  return fallback;
}
