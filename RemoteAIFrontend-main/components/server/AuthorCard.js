export default function AuthorCard({ author }) {
  if (!author) return null;
  return (
    <div className="card" style={{ padding: "var(--space-md)", display: "flex", gap: "0.75rem", alignItems: "center" }}>
      <div
        aria-hidden="true"
        style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "var(--gradient-brand)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 700,
          flexShrink: 0,
        }}
      >
        {author.avatarInitials}
      </div>
      <div>
        <p style={{ margin: 0, fontWeight: 600 }}>{author.name}</p>
        <p style={{ margin: 0, fontSize: "0.85em", color: "var(--color-text-muted)" }}>{author.role}</p>
      </div>
    </div>
  );
}
