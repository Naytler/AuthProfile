import type {
  Profile,
  ProfileEducation,
  ProfileExperience,
  ProfileProject,
  SocialLinks,
} from "../model/types";
import { SOCIAL_LINKS, isSocialLinkKey } from "../model/socialLinks";
import { getArray, getId, getObject, getString } from "@/shared/lib/json";

function toSocialLinks(value: unknown): SocialLinks | undefined {
  if (Array.isArray(value)) {
    const links: SocialLinks = {};
    for (const item of value) {
      const network = getObject(item);
      const code = network?.code;
      const title = network?.title;
      if (
        typeof code === "string" &&
        typeof title === "string" &&
        isSocialLinkKey(code)
      ) {
        links[code] = title;
      }
    }
    return links;
  }

  const object = getObject(value);
  if (!object) return undefined;

  const links: SocialLinks = {};
  for (const { key } of SOCIAL_LINKS) {
    const link = object[key];
    if (typeof link === "string" && link.length > 0) links[key] = link;
  }
  return links;
}

function toProjects(value: unknown): ProfileProject[] {
  return getArray(value).flatMap((item) => {
    const object = getObject(item);
    if (!object) return [];
    return [{
      id: getId(object.id),
      title: getString(object.title),
      description: getString(object.description),
      url: getString(object.url),
    }];
  });
}

function toExperience(value: unknown): ProfileExperience[] {
  return getArray(value).flatMap((item) => {
    const object = getObject(item);
    if (!object) return [];
    return [{
      id: getId(object.id),
      company: getString(object.company),
      position: getString(object.position),
      description: getString(object.description),
      startDate: getString(object.startDate),
      endDate: getString(object.endDate),
    }];
  });
}

function toEducation(value: unknown): ProfileEducation[] {
  return getArray(value).flatMap((item) => {
    const object = getObject(item);
    if (!object) return [];
    return [{
      id: getId(object.id),
      institution: getString(object.institution),
      specialty: getString(object.specialty),
      startDate: getString(object.startDate),
      endDate: getString(object.endDate),
    }];
  });
}

// GET /auth/profile возвращает данные пользователя и массив profiles.
export function toProfile(raw: unknown): Profile {
  const root = getObject(raw) ?? {};
  const source = getObject(root.data) ?? root;
  const user = getObject(source.user) ?? source;
  const firstProfile = getObject(getArray(user.profiles ?? source.profiles)[0]) ?? {};

  const specialization = firstProfile.specialization;
  const specializationObject = getObject(specialization);
  const rawSkills = firstProfile.profileSkills ?? firstProfile.skills ?? [];

  const skills = getArray(rawSkills).flatMap((skill) => {
    const item = getObject(skill);
    const id = getId(item?.id ?? skill);
    return id === undefined ? [] : [id];
  });

  const skillNames = getArray(rawSkills).flatMap((skill) => {
    const item = getObject(skill);
    const name =
      getString(item?.title) ??
      getString(item?.name) ??
      getString(item?.id ?? skill);
    return name === undefined ? [] : [name];
  });

  return {
    id: getId(user.id) ?? "",
    profileId: getId(firstProfile.id),
    username: getString(user.username) ?? "",
    email: getString(user.email) ?? "",
    phone: getString(user.phone),
    specializationId:
      getId(firstProfile.specializationId) ?? getId(specializationObject?.id),
    specialization: specializationObject
      ? getString(specializationObject.title) ?? getString(specializationObject.name) ?? null
      : getString(specialization) ?? null,
    about: getString(firstProfile.description) ?? getString(firstProfile.about) ?? null,
    city: getString(user.city) ?? null,
    level: getString(firstProfile.level) ?? null,
    skills,
    skillNames,
    links: toSocialLinks(firstProfile.socialNetwork),
    projects: toProjects(firstProfile.projects),
    experience: toExperience(firstProfile.experience),
    education: toEducation(firstProfile.education),
    avatarUrl: getString(user.avatarUrl) ?? null,
  };
}
