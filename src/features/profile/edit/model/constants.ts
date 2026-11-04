import type {
  ProfileEducation,
  ProfileExperience,
  ProfileProject,
} from "@/entities/profile";
import type { ProfileFormValues } from "./types";

export type ProfileEditTab =
  | "personal"
  | "about"
  | "skills"
  | "projects"
  | "experience"
  | "education";

export const PROFILE_EDIT_TABS: { id: ProfileEditTab; label: string }[] = [
  { id: "personal", label: "Личная информация" },
  { id: "about", label: "Обо мне" },
  { id: "skills", label: "Навыки" },
  { id: "projects", label: "Проекты" },
  { id: "experience", label: "Опыт работы" },
  { id: "education", label: "Образование" },
];

// На какой вкладке находится каждое поле формы.
// Нужно, чтобы при ошибке валидации открыть вкладку с невалидным полем.
export const FIELD_TAB: Record<keyof ProfileFormValues, ProfileEditTab> = {
  username: "personal",
  email: "personal",
  phone: "personal",
  city: "personal",
  specializationId: "personal",
  level: "personal",
  links: "personal",
  avatarImage: "personal",
  about: "about",
  skillIds: "skills",
  projects: "projects",
  experience: "experience",
  education: "education",
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SPECIALIST_LEVELS = ["Junior", "Middle", "Senior", "Lead"] as const;

export const emptyProject: ProfileProject = {
  title: "",
  description: "",
  url: "",
};

export const emptyExperience: ProfileExperience = {
  company: "",
  position: "",
  description: "",
  startDate: "",
  endDate: "",
};

export const emptyEducation: ProfileEducation = {
  institution: "",
  specialty: "",
  startDate: "",
  endDate: "",
};
