/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo, useState } from "react";
import { compareAsc } from "date-fns";

export function deepSearch<E>(element: E, word: string): boolean {
  if (!element) return false;
  if (typeof element === "string") {
    return element.toLowerCase().indexOf(word) >= 0;
  } else if (typeof element === "number") {
    return (
      element.toString(10).indexOf(word) >= 0 || parseFloat(word) === element
    );
  } else if (Array.isArray(element)) {
    return element.some((subElement) => deepSearch(subElement, word));
  } else if (typeof element === "object") {
    const properties = Object.getOwnPropertyNames(element) as (keyof E)[];
    for (const i in properties) {
      if (deepSearch(element[properties[i]], word)) return true;
    }
  }
  return false;
}

export function searchGenerator<E>(
  expression: string,
  mapper?: (element: E) => unknown,
): (element: E) => boolean {
  if (expression.length === 0) return () => true;
  const words = expression.split(" ").map((e) => e.toLowerCase());

  return mapper
    ? (element: E) => {
        const mappedElement = mapper(element);
        return words.every((w) => deepSearch(mappedElement, w));
      }
    : (element: E) => words.every((w) => deepSearch(element, w));
}

export function useSearch<E>(
  baseList: E[],
  mapper?: (element: E) => unknown,
): [E[], (search: string) => void] {
  const [search, setSearch] = useState<string>("");

  const filter = useMemo(
    () => searchGenerator(search, mapper),
    [search, mapper],
  );

  const newList = useMemo(() => baseList.filter(filter), [baseList, filter]);

  return [newList, setSearch];
}

export function spliceReturn<T>(array: Array<T>, index: number): Array<T> {
  const newArray = array.slice(0);
  newArray.splice(index, 1);
  return newArray;
}

export function replaceInArray<T>(
  array: Array<T>,
  index: number,
  newObject: T,
): Array<T> {
  const newArray = array.slice(0);
  newArray[index] = newObject;
  return newArray;
}

export function deleteFromArrayAndReturn<T>(
  array: Array<T>,
  index: number,
): Array<T> {
  const newArray = array.slice(0);
  newArray.splice(index, 1);
  return newArray;
}

export function compareBoolean(boolA: boolean, boolB: boolean): number {
  return boolA === boolB ? 0 : boolA ? -1 : 1;
}

export function compareString(stringA: string, stringB: string): number {
  return stringA.localeCompare(stringB);
}

export function compareStringNullable(
  stringA: string | null,
  stringB: string | null,
): number {
  if (stringA === null && stringB === null) return 0;
  if (stringA === null) return 1;
  if (stringB === null) return -1;

  return compareString(stringA, stringB);
}

export function compareDate(dateA: Date, dateB: Date): number {
  return compareAsc(dateA, dateB);
}

export function groupByField<
  Arr extends Array<any>,
  T extends Arr extends Array<infer T> ? T : never,
  Key extends keyof T & (string | number | symbol),
  TKey extends T[Key] & (string | number | symbol),
>(array: Arr, key: Key | ((el: T) => TKey)): Record<TKey, Arr> {
  return array.reduce((result, item) => {
    const k = typeof key === "function" ? key(item) : item[key];
    const group = result[k] || [];
    group.push(item);
    result[k] = group;
    return result;
  }, {} as Record<TKey, Arr>);
}

export function multiSorts<T>(...sorts: ((a: T, b: T) => number)[]) {
  return (a: T, b: T): number =>
    sorts.reduce((result, sort) => result || sort(a, b), 0);
}

export function orderByField<
  P,
  K extends keyof P | ((e: P) => number | string | boolean | Date),
  X extends K extends (e: P) => number | string | boolean | Date
    ? number
    : K extends keyof P
    ? P[K] extends number
      ? number
      : P[K] extends string
      ? number
      : P[K] extends boolean
      ? number
      : P[K] extends Date
      ? number
      : never
    : never,
>(_field: K, desc?: boolean): (a: P, b: P) => X {
  const genericCompare = (_a: P, _b: P) => {
    // XXX: This is a hack to get around typescript not being able to infer the type of the field
    const a = _a as any;
    const b = _b as any;
    const field = _field as any;
    const aField =
      typeof field === "function" ? field(a) : (a[field as keyof P] as any);
    const bField =
      typeof field === "function" ? field(b) : (b[field as keyof P] as any);

    // XXX: We know that the fields are valid with the function invocation above

    if (typeof aField === "number") return aField > bField ? -1 : 1;
    else if (typeof aField === "string") return compareString(aField, bField);
    else if (aField instanceof Date) return compareDate(aField, bField);
    else if (typeof aField === "boolean") return compareBoolean(aField, bField);
    else {
      throw new Error(
        "Invalid type used with orderByField, should have been caught by typescript",
      );
    }
  };

  return (a: P, b: P) =>
    (desc ? genericCompare(a, b) : genericCompare(b, a)) as unknown as X;
}

export function filterOnPrecondition<A, C extends (e: A) => boolean>(
  arr: A[],
  preCond: boolean,
  cond: C,
): A[] {
  return preCond ? arr.filter(cond) : arr;
}
