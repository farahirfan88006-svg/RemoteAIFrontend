#!/usr/bin/env node
/**
 * scripts/validateBlog.mjs
 * ---------------------------------------------------------------------
 * Content-integrity checks for lib/blog/posts/*.js, run manually (or in
 * CI) with:
 *
 *   node scripts/validateBlog.mjs
 *
 * This is a plain Node script (not part of the Next.js build) so it can
 * run against the raw content data without spinning up a Next build.
 * It exits with code 1 if any *error*-level check fails, so it's safe to
 * wire into CI as a gate; it exits 0 (but still prints them) for
 * *warning*-level findings, since those need human judgment rather than
 * being an automatic hard fail.
 *
 * Checks performed:
 *  1. Duplicate slugs (exact)
 *  2. Duplicate titles (case-insensitive, exact)
 *  3. Duplicate canonical URLs (derived from slug)
 *  4. Slug format + slug-matches-filename (auto slug validation)
 *  5. Missing/incomplete metadata (title, excerpt length, category,
 *     tags, author, publishedAt, content, faqs shape)
 *  6. Missing Open Graph image (featuredImage.url + non-empty alt)
 *  7. Broken internal links (content `link` blocks whose href doesn't
 *     resolve to a real route in this app, or a real blog slug)
 *  8. Near-duplicate topics (title-word overlap + shared category/tags)
 *     — reported as warnings for editorial review, not hard failures,
 *     since some legitimate topics are intentionally similar
 *     (e.g. "Remote Python Developer Jobs" vs "Remote React Developer
 *     Jobs").
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { register } from "node:module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

// lib/blog/posts.js uses extensionless relative imports (Next.js-style
// resolution) — register a loader hook so plain Node can follow them too.
register("./blogEsmResolver.mjs", import.meta.url);

const { BLOG_POSTS, BLOG_CATEGORIES } = await import(
  pathToFileURL(path.join(repoRoot, "lib/blog/posts.js")).href
);
const { siteConfig } = await import(
  pathToFileURL(path.join(repoRoot, "lib/seo/siteConfig.js")).href
);

const errors = [];
const warnings = [];

function err(msg) {
  errors.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}

// ---------------------------------------------------------------------
// 1-3. Duplicate slugs / titles / canonical URLs
// ---------------------------------------------------------------------
const bySlug = new Map();
const byTitle = new Map();
const byCanonical = new Map();

for (const post of BLOG_POSTS) {
  const slugKey = post.slug;
  const titleKey = (post.title || "").trim().toLowerCase();
  const canonical = `${siteConfig.url}/blog/${post.slug}`;

  if (bySlug.has(slugKey)) err(`Duplicate slug: "${slugKey}" (${bySlug.get(slugKey)} / ${post.title})`);
  else bySlug.set(slugKey, post.title);

  if (byTitle.has(titleKey)) err(`Duplicate title: "${post.title}" (slugs: ${byTitle.get(titleKey)} / ${post.slug})`);
  else byTitle.set(titleKey, post.slug);

  if (byCanonical.has(canonical)) err(`Duplicate canonical URL: ${canonical}`);
  else byCanonical.set(canonical, post.slug);
}

// ---------------------------------------------------------------------
// 4. Slug format + slug-matches-filename
// ---------------------------------------------------------------------
const postsDir = path.join(repoRoot, "lib/blog/posts");
const filenames = fs.readdirSync(postsDir).filter((f) => f.endsWith(".js"));
const slugFormatRe = /^[a-z0-9]+(-[a-z0-9]+)*$/;

for (const post of BLOG_POSTS) {
  if (!slugFormatRe.test(post.slug)) {
    err(`Invalid slug format (must be lowercase kebab-case): "${post.slug}"`);
  }
  const expectedFile = `${post.slug}.js`;
  if (!filenames.includes(expectedFile)) {
    err(`Slug "${post.slug}" has no matching file lib/blog/posts/${expectedFile}`);
  }
}

for (const file of filenames) {
  const slugFromFile = file.replace(/\.js$/, "");
  if (!bySlug.has(slugFromFile)) {
    warn(`File lib/blog/posts/${file} exists but isn't imported/registered in lib/blog/posts.js (orphan file)`);
  }
}

// ---------------------------------------------------------------------
// 5. Missing / incomplete metadata
// ---------------------------------------------------------------------
const validCategorySlugs = new Set(BLOG_CATEGORIES.map((c) => c.slug));

for (const post of BLOG_POSTS) {
  const label = post.slug || "(missing slug)";

  if (!post.title || post.title.trim().length < 10) err(`[${label}] Missing or too-short title`);
  if (!post.excerpt || post.excerpt.trim().length < 20) {
    err(`[${label}] Missing or too-short excerpt (meta description source)`);
  } else if (post.excerpt.length > 160) {
    warn(`[${label}] Excerpt is ${post.excerpt.length} chars — over the ~160 char meta-description sweet spot`);
  }
  if (!post.category || !validCategorySlugs.has(post.category)) {
    err(`[${label}] Missing or unknown category: "${post.category}"`);
  }
  if (!Array.isArray(post.tags) || post.tags.length === 0) err(`[${label}] Missing tags`);
  if (!post.author?.name) err(`[${label}] Missing author`);
  if (!post.publishedAt || Number.isNaN(new Date(post.publishedAt).getTime())) {
    err(`[${label}] Missing or invalid publishedAt date`);
  }
  if (post.updatedAt && Number.isNaN(new Date(post.updatedAt).getTime())) {
    err(`[${label}] Invalid updatedAt date`);
  }
  if (post.updatedAt && new Date(post.updatedAt) < new Date(post.publishedAt)) {
    err(`[${label}] updatedAt is earlier than publishedAt`);
  }
  if (!Array.isArray(post.content) || post.content.length === 0) err(`[${label}] Missing content`);
  if (post.faqs && !Array.isArray(post.faqs)) err(`[${label}] faqs must be an array`);
  (post.faqs || []).forEach((faq, i) => {
    if (!faq.question || !faq.answer) err(`[${label}] faqs[${i}] missing question or answer`);
  });

  // 6. Missing Open Graph image
  if (!post.featuredImage?.url) err(`[${label}] Missing featuredImage.url (Open Graph image)`);
  if (post.featuredImage?.url && !post.featuredImage?.alt) err(`[${label}] featuredImage is missing alt text`);
}

// ---------------------------------------------------------------------
// 7. Broken internal links
// ---------------------------------------------------------------------
function collectAppRoutes(dir, base = "") {
  const routes = new Set();
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const isDynamic = entry.name.startsWith("[");
      const segment = isDynamic ? "*" : entry.name;
      for (const r of collectAppRoutes(full, `${base}/${segment}`)) routes.add(r);
    } else if (entry.name === "page.js" || entry.name === "page.jsx" || entry.name === "route.js") {
      routes.add(base === "" ? "/" : base);
    }
  }
  return routes;
}

const appRoutes = collectAppRoutes(path.join(repoRoot, "app"));
const knownSlugs = new Set(BLOG_POSTS.map((p) => p.slug));
const knownCategorySlugs = new Set(BLOG_CATEGORIES.map((c) => c.slug));

function isKnownInternalPath(href) {
  const clean = href.split("?")[0].split("#")[0];
  if (clean === "/blog") return true;
  const blogPostMatch = clean.match(/^\/blog\/([^/]+)$/);
  if (blogPostMatch) return knownSlugs.has(blogPostMatch[1]);
  const blogCatMatch = clean.match(/^\/blog\/category\/([^/]+)$/);
  if (blogCatMatch) return knownCategorySlugs.has(blogCatMatch[1]);

  // Match against the app-route skeleton, treating dynamic segments ([x]) as wildcards.
  const segments = clean.split("/").filter(Boolean);
  for (const route of appRoutes) {
    const routeSegments = route.split("/").filter(Boolean);
    if (routeSegments.length !== segments.length) continue;
    const matches = routeSegments.every((seg, i) => seg === "*" || seg === segments[i]);
    if (matches) return true;
  }
  return false;
}

for (const post of BLOG_POSTS) {
  const label = post.slug || "(missing slug)";
  for (const block of post.content || []) {
    if (block.type !== "link" || !block.href) continue;
    if (block.href.startsWith("http")) continue; // external links aren't checked for liveness here
    if (!isKnownInternalPath(block.href)) {
      err(`[${label}] Broken internal link: "${block.href}"`);
    }
  }
}

// ---------------------------------------------------------------------
// 8. Near-duplicate topic detection (warning only)
// ---------------------------------------------------------------------
const STOPWORDS = new Set([
  "a", "an", "the", "for", "to", "of", "and", "or", "in", "on", "with",
  "your", "you", "how", "what", "is", "are", "that", "actually", "guide",
  "does", "it", "2026", "no", "not",
]);

function titleWords(title) {
  return new Set(
    (title || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .split(/\s+/)
      .filter((w) => w && !STOPWORDS.has(w)),
  );
}

const postsWithWords = BLOG_POSTS.map((p) => ({ post: p, words: titleWords(p.title) }));

for (let i = 0; i < postsWithWords.length; i++) {
  for (let j = i + 1; j < postsWithWords.length; j++) {
    const a = postsWithWords[i];
    const b = postsWithWords[j];
    const intersection = [...a.words].filter((w) => b.words.has(w));
    const union = new Set([...a.words, ...b.words]);
    const jaccard = union.size === 0 ? 0 : intersection.length / union.size;

    const sameCategory = a.post.category === b.post.category;
    const sharedTags = (a.post.tags || []).filter((t) => (b.post.tags || []).includes(t)).length;

    if (jaccard >= 0.6) {
      warn(
        `Possible near-duplicate topic (title overlap ${(jaccard * 100).toFixed(0)}%): ` +
          `"${a.post.title}" (${a.post.slug}) vs "${b.post.title}" (${b.post.slug})`,
      );
    } else if (jaccard >= 0.4 && sameCategory && sharedTags >= 2) {
      warn(
        `Possible keyword cannibalization (same category, ${sharedTags} shared tags, ${(jaccard * 100).toFixed(0)}% title overlap): ` +
          `"${a.post.title}" (${a.post.slug}) vs "${b.post.title}" (${b.post.slug})`,
      );
    }
  }
}

// ---------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------
console.log(`\nBlog validation — ${BLOG_POSTS.length} posts checked\n`);

if (errors.length) {
  console.log(`❌ ${errors.length} error(s):`);
  errors.forEach((e) => console.log(`   - ${e}`));
} else {
  console.log("✅ No blocking errors");
}

if (warnings.length) {
  console.log(`\n⚠️  ${warnings.length} warning(s) (review, not blocking):`);
  warnings.forEach((w) => console.log(`   - ${w}`));
}

console.log("");
process.exit(errors.length > 0 ? 1 : 0);
