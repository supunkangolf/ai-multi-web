/**
 * Profile helpers. Learners fill docs/PROFILE.md in Lab 01.
 * Parser rewritten in Lab 04 (open loop L2): reads every paragraph/bullet per
 * section instead of only the first line.
 */
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

export type Contact = {
  email?: string;
  github?: string;
  linkedin?: string;
};

export type Profile = {
  name: string;
  headline: string;
  tagline: string;
  /** Bio paragraphs joined by a blank line (kept for simple consumers). */
  bio: string;
  bioParagraphs: string[];
  audience: string;
  interests: string[];
  /** Empty when PROFILE has no `## Skills` section (DECISIONS D10). */
  skills: string[];
  contact: Contact;
};

/**
 * FALLBACK renders publicly when docs/PROFILE.md is missing or a section is
 * empty — keep it course-free (no lab references); learner hints belong in
 * comments and docs, not in rendered fallback text.
 */
const FALLBACK: Profile = {
  name: 'Your Name',
  headline: 'Personal branding site',
  tagline: '',
  bio: 'This personal site is still being built — content is coming soon.',
  bioParagraphs: ['This personal site is still being built — content is coming soon.'],
  audience: 'Hiring managers / peers / community',
  // Empty (not template topics) so an empty section renders nothing (D8 · review S4).
  interests: [],
  skills: [],
  contact: {},
};

/** Values like `—` or `-` mean "not filled in" and must not render (D5). */
const isPlaceholder = (v: string) => /^[\s—–\-]*$/.test(v);

function splitSections(raw: string): Map<string, string> {
  const sections = new Map<string, string>();
  let current: string | null = null;
  let buf: string[] = [];
  const flush = () => {
    if (current !== null) sections.set(current.toLowerCase(), buf.join('\n').trim());
  };
  for (const line of raw.split('\n')) {
    const h = line.match(/^##\s+(.+?)\s*$/);
    if (h) {
      flush();
      current = h[1];
      buf = [];
    } else if (current !== null) {
      buf.push(line);
    }
  }
  flush();
  return sections;
}

const bullets = (text: string) =>
  text
    .split('\n')
    .filter((l) => /^\s*[-*]\s+/.test(l))
    .map((l) => l.replace(/^\s*[-*]\s+/, '').trim())
    .filter((l) => !isPlaceholder(l));

const paragraphs = (text: string) =>
  text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter((p) => p && !isPlaceholder(p));

/** Contact values become hrefs — only allow plain addresses / http(s) URLs (review S2). */
const SAFE_CONTACT: Record<keyof Contact, RegExp> = {
  email: /^[^\s@:/]+@[^\s@:/]+\.[^\s@:/]+$/,
  github: /^https?:\/\/\S+$/i,
  linkedin: /^https?:\/\/\S+$/i,
};

function parseContact(text: string): Contact {
  const contact: Contact = {};
  for (const item of bullets(text)) {
    const m = item.match(/^(email|github|linkedin)\s*:\s*(.*)$/i);
    if (!m) continue;
    const key = m[1].toLowerCase() as keyof Contact;
    const value = m[2].trim();
    if (!isPlaceholder(value) && SAFE_CONTACT[key].test(value)) contact[key] = value;
  }
  return contact;
}

export function parseProfile(source: string): Profile {
  const s = splitSections(source.replace(/\r\n/g, '\n'));
  const get = (label: string) => s.get(label.toLowerCase()) || '';
  const bioParagraphs = paragraphs(get('Bio'));
  const interests = bullets(get('Interests'));
  return {
    name: get('Name') || FALLBACK.name,
    headline: get('Headline') || FALLBACK.headline,
    tagline: get('Tagline'),
    bio: bioParagraphs.length ? bioParagraphs.join('\n\n') : FALLBACK.bio,
    bioParagraphs: bioParagraphs.length ? bioParagraphs : FALLBACK.bioParagraphs,
    audience: get('Audience') || FALLBACK.audience,
    interests: interests.length ? interests : FALLBACK.interests,
    skills: bullets(get('Skills')),
    contact: parseContact(get('Contact')),
  };
}

function profilePath(): string {
  const candidates = [
    join(process.cwd(), 'docs', 'PROFILE.md'),
    join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'docs', 'PROFILE.md'),
  ];
  return candidates.find((p) => existsSync(p)) || candidates[0];
}

export function loadProfile(): Profile {
  const path = profilePath();
  if (!existsSync(path)) return FALLBACK;
  return parseProfile(readFileSync(path, 'utf8'));
}
