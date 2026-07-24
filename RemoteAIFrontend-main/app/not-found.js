import Button from "@/components/ui/Button";

/**
 * Root `not-found.js` — Next.js App Router convention (a sibling of
 * `layout.js` at the same level, rendered whenever `notFound()` is called
 * anywhere in the tree without a closer `not-found.js` boundary of its
 * own, and for any URL that matches no route at all).
 *
 * This file didn't exist before. Its absence is also why every existing
 * `notFound()` call in this app — `/jobs/category/[slug]`,
 * `/jobs/country/[slug]`, `/jobs/company/[slug]`, and now `/[seoSlug]` —
 * was rendering Next's built-in default fallback with an HTTP 200 status
 * instead of 404: with no explicit not-found boundary, this Next.js
 * version can't commit the 404 status before it starts streaming the
 * fallback UI. Adding this one file fixes the status code for all four,
 * without touching any of their page.js files.
 *
 * Reuses the existing Button UI primitive so this matches the rest of
 * the site rather than introducing new one-off markup.
 */
export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div style={{ paddingBlock: "var(--space-2xl)", textAlign: "center" }}>
          <span className="eyebrow">
            <span className="dot" />
            404
          </span>
          <h1 style={{ marginTop: "var(--space-sm)" }}>This page could not be found</h1>
          <p style={{ marginBlock: "var(--space-md)" }}>
            The page you&apos;re looking for doesn&apos;t exist or may have moved.
          </p>
          <Button href="/jobs">Browse remote jobs</Button>
        </div>
      </div>
    </section>
  );
}
