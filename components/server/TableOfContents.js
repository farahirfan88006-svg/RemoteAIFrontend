/**
 * Table of Contents, generated directly from the post's `content`
 * heading blocks (see lib/blog/posts.js) — there's no separate outline
 * to maintain in sync with the article body.
 */
export function headingId(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function TableOfContents({ content }) {
  const headings = content.filter((block) => block.type === "heading");
  if (headings.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="card" style={{ padding: "var(--space-md)" }}>
      <p style={{ margin: "0 0 0.5rem", fontWeight: 600, fontSize: "0.85em", textTransform: "uppercase", letterSpacing: "0.04em", color: "var(--color-text-muted)" }}>
        On this page
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "0.35rem" }}>
        {headings.map((heading, i) => (
          <li key={i}>
            <a href={`#${headingId(heading.text)}`} style={{ fontSize: "0.9em", color: "var(--color-text-muted)" }}>
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
