import { describe, expect, it } from 'vitest';
import { UpdateSettingsRequestSchema } from './settingsContract';

describe('settings contract', () => {
  it('trims and accepts a bounded display name', () => {
    expect(UpdateSettingsRequestSchema.parse({ displayName: '  Ada Builder  ' })).toEqual({
      displayName: 'Ada Builder',
    });
  });

  it('rejects short, oversized, non-string, and extra settings', () => {
    expect(UpdateSettingsRequestSchema.safeParse({ displayName: 'ab' }).success).toBe(false);
    expect(UpdateSettingsRequestSchema.safeParse({ displayName: 'x'.repeat(81) }).success).toBe(
      false
    );
    expect(UpdateSettingsRequestSchema.safeParse({ displayName: 42 }).success).toBe(false);
    expect(
      UpdateSettingsRequestSchema.safeParse({ displayName: 'Builder', admin: true }).success
    ).toBe(false);
  });
});
