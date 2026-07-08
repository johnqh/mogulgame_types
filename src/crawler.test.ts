import { describe, it, expect } from 'vitest';
import { isCrawler } from './crawler';

const GOOGLEBOT =
  'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Chrome/119.0.0.0 Safari/537.36';
const CHROME_DESKTOP =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const CUBOT_ANDROID =
  'Mozilla/5.0 (Linux; Android 11; CUBOT NOTE 20 PRO) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.74 Mobile Safari/537.36';
const PLAYWRIGHT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/120.0.0.0 Safari/537.36';

describe('isCrawler', () => {
  it('detects Googlebot', () => {
    expect(isCrawler(GOOGLEBOT)).toBe(true);
  });

  it('detects Playwright HeadlessChrome (our own prerender)', () => {
    expect(isCrawler(PLAYWRIGHT)).toBe(true);
  });

  it('detects AI crawlers', () => {
    expect(isCrawler('Mozilla/5.0 (compatible; GPTBot/1.1)')).toBe(true);
    expect(isCrawler('Mozilla/5.0 (compatible; ClaudeBot/1.0)')).toBe(true);
    expect(isCrawler('Mozilla/5.0 (compatible; PerplexityBot/1.0)')).toBe(true);
  });

  it('is case-insensitive', () => {
    expect(isCrawler('GOOGLEBOT/2.1')).toBe(true);
  });

  it('does not match a normal desktop browser', () => {
    expect(isCrawler(CHROME_DESKTOP)).toBe(false);
  });

  it('does not match CUBOT Android phones (regression: no generic /bot/i)', () => {
    expect(isCrawler(CUBOT_ANDROID)).toBe(false);
  });

  it('returns false for absent user agents', () => {
    expect(isCrawler(null)).toBe(false);
    expect(isCrawler(undefined)).toBe(false);
    expect(isCrawler('')).toBe(false);
  });
});
