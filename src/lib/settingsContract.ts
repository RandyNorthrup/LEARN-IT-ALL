import { z } from 'zod';

export const UpdateSettingsRequestSchema = z
  .object({
    displayName: z.string().trim().min(3).max(80),
  })
  .strict();
