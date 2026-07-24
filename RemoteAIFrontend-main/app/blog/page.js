import Link from "next/link";
import { listPosts, getFeaturedPost, getCategories } from "@/lib/blog/blogService";
import { siteConfig } from "@/lib/seo/siteConfig";
import BlogCard from "@/components/server/BlogCard";
import NewsletterSignup from "@/components/client/NewsletterSignup";

export const metadata = {
  title: `Blog | ${siteConfig.name}`,
  description: "Remote work advice, resume tips, interview prep, and career growth guides for remote job seekers.",
  alternates: { canonical: `${siteConfig.url}/blog` },
  openGraph: { title: `Blog | ${siteConfig.name}`, url: `${siteConfig.url}/blog` },
};

/**
 * /blog — listing page. Search/category filtering both happen via plain
 * query params (?q=&category=&page=) so the listing stays a normal,
 * linkable, server-rendered page rather than needing client-side state
 * for something this simple.
 */
export default async function BlogIndexPage({ searchParams }) {
  const params = await searchParams;
  const query = params?.q || "";
  const category = params?.category || "";
  const page = Number(params?.page) || 1;

  const featured = !query && !category && page === 1 ? getFeaturedPost() : null;
  const { posts, totalPages, page: currentPage } = listPosts({ page, category, query });
  const categories = getCategories();

  function buildPageHref(nextPage) {
    const qs = new URLSearchParams();
    if (query) qs.set("q", query);
    if (category) qs.set("category", category);
    if (nextPage > 1) qs.set("page", String(nextPage));
    const suffix = qs.toString();
    return suffix ? `/blog?${suffix}` : "/blog";
  }

  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">
          <span className="dot" />
          Blog
        </span>
        <h1 style={{ marginTop: "var(--space-sm)" }}>Career advice for remote job seekers</h1>
        <p>Practical guides on resumes, interviews, and building a remote career.</p>

        {featured && (
          <Link href={`/blog/${featured.slug}`} className="card glass" style={{ display: "block", padding: "var(--space-xl)", marginTop: "var(--space-lg)", textDecoration: "none", color: "inherit" }}>
            <span className="badge badge-accent">Featured · {featured.categoryName}</span>
            <h2 style={{ margin: "0.5rem 0" }}>{featured.title}</h2>
            <p style={{ color: "var(--color-text-muted)" }}>{featured.excerpt}</p>
            <p style={{ fontSize: "0.85em", color: "var(--color-text-muted)" }}>
              {featured.author?.name} · {featured.readingTimeMinutes} min read
            </p>
          </Link>
        )}

        <form action="/blog" method="get" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "var(--space-xl)" }}>
          <input type="search" name="q" defaultValue={query} placeholder="Search articles…" style={{ flex: "1 1 240px", padding: "0.6rem" }} aria-label="Search articles" />
          {category && <input type="hidden" name="category" value={category} />}
          <button type="submit" className="btn btn-secondary">
            Search
          </button>
        </form>

        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "var(--space-sm)" }}>
          <Link href="/blog" className={`btn ${!category ? "btn-primary" : "btn-ghost"}`}>
            All
          </Link>
          {categories.map((c) => (
            <Link key={c.slug} href={`/blog/category/${c.slug}`} className={`btn ${category === c.slug ? "btn-primary" : "btn-ghost"}`}>
              {c.name} ({c.count})
            </Link>
          ))}
        </div>

        {posts.length === 0 ? (
          <p style={{ marginTop: "var(--space-xl)" }}>No articles match your search.</p>
        ) : (
          <div style={{ marginTop: "var(--space-xl)", display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "var(--space-lg)", justifyContent: "center" }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Link key={i} href={buildPageHref(i + 1)} className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-ghost"}`}>
                {i + 1}
              </Link>
            ))}
          </div>
        )}

        <div style={{ marginTop: "var(--space-2xl)" }}>
          <NewsletterSignup />
        </div>
      </div>
    </section>
  );
}
