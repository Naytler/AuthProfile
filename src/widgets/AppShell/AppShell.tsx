import { ROUTES } from "@/shared/config/routes";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

import { useLogoutMutation } from "@/features/auth";
import { Button } from "@/shared/ui/Button/Button";
import styles from "./AppShell.module.css";
import { navItems } from "./model/navItems";

export function AppShell() {
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } finally {
      navigate(ROUTES.login, { replace: true });
    }
  };

  return (
    <div className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span>Y</span>
          Yeahub
        </div>

        <nav className={styles.nav}>
          {navItems.map((item) =>
            item.to ? (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `${styles.navItem} ${isActive ? styles.active : ""}`
                }
              >
                <span>{item.icon}</span>
                {item.label}
              </NavLink>
            ) : (
              <span
                key={item.label}
                className={styles.navItem}
                aria-disabled="true"
              >
                <span>{item.icon}</span>
                {item.label}
              </span>
            )
          )}
        </nav>

        <div className={styles.sideBottom}>
          <Button type="button" disabled>
            ◔ Поддержка
          </Button>
          <button
            className={styles.logout}
            onClick={handleLogout}
            disabled={isLoading}
          >
            ⇥ {isLoading ? "Выходим..." : "Выход"}
          </button>
        </div>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <div />
          <div className={styles.topActions}>
            <button type="button" aria-label="Настройки" disabled>
              ⚙
            </button>
            <button
              type="button"
              aria-label="Профиль"
              onClick={() => navigate(ROUTES.profile)}
            >
              ◉
            </button>
          </div>
        </header>

        <main className={styles.content}>
          <Outlet />
        </main>

        <footer className={styles.footer}>
          <div>
            <strong>Yeahub</strong>
            <p>Выбери, каким будет IT завтра, вместе с нами</p>
          </div>
          <small>© 2026 Yeahub · Документы</small>
        </footer>
      </div>
    </div>
  );
}
