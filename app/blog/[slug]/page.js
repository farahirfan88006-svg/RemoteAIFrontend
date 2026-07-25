import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts, getAllSlugs, getAdjacentPosts } from "@/lib/blog/blogService";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildArticleSchema, buildBreadcrumbSchema, buildFaqSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/server/JsonLd";
import ArticleBody from "@/components/server/ArticleBody";
import TableOfContents from "@/components/server/TableOfContents";
import AuthorCard from "@/components/server/AuthorCard";
import BlogCard from "@/components/server/BlogCard";
import PrevNextNav from "@/components/server/PrevNextNav";
import ShareButtons from "@/components/client/ShareButtons";

/** Prebuilds every article at build time — a fixed, known set of static content, not per-request dynamic data. */
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${slug}`;
  const imageUrl = post.featuredImage?.url || `${siteConfig.url}${siteConfig.socialImage}`;
  const imageAlt = post.featuredImage?.alt || post.title;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: url },
    authors: post.author?.name ? [{ name: post.author.name }] : undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const { previous, next } = getAdjacentPosts(post);
  const url = `${siteConfig.url}/blog/${slug}`;
  const wasUpdated = post.updatedAt && post.updatedAt !== post.publishedAt;

  const articleSchema = buildArticleSchema(post);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${slug}` },
  ]);
  const faqSchema = buildFaqSchema(post.faqs);
  const schemas = [articleSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])];

  return (
    <section className="section">
      <div className="container">
        <JsonLd data={schemas} />

        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/blog">Blog</a> / <span aria-current="page">{post.title}</span>
        </nav>

        <div style={{ marginTop: "var(--space-sm)" }}>
          <span className="badge badge-accent">{post.categoryName}</span>
          <h1 style={{ marginTop: "var(--space-sm)" }}>{post.title}</h1>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", alignItems: "center", fontSize: "0.9em", color: "var(--color-text-muted)" }}>
            <span>{post.author?.name}</span>
            <span>·</span>
            <span>Published {new Date(post.publishedAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</span>
            {wasUpdated && (
              <>
                <span>·</span>
                <span>Updated {new Date(post.updatedAt).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</span>
              </>
            )}
            <span>·</span>
            <span>{post.readingTimeMinutes} min read</span>
          </div>
        </div>

        {post.featuredImage?.url && (
          // eslint-disable-next-line @next/next/no-img-element -- plain <img>, matching the rest of this project (no next/image usage elsewhere)
          <img
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            width={1200}
            height={630}
            style={{ width: "100%", maxHeight: "420px", objectFit: "cover", borderRadius: "var(--radius-lg, 12px)", marginTop: "var(--space-lg)" }}
          />
        )}

        <div
          style={{ marginTop: "var(--space-xl)", display: "grid", gridTemplateColumns: "minmax(0, 3fr) minmax(0, 1fr)", gap: "var(--space-xl)" }}
          className="blog-detail-grid"
        >
          <div>
            <ArticleBody content={post.content} />

            <div style={{ marginTop: "var(--space-xl)" }}>
              <ShareButtons url={url} title={post.title} />
            </div>

            <div style={{ marginTop: "var(--space-lg)" }}>
              <AuthorCard author={post.author} />
            </div>

            <PrevNextNav previous={previous} next={next} />
          </div>

          <aside style={{ display: "grid", gap: "var(--space-md)", alignContent: "start", position: "sticky", top: "calc(var(--nav-height) + 1rem)" }}>
            <TableOfContents content={post.content} />
          </aside>
        </div>

        {related.length > 0 && (
          <div style={{ marginTop: "var(--space-2xl)" }}>
            <h2>Related articles</h2>
            <div style={{ display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))" }}>
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blog-detail-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
