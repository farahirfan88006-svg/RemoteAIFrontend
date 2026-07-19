import { BLOG_POSTS, BLOG_CATEGORIES } from "./posts";

const DEFAULT_PAGE_SIZE = 6;

function sortByPublishedDesc(posts) {
  return [...posts].sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
}

function categoryName(slug) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug)?.name || slug;
}

function toSummary(post) {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    categoryName: categoryName(post.category),
    tags: post.tags,
    author: post.author,
    publishedAt: post.publishedAt,
    readingTimeMinutes: post.readingTimeMinutes,
    featured: post.featured,
  };
}

/**
 * @param {{ page?: number, pageSize?: number, category?: string, query?: string }} options
 */
export function listPosts({ page = 1, pageSize = DEFAULT_PAGE_SIZE, category, query } = {}) {
  let posts = sortByPublishedDesc(BLOG_POSTS);

  if (category) posts = posts.filter((p) => p.category === category);

  if (query?.trim()) {
    const term = query.trim().toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.excerpt.toLowerCase().includes(term) ||
        p.tags.some((tag) => tag.toLowerCase().includes(term)),
    );
  }

  const total = posts.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * pageSize;

  return {
    posts: posts.slice(start, start + pageSize).map(toSummary),
    total,
    page: currentPage,
    pageSize,
    totalPages,
  };
}

/** The most recent post flagged `featured: true`, falling back to the most recent post overall. */
export function getFeaturedPost() {
  const featured = sortByPublishedDesc(BLOG_POSTS.filter((p) => p.featured));
  return toSummary(featured[0] || sortByPublishedDesc(BLOG_POSTS)[0]);
}

/** @returns {object|null} the FULL post (including `content` and `faqs`), or null if not found. */
export function getPostBySlug(slug) {
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) return null;
  return { ...toSummary(post), content: post.content, faqs: post.faqs || [] };
}

/**
 * Related articles: same category first, then shared tags, excluding the
 * post itself — a simple, transparent relatedness rule rather than a
 * black-box recommendation model, appropriate for a static content set
 * this size.
 */
export function getRelatedPosts(post, limit = 3) {
  const others = BLOG_POSTS.filter((p) => p.slug !== post.slug);
  const scored = others.map((p) => {
    let score = 0;
    if (p.category === post.category) score += 2;
    score += p.tags.filter((tag) => post.tags.includes(tag)).length;
    return { post: p, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || new Date(b.post.publishedAt) - new Date(a.post.publishedAt))
    .slice(0, limit)
    .map((s) => toSummary(s.post));
}

export function getCategories() {
  return BLOG_CATEGORIES.map((c) => ({
    ...c,
    count: BLOG_POSTS.filter((p) => p.category === c.slug).length,
  })).filter((c) => c.count > 0);
}

export function getAllSlugs() {
  return BLOG_POSTS.map((p) => p.slug);
}
