import Link from "next/link";

export default function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="card" style={{ display: "block", padding: 0, textDecoration: "none", color: "inherit", overflow: "hidden" }}>
      {post.featuredImage?.url && (
        // eslint-disable-next-line @next/next/no-img-element -- plain <img>, matching the rest of this project (no next/image usage elsewhere)
        <img
          src={post.featuredImage.url}
          alt={post.featuredImage.alt || post.title}
          width={400}
          height={210}
          loading="lazy"
          style={{ width: "100%", height: "160px", objectFit: "cover", display: "block" }}
        />
      )}
      <div style={{ padding: "var(--space-md)" }}>
      <span className="badge badge-accent">{post.categoryName}</span>
      <h3 style={{ margin: "0.5rem 0 0.25rem" }}>{post.title}</h3>
      <p style={{ color: "var(--color-text-muted)", fontSize: "0.9em" }}>{post.excerpt}</p>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8em", color: "var(--color-text-muted)", marginTop: "var(--space-sm)" }}>
        <span>{post.author?.name}</span>
        <span>
          {new Date(post.publishedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })} · {post.readingTimeMinutes} min read
        </span>
      </div>
      </div>
    </Link>
  );
}
