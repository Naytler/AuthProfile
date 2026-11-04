import type {
  ProfileEducation,
  ProfileExperience,
  ProfileProject,
  SocialLinks,
} from "@/entities/profile";

export interface ProfileFormValues {
  username: string;
  email: string;
  phone: string;
  city: string;
  specializationId: string;
  level: string;
  about: string;
  skillIds: string[];
  links: SocialLinks;
  avatarImage: string;
  projects: ProfileProject[];
  experience: ProfileExperience[];
  education: ProfileEducation[];
}
