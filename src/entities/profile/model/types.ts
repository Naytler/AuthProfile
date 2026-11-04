import type { SocialLinkKey } from "./socialLinks";

export type SocialLinks = Partial<Record<SocialLinkKey, string>>;

export interface ProfileProject {
  id?: number | string;
  title?: string;
  description?: string;
  url?: string;
}

export interface ProfileExperience {
  id?: number | string;
  company?: string;
  position?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export interface ProfileEducation {
  id?: number | string;
  institution?: string;
  specialty?: string;
  startDate?: string;
  endDate?: string;
}

export interface Profile {
  id: number | string;
  profileId?: number | string;
  username: string;
  email: string;
  phone?: string;
  specializationId?: number | string | null;
  specialization?: string | null;
  about?: string | null;
  city?: string | null;
  level?: string | null;
  skills?: Array<number | string>;
  skillNames?: string[];
  links?: SocialLinks;
  projects?: ProfileProject[];
  experience?: ProfileExperience[];
  education?: ProfileEducation[];
  avatarUrl?: string | null;
}

export interface UpdateProfileRequest {
  id: string;
  userId: string;
  description?: string;
  socialNetwork?: {
    code: string;
    title: string;
  }[];
  profileSkills?: string[];
  specializationId?: string;
  level?: string;
  projects?: ProfileProject[];
  experience?: ProfileExperience[];
  education?: ProfileEducation[];
}
