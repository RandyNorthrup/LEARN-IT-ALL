import { z } from 'zod';

export const LearningFilesSchema = z.object({
  html: z.string(),
  css: z.string(),
  javascript: z.string(),
  python: z.string(),
  go: z.string(),
  sql: z.string(),
  shell: z.string(),
  prompt: z.string(),
  config: z.string(),
});

export const LearningSubmissionSchema = z.object({
  stepId: z.string().min(3),
  files: LearningFilesSchema.partial().optional(),
  selectedOptionId: z.string().optional(),
  orderedOptionIds: z.array(z.string()).optional(),
  textResponse: z.string().max(5000).optional(),
});

export const LearningDraftSchema = LearningSubmissionSchema.extend({
  files: LearningFilesSchema.optional(),
});
