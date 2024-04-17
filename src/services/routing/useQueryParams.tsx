import { useRouter } from "next-translate-routes/router";

export interface QueryParams<T = string | number | boolean | undefined> {
  [key: string]: T | null | Array<T | null>;
}

export default function useQueryParams(): QueryParams {
  return Object.fromEntries(
    Object.entries(useRouter().query).map(([key, value]) => [
      key,
      value === null ? true : value,
    ]),
  );
}
