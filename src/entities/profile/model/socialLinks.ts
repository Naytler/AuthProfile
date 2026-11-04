export const SOCIAL_LINKS = [
  { key: "instagram", label: "Instagram" },
  { key: "linkedin", label: "LinkedIn" },
  { key: "twitter", label: "Twitter" },
  { key: "github", label: "GitHub" },
  { key: "behance", label: "Behance" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "telegram", label: "Telegram" },
  { key: "vk", label: "VK" },
  { key: "dribbble", label: "Dribbble" },
] as const;

export type SocialLinkKey = (typeof SOCIAL_LINKS)[number]["key"];

export function isSocialLinkKey(value: string): value is SocialLinkKey {
  return SOCIAL_LINKS.some(({ key }) => key === value);
}

export const emptySocialLinks = Object.fromEntries(
  SOCIAL_LINKS.map(({ key }) => [key, ""])
) as Record<SocialLinkKey, string>;
