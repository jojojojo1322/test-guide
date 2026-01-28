export type QueryParamCodec<T> = {
  defaultValue: T;
  parse: (value: string | null) => T;
  serialize: (value: T) => string | null;
};

export type QuerySchema<T extends Record<string, unknown>> = {
  [K in keyof T]: QueryParamCodec<T[K]>;
};

type NumberOptions = {
  min?: number;
  max?: number;
};

const clampNumber = (value: number, options?: NumberOptions) => {
  let next = value;
  if (typeof options?.min === "number") {
    next = Math.max(options.min, next);
  }
  if (typeof options?.max === "number") {
    next = Math.min(options.max, next);
  }
  return next;
};

export const stringParam = (defaultValue = ""): QueryParamCodec<string> => ({
  defaultValue,
  parse: (value) => value ?? defaultValue,
  serialize: (value) => (Object.is(value, defaultValue) ? null : value),
});

export const numberParam = (
  defaultValue = 0,
  options?: NumberOptions
): QueryParamCodec<number> => ({
  defaultValue,
  parse: (value) => {
    if (value === null) return defaultValue;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return defaultValue;
    return clampNumber(parsed, options);
  },
  serialize: (value) => {
    const normalized = clampNumber(value, options);
    return Object.is(normalized, defaultValue) ? null : String(normalized);
  },
});

export const booleanParam = (defaultValue = false): QueryParamCodec<boolean> => ({
  defaultValue,
  parse: (value) => {
    if (value === null) return defaultValue;
    return value === "1" || value.toLowerCase() === "true";
  },
  serialize: (value) => {
    if (Object.is(value, defaultValue)) return null;
    return value ? "1" : "0";
  },
});

export const getDefaultQuery = <T extends Record<string, unknown>>(
  schema: QuerySchema<T>
): T => {
  const result = {} as T;
  (Object.keys(schema) as Array<keyof T>).forEach((key) => {
    result[key] = schema[key].defaultValue;
  });
  return result;
};

export const parseQuery = <T extends Record<string, unknown>>(
  searchParams: URLSearchParams,
  schema: QuerySchema<T>
): T => {
  const result = {} as T;
  (Object.keys(schema) as Array<keyof T>).forEach((key) => {
    result[key] = schema[key].parse(searchParams.get(String(key)));
  });
  return result;
};

export const buildSearchParams = <T extends Record<string, unknown>>(
  query: T,
  schema: QuerySchema<T>
): URLSearchParams => {
  const params = new URLSearchParams();
  (Object.keys(schema) as Array<keyof T>).forEach((key) => {
    const serialized = schema[key].serialize(query[key]);
    if (serialized !== null) {
      params.set(String(key), serialized);
    }
  });
  return params;
};

export const mergeSearchParams = <T extends Record<string, unknown>>(
  searchParams: URLSearchParams,
  schema: QuerySchema<T>,
  patch: Partial<T>
): URLSearchParams => {
  const current = parseQuery(searchParams, schema);
  const next = { ...current, ...patch } as T;
  return buildSearchParams(next, schema);
};
