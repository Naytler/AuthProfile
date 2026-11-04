import { ROUTES } from "@/shared/config/routes";

type NavItem =
  | { to: string; label: string; icon: string }
  | { to?: never; label: string; icon: string };

export const navItems: NavItem[] = [
  { to: ROUTES.dashboard, label: "Главная", icon: "⌂" },
  { to: ROUTES.profile, label: "Мой профиль", icon: "♙" },
  { label: "Обучение", icon: "□" },
  { label: "Блог", icon: "▤" },
  { label: "Менторы", icon: "♧" },
  { label: "База знаний", icon: "▦" },
  { label: "Аналитика", icon: "◔" },
];
