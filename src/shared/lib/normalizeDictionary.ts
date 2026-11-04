import { isRecord } from "./json";

export interface DictionaryItem {
  id: string | number;
  title: string;
}

export function normalizeDictionaryResponse(
  response: unknown
): DictionaryItem[] {
  const raw = Array.isArray(response)
    ? response
    : isRecord(response) && Array.isArray(response.data)
      ? response.data
      : [];

  return raw.flatMap((item) => {
    if (!isRecord(item)) return [];

    const id = item.id ?? item._id;
    if (typeof id !== "string" && typeof id !== "number") return [];

    return [{
      id,
      title:
        typeof item.title === "string"
          ? item.title
          : typeof item.name === "string"
            ? item.name
            : "",
    }];
  });
}
