import type { APIRoute } from 'astro';
import { insertContact } from '../../lib/db';

export const prerender = false;

const json = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });

/**
 * POST /api/contact — validate JSON {name,email,message}, persist with insertContact, return 201.
 * DECISIONS D11: no GET counterpart. Error bodies are fixed strings — never err.message
 * (safe-message policy). Validation failures are logged server-side without echoing input.
 */
export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'invalid JSON body' });
  }
  try {
    const row = insertContact(body as { name: string; email: string; message: string });
    return json(201, row);
  } catch (err) {
    const message = err instanceof Error ? err.message : '';
    if (message.startsWith('VALIDATION')) {
      return json(400, { error: 'invalid' });
    }
    if (message.startsWith('NOT_IMPLEMENTED')) {
      return json(501, { error: 'not implemented' });
    }
    // Server-side only; never sent to the client.
    console.error('[contact] insert failed:', message);
    return json(500, { error: 'server error' });
  }
};