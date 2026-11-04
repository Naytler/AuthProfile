import type { FieldErrors } from "react-hook-form";

import {
  emptySocialLinks,
  type Profile,
  type SocialLinks,
  type UpdateProfileRequest,
} from "@/entities/profile";
import type { UpdateUserRequest } from "@/entities/user";
import {
  FIELD_TAB,
  PROFILE_EDIT_TABS,
  emptyEducation,
  emptyExperience,
  emptyProject,
  type ProfileEditTab,
} from "./constants";
import type { ProfileFormValues } from "./types";

export function toFormValues(profile: Profile): ProfileFormValues {
  return {
    username: profile.username,
    email: profile.email ?? "",
    phone: profile.phone ?? "",
    city: profile.city ?? "",
    specializationId:
      profile.specializationId != null ? String(profile.specializationId) : "",
    level: profile.level ?? "",
    about: profile.about ?? "",
    skillIds: profile.skills?.map(String) ?? [],
    links: { ...emptySocialLinks, ...profile.links },
    avatarImage: "",
    projects: profile.projects?.length ? profile.projects : [emptyProject],
    experience: profile.experience?.length
      ? profile.experience
      : [emptyExperience],
    education: profile.education?.length ? profile.education : [emptyEducation],
  };
}

export function toSocialNetwork(links: SocialLinks) {
  return Object.entries(links).flatMap(([code, value]) => {
    if (typeof value !== "string" || !value.trim()) return [];
    return [{ code, title: value.trim() }];
  });
}

export function emptyToUndefined(value: string): string | undefined {
  const trimmed = value.trim();
  return trimmed || undefined;
}

export function toUpdateUserRequest(
  profile: Profile,
  values: ProfileFormValues
): UpdateUserRequest {
  return {
    id: String(profile.id),
    username: values.username,
    city: emptyToUndefined(values.city),
    avatarImage: values.avatarImage || undefined,
  };
}

export function toUpdateProfileRequest(
  profile: Profile,
  profileId: string | number,
  values: ProfileFormValues
): UpdateProfileRequest {
  return {
    id: String(profileId),
    userId: String(profile.id),
    description: values.about,
    socialNetwork: toSocialNetwork(values.links),
    profileSkills: values.skillIds,
    specializationId: values.specializationId || undefined,
    level: values.level || undefined,
    projects: values.projects.filter(
      (item) => item.title || item.url || item.description
    ),
    experience: values.experience.filter(
      (item) => item.company || item.position || item.description
    ),
    education: values.education.filter(
      (item) => item.institution || item.specialty
    ),
  };
}

// Первая вкладка, на которой есть ошибка валидации.
export function getFirstInvalidTab(
  errors: FieldErrors<ProfileFormValues>
): ProfileEditTab | undefined {
  const fieldTab: Record<string, ProfileEditTab> = FIELD_TAB;
  const invalidTabs = new Set(
    Object.keys(errors).map((field) => fieldTab[field])
  );

  return PROFILE_EDIT_TABS.find(({ id }) => invalidTabs.has(id))?.id;
}
