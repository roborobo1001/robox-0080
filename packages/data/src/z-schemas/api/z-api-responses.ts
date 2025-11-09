import { type AnyZodObject, z } from 'zod';

export type ApiPaginatedResponseMeta = z.infer<typeof zPaginationMeta>;

export const zPaginationMeta = z.object({
  count: z.number(),
  skip: z.number(),
  take: z.number(),
});

export function createPaginatedResponseSchema<ZO extends AnyZodObject>(
  zSchema: ZO,
) {
  return z.object({
    items: z.array(zSchema),
    count: z.number(),
    skip: z.number(),
    take: z.number(),
  });
}
