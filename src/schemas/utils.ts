import z from 'zod';

export function stringifiedSchema<T>(
  schema: z.ZodSchema<T>,
  errorMessage: string
): z.ZodPipe<z.ZodString, z.ZodTransform<Awaited<T>, string>> {
  return z.string().transform((data, context) => {
    try {
      const jsonParsed = JSON.parse(data) as object;
      return schema.parse(jsonParsed);
    } catch {
      context.addIssue({ code: 'custom', message: errorMessage });
      return z.NEVER;
    }
  });
}
