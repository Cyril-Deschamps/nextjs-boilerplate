import { isNaN } from "formik";

export function getNumericEnumEntries<
  E extends
    | Record<string | number | symbol, string | number | symbol>
    | unknown
    | undefined,
>(object: E): [number, keyof E][] {
  const typedObject = object as
    | Record<string | number | symbol, string | number | symbol>
    | undefined;
  return typedObject !== undefined
    ? Object.entries(typedObject!)
        .filter(([id]) => !isNaN(parseInt(id)))
        .map(([id, name]) => [parseInt(id), name as keyof E])
    : [];
}

export function getStringEnumEntries<
  E extends Record<string, string> | unknown | undefined,
>(object: E): [string, keyof E][] {
  const typedObject = object as Record<string, string> | undefined;
  return typedObject !== undefined
    ? Object.entries(typedObject!).map(([id, name]) => [id, name as keyof E])
    : [];
}
