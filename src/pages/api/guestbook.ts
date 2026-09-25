import type { APIRoute } from 'astro';
import { insertGuestbook, listGuestbook } from '../../lib/db';

export const prerender = false;

const json = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });

/**
 * Safe-error mapping shared by GET and POST: fixed response bodies only —
 * never err.message. Server-side details stay in the server log.
 */
const errorResponse = (source: string, err: unknown) => {
  const message = err instanceof Error ? err.message : '';
  if (message.startsWith('VALIDATION')) {
    return json(400, { error: 'invalid' });
  }
  if (message.startsWith('NOT_IMPLEMENTED')) {
    return json(501, { error: 'not implemented' });
  }
  console.error(`[guestbook] ${source} failed:`, message);
  return json(500, { error: 'server error' });
};

export const GET: APIRoute = async () => {
  try {
    const rows = listGuestbook();
    return json(200, { entries: rows });
  } catch (err) {
    return errorResponse('list', err);
  }
};

export const POST: APIRoute = async ({ request }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json(400, { error: 'invalid JSON body' });
  }
  try {
    const row = insertGuestbook(body as { name: string; message: string });
    return json(201, row);
  } catch (err) {
    return errorResponse('insert', err);
  }
};