import RelatedLinks from "./RelatedLinks";
import FaqSection from "./FaqSection";

/**
 * Shared SEO content block for the AI tool pages (career coach, mock
 * interview, match score, resume rewrite, resume analyzer, resume
 * builder). Rendered as a sibling below each page's client tool
 * component — never touches the tool component itself.
 *
 * Reuses the same FaqSection and RelatedLinks components the job
 * category SEO pages use (RelatedLinks via its existing `seoLinks` prop,
 * unchanged) rather than building a second content/linking system for
 * tool pages.
 *
 * @param {{ intro: string, faqs: Array<{question:string,answer:string}>, relatedJobLinks: Array<{name:string,href:string}> }} props
 */
export default function ToolSeoContent({ intro, faqs, relatedJobLinks = [] }) {
  return (
    <>
      {intro && (
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="container">
            <div style={{ maxWidth: "72ch", display: "grid", gap: "1rem" }}>
              {intro.split("\n\n").map((para, i) => (
                <p key={i} style={{ lineHeight: 1.7, color: "var(--color-text-muted)" }}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="container">
        <FaqSection faqs={faqs} />
        <RelatedLinks seoLinks={relatedJobLinks} />
      </div>
    </>
  );
}
