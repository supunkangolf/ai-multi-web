import { describe, it, expect } from 'vitest';
import { parseProfile, loadProfile } from '../src/lib/profile';

const SAMPLE = `# PROFILE

## Name
Jane Doe

## Headline
Builder of useful things

## Tagline
Line one · line two

## Bio
First paragraph.

Second paragraph
continues here.

Third paragraph.

## Interests
- PHP / Laravel
- AI agents
- Web development
- Database / Backend

## Contact
- email: jane@example.com
- github: https://github.com/jane
- linkedin: —

## Tone
- calm
`;

describe('parseProfile', () => {
  const p = parseProfile(SAMPLE);

  it('reads every Bio paragraph, not only the first', () => {
    expect(p.bioParagraphs).toEqual([
      'First paragraph.',
      'Second paragraph\ncontinues here.',
      'Third paragraph.',
    ]);
  });

  it('reads every Interests bullet', () => {
    expect(p.interests).toEqual(['PHP / Laravel', 'AI agents', 'Web development', 'Database / Backend']);
  });

  it('reads tagline and contact, dropping placeholder values', () => {
    expect(p.tagline).toBe('Line one · line two');
    expect(p.contact).toEqual({ email: 'jane@example.com', github: 'https://github.com/jane' });
  });

  it('returns no skills when the section is absent', () => {
    expect(p.skills).toEqual([]);
  });

  it('tolerates a blank line between heading and content', () => {
    const q = parseProfile('## Name\n\nJane\n\n## Headline\n\nHello\n');
    expect(q.name).toBe('Jane');
    expect(q.headline).toBe('Hello');
  });

  it('handles CRLF line endings', () => {
    const q = parseProfile(SAMPLE.replace(/\n/g, '\r\n'));
    expect(q.interests).toHaveLength(4);
    expect(q.bioParagraphs).toHaveLength(3);
  });
});

describe('loadProfile (real docs/PROFILE.md)', () => {
  it('does not fall back when PROFILE has content', () => {
    const p = loadProfile();
    expect(p.name).not.toBe('Your Name');
    expect(p.bioParagraphs.length).toBeGreaterThan(1);
    expect(p.interests.length).toBeGreaterThan(1);
  });
});
