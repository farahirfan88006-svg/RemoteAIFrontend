import { headingId } from "./TableOfContents";

export default function ArticleBody({ content }) {
  return (
    <div style={{ display: "grid", gap: "1rem" }}>
      {content.map((block, i) => {
        if (block.type === "heading") {
          const Tag = block.level === 3 ? "h3" : "h2";
          return (
            <Tag key={i} id={headingId(block.text)} style={{ scrollMarginTop: "calc(var(--nav-height) + 1rem)" }}>
              {block.text}
            </Tag>
          );
        }
        if (block.type === "list") {
          return (
            <ul key={i} style={{ paddingLeft: "1.25rem", display: "grid", gap: "0.35rem" }}>
              {block.items.map((item, j) => (
                <li key={j}>{item}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} style={{ lineHeight: 1.7 }}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}
