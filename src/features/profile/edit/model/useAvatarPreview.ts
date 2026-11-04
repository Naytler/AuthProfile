import { useState } from "react";
import type { UseFormSetValue } from "react-hook-form";
import type { ProfileFormValues } from "./types";

export function useAvatarPreview(
  initialUrl: string | null | undefined,
  setValue: UseFormSetValue<ProfileFormValues>
) {
  const [avatarPreview, setAvatarPreview] = useState(initialUrl ?? "");

  const onAvatarChange = (file?: File) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      setAvatarPreview(result);
      setValue("avatarImage", result, { shouldDirty: true });
    };
    reader.readAsDataURL(file);
  };

  const clearAvatar = () => {
    setAvatarPreview("");
    setValue("avatarImage", "", { shouldDirty: true });
  };

  return { avatarPreview, onAvatarChange, clearAvatar };
}
