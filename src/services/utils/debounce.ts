type DebounceFn<T extends unknown[], U> = (this: U, ...args: T) => void;

export function debounce<T extends unknown[], U>(
  fn: DebounceFn<T, U>,
  delay: number,
): DebounceFn<T, U> {
  let timer: ReturnType<typeof setTimeout> | null;

  return function (this: U, ...args: T): void {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}
