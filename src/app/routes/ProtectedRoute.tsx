import { Navigate, Outlet, useLocation } from "react-router-dom";

import { ROUTES } from "@/shared/config/routes";
import { useGetProfileQuery } from "@/entities/profile";
import { isFetchBaseQueryError } from "@/shared/lib/apiError";
import styles from "./ProtectedRoute.module.css";

export function ProtectedRoute() {
  const location = useLocation();
  const { data, error, isLoading } = useGetProfileQuery();

  if (isLoading) {
    return <div className={styles.center}>Проверяем авторизацию...</div>;
  }

  if (isFetchBaseQueryError(error) && error.status === 401) {
    return <Navigate to={ROUTES.login} replace state={{ from: location.pathname }} />;
  }

  if (error || !data) {
    return (
      <div className={styles.center}>
        Не удалось проверить авторизацию. Попробуйте ещё раз.
      </div>
    );
  }

  return <Outlet />;
}
