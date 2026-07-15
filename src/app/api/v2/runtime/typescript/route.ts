import { NextResponse } from 'next/server';
import { diagnoseTypeScript } from '@/core/learning/typescriptDiagnostics';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Expected a JSON request body.' }, { status: 400 });
  }

  if (!body || typeof body !== 'object' || !('source' in body) || typeof body.source !== 'string') {
    return NextResponse.json({ error: 'Expected a string source field.' }, { status: 400 });
  }

  return NextResponse.json(diagnoseTypeScript(body.source));
}
