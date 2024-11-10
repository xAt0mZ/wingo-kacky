export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ');
}

export type UnionOf<T extends readonly unknown[]> = T[number];
