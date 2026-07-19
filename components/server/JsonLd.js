/**
 * Renders one or more schema.org objects as a single JSON-LD <script> tag.
 *
 * `app/layout.js` inlines its own Organization/WebSite JSON-LD directly
 * (unchanged, left as-is). This component exists so the new Phase 3 pages
 * don't each repeat the same `<script type="application/ld+json" ...>`
 * boilerplate — pass one schema object or an array of them.
 *
 * @param {{ data: object | object[] }} props
 */
export default function JsonLd({ data }) {
  const payload = Array.isArray(data) ? data : [data];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
