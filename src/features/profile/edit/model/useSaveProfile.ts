import { useUpdateProfileMutation, type Profile } from "@/entities/profile";
import { useUpdateUserMutation } from "@/entities/user";
import { toUpdateProfileRequest, toUpdateUserRequest } from "./mappers";
import type { ProfileFormValues } from "./types";

export function useSaveProfile(profile: Profile) {
  const [updateUser, userState] = useUpdateUserMutation();
  const [updateProfile, profileState] = useUpdateProfileMutation();

  // true — всё сохранено, false — ошибка (она доступна через hasError).
  const save = async (values: ProfileFormValues): Promise<boolean> => {
    if (profile.profileId === undefined) return false;

    try {
      await updateUser(toUpdateUserRequest(profile, values)).unwrap();
      await updateProfile(
        toUpdateProfileRequest(profile, profile.profileId, values)
      ).unwrap();

      return true;
    } catch {
      return false;
    }
  };

  return {
    save,
    isSaving: userState.isLoading || profileState.isLoading,
    hasError: Boolean(userState.error || profileState.error),
  };
}
