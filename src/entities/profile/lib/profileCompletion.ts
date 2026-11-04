import type { Profile } from "../model/types";

export interface ProfileCompletion {
  percent: number;
  completed: number;
  total: number;
}

export function getProfileCompletion(profile: Profile): ProfileCompletion {
  const checks = [
    Boolean(profile.username),
    Boolean(profile.email),
    Boolean(profile.phone),
    Boolean(profile.specializationId || profile.specialization),
    Boolean(profile.about),
    Boolean(profile.city),
    Boolean(profile.level),
    Boolean(profile.skills?.length),
    Boolean(
      profile.links &&
        Object.values(profile.links).some((value) => Boolean(value))
    ),
  ];

  const completed = checks.filter(Boolean).length;
  const total = checks.length;

  return {
    percent: Math.round((completed / total) * 100),
    completed,
    total,
  };
}
