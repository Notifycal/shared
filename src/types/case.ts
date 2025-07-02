export type CapitalizeFirst<T extends string> = T extends `${infer First}${infer Rest}`
  ? `${Uppercase<First>}${Rest}`
  : T;

export type KebabCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? Rest extends Uncapitalize<Rest>
    ? `${Lowercase<First>}${KebabCase<Rest>}`
    : S extends `${infer Acronym}${Capitalize<infer AfterAcronym>}`
      ? `${Lowercase<Acronym>}-${KebabCase<AfterAcronym>}`
      : Lowercase<S>
  : S;

export type CamelCase<S extends string> = S extends `${infer Head}_${infer Tail}`
  ? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
  : S extends `${infer Head}-${infer Tail}`
    ? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
    : S extends `${infer Head} ${infer Tail}`
      ? `${Lowercase<Head>}${Capitalize<CamelCase<Tail>>}`
      : S;

export type KeysToCamelDeep<T> =
  T extends Array<infer U>
    ? Array<KeysToCamelDeep<U>>
    : T extends object
      ? {
          [K in keyof T as K extends string ? CamelCase<K> : never]: KeysToCamelDeep<T[K]>;
        }
      : T;
