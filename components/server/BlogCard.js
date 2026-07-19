import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card" style={{ display: "block", padding: "var(--space-md)", textDecoration: "none", color: "inherit" }}>
      <span className="badge badge-accent">{post.categoryName}</span>
      <h3 style={{ margin: "0.5rem 0 0.25rem" }}>{post.title}</h3>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.9em" }}>{post.excerpt}</p>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8em", color: "var(--color-text-muted)", marginTop: "var(--space-sm)" }}>
        <span>{post.author?.name}</span>
        <span>
          {new Date(post.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} · {post.readingTimeMinutes} min read
        </span>
      </div>
    </Link>
  );
}
