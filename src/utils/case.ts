import type { KeysToCamelDeep } from '@types';
import { isArray, isObject, mapKeys, camel, pascal } from 'radashi';

export const toPascalCase = (value: string): string => pascal(value);

export const toCamelCase = (value: string): string => camel(value);

export const objectKeysToCamelCaseDeep = <T>(input: T): KeysToCamelDeep<T> => {
  if (isArray(input)) {
    return input.map(objectKeysToCamelCaseDeep) as KeysToCamelDeep<T>;
  }

  if (isObject(input)) {
    const mapped = mapKeys(input as Record<string, unknown>, camel);
    return Object.fromEntries(
      Object.entries(mapped).map(([k, v]) => [k, objectKeysToCamelCaseDeep(v)])
    ) as KeysToCamelDeep<T>;
  }

  return input as KeysToCamelDeep<T>;
};
