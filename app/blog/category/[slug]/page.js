import { notFound } from "next/navigation";
import Link from "next/link";
import { listPosts, getCategories } from "@/lib/blog/blogService";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";
import JsonLd from "@/components/server/JsonLd";
import BlogCard from "@/components/server/BlogCard";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategories().find((c) => c.slug === slug);
  if (!category) return {};
  const title = `${category.name} Articles`;
  return {
    title,
    description: `Articles about ${category.name.toLowerCase()} for remote job seekers.`,
    alternates: { canonical: `${siteConfig.url}/blog/category/${slug}` },
  };
}

export default async function BlogCategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { page: pageParam } = (await searchParams) || {};
  const category = getCategories().find((c) => c.slug === slug);
  if (!category) notFound();

  const page = Number(pageParam) || 1;
  const { posts, totalPages, page: currentPage } = listPosts({ page, category: slug });

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Blog", path: "/blog" },
    { name: category.name, path: `/blog/category/${slug}` },
  ]);

  return (
    <section className="section">
      <div className="container">
        <JsonLd data={breadcrumbSchema} />
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <a href="/blog">Blog</a> / <span aria-current="page">{category.name}</span>
        </nav>

        <h1 style={{ marginTop: "var(--space-sm)" }}>{category.name}</h1>
        <p>{category.count} article{category.count === 1 ? "" : "s"}</p>

        <div style={{ marginTop: "var(--space-lg)", display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {totalPages > 1 && (
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "var(--space-lg)", justifyContent: "center" }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <Link key={i} href={`/blog/category/${slug}?page=${i + 1}`} className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-ghost"}`}>
                {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
