import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const source = readFileSync(path.join(process.cwd(), 'src/app/dashboard/page.tsx'), 'utf8');

describe('retired dashboard alias', () => {
  it('permanently redirects to the V2-native home dashboard', () => {
    expect(source).toContain("permanentRedirect('/');");
    expect(source).not.toContain('course_enrollments');
  });
});
