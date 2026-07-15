import { describe, expect, it } from 'vitest';
import { readJsonRequestBody } from './readJsonRequestBody';

describe('readJsonRequestBody', () => {
  it('returns parsed JSON for a valid request body', async () => {
    const request = new Request('http://localhost/example', {
      method: 'POST',
      body: JSON.stringify({ stepId: 'step-001' }),
      headers: { 'content-type': 'application/json' },
    });

    await expect(readJsonRequestBody(request)).resolves.toEqual({ stepId: 'step-001' });
  });

  it.each([
    ['empty', ''],
    ['truncated', '{"stepId":'],
  ])('returns undefined for an %s JSON body', async (_label, body) => {
    const request = new Request('http://localhost/example', {
      method: 'POST',
      body,
      headers: { 'content-type': 'application/json' },
    });

    await expect(readJsonRequestBody(request)).resolves.toBeUndefined();
  });

  it('preserves valid JSON null so schemas can reject it normally', async () => {
    const request = new Request('http://localhost/example', {
      method: 'POST',
      body: 'null',
      headers: { 'content-type': 'application/json' },
    });

    await expect(readJsonRequestBody(request)).resolves.toBeNull();
  });
});
