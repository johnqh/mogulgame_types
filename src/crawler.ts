/**
 * Known crawler User-Agent tokens, lowercased.
 *
 * This is an explicit allowlist on purpose. A generic /bot/i would match real
 * Android devices that report `CUBOT`, silently serving those users stale data.
 *
 * `headlesschrome` is included so our own Playwright prerender
 * (mogulgame_app/scripts/prerender.mjs) is treated as a crawler.
 */
const CRAWLER_UA_TOKENS: readonly string[] = [
  'googlebot',
  'bingbot',
  'slurp',
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  'sogou',
  'exabot',
  'facebookexternalhit',
  'facebot',
  'twitterbot',
  'linkedinbot',
  'applebot',
  'petalbot',
  'ia_archiver',
  'gptbot',
  'oai-searchbot',
  'chatgpt-user',
  'claudebot',
  'claude-web',
  'anthropic-ai',
  'perplexitybot',
  'amazonbot',
  'bytespider',
  'semrushbot',
  'ahrefsbot',
  'mj12bot',
  'dotbot',
  'headlesschrome',
  'lighthouse',
];

/**
 * Returns true when the User-Agent belongs to a known crawler or headless renderer.
 *
 * Used by mogulgame_app to set `?crawler=true`, and independently by mogulgame_api
 * as a server-side fallback for clients that do not set the param.
 *
 * @param userAgent - A User-Agent string, or null/undefined when unavailable.
 */
export function isCrawler(userAgent: string | null | undefined): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return CRAWLER_UA_TOKENS.some((token) => ua.includes(token));
}
