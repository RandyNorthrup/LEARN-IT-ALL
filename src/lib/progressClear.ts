import { z } from 'zod';

const IdentifierSchema = z
  .string()
  .min(3)
  .max(120)
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

export const ClearProgressRequestSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('all') }).strict(),
  z.object({ type: z.literal('course'), courseId: IdentifierSchema }).strict(),
  z.object({ type: z.literal('activity'), activityId: IdentifierSchema }).strict(),
]);

export type ClearProgressRequest = z.infer<typeof ClearProgressRequestSchema>;
