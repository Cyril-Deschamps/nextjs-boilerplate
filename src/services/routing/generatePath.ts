import { compile, PathFunction } from "path-to-regexp";
import queryString from "query-string";

const cache: Record<string, PathFunction<Record<string, unknown>>> = {};
const cacheLimit = 10000;
let cacheCount = 0;

function compilePath(path: string): PathFunction<Record<string, unknown>> {
  if (cache[path]) return cache[path];

  const generator = compile(path);

  if (cacheCount < cacheLimit) {
    cache[path] = generator;
    cacheCount++;
  }

  return generator;
}

function generatePath(
  path = "/",
  params = {},
  queryParams: Record<string, unknown> | undefined = undefined,
): string {
  if (path === "/") {
    return path;
  } else {
    const compiledPath = compilePath(path)(params);
    if (queryParams === undefined || Object.keys(queryParams).length < 0)
      return compiledPath;
    const searchParams = queryString.stringify(
      Object.fromEntries(
        Object.entries(queryParams).map(([key, value]) => [
          key,
          typeof value === "boolean" ? (value ? null : undefined) : value,
        ]),
      ),
    );
    return `${compiledPath}?${searchParams}`;
  }
}

export default generatePath;
