export type JsonObject = Record<string, unknown>;

export function isRecord(value: unknown): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function getObject(value: unknown): JsonObject | undefined {
  return isRecord(value) ? value : undefined;
}

export function getId(value: unknown): string | number | undefined {
  return typeof value === "string" || typeof value === "number" ? value : undefined;
}

export function getString(value: unknown): string | undefined {
  return typeof value === "string" || typeof value === "number"
    ? String(value)
    : undefined;
}

export function getArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}
