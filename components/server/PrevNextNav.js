import Link from "next/link";

/**
 * Previous/Next article navigation for the blog post detail page.
 * Order comes from lib/blog/blogService.js's getAdjacentPosts (chronological
 * by publishedAt), not category — a predictable "earlier / later" reading
 * order that doesn't depend on which category the current post is in.
 *
 * Renders nothing if there's no adjacent post in that direction (i.e. the
 * current post is the very first or very last published article).
 */
export default function PrevNextNav({ previous, next }) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label="More articles"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--space-md)",
        marginTop: "var(--space-xl)",
      }}
      className="prev-next-nav"
    >
      {previous ? (
        <Link href={`/blog/${previous.slug}`} className="card" style={{ display: "block", padding: "var(--space-md)", textDecoration: "none", color: "inherit" }}>
          <span style={{ fontSize: "0.8em", color: "var(--color-text-muted)" }}>← Previous</span>
          <p style={{ margin: "0.25rem 0 0", fontWeight: 600 }}>{previous.title}</p>
        </Link>
      ) : (
        <span />
      )}

      {next ? (
        <Link href={`/blog/${next.slug}`} className="card" style={{ display: "block", padding: "var(--space-md)", textDecoration: "none", color: "inherit", textAlign: "right" }}>
          <span style={{ fontSize: "0.8em", color: "var(--color-text-muted)" }}>Next →</span>
          <p style={{ margin: "0.25rem 0 0", fontWeight: 600 }}>{next.title}</p>
        </Link>
      ) : (
        <span />
      )}

      <style>{`
        @media (max-width: 700px) {
          .prev-next-nav { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </nav>
  );
}
