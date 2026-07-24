"use client";

const inputStyle = { width: "100%", padding: "0.5rem" };
const fieldStyle = { display: "grid", gap: "0.25rem" };

export default function PersonalInfoForm({ personalInfo, summary, socialLinks, onChangePersonalInfo, onChangeSummary, onChangeSocialLinks }) {
  return (
    <div>
      <h3>Personal Information</h3>
      <div style={{ display: "grid", gap: "0.6rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <label style={fieldStyle}>
          <span style={{ fontSize: "0.85em" }}>Full name</span>
          <input style={inputStyle} type="text" value={personalInfo.fullName || ""} onChange={(e) => onChangePersonalInfo({ ...personalInfo, fullName: e.target.value })} />
        </label>
        <label style={fieldStyle}>
          <span style={{ fontSize: "0.85em" }}>Headline</span>
          <input style={inputStyle} type="text" placeholder="e.g. Senior Backend Engineer" value={personalInfo.headline || ""} onChange={(e) => onChangePersonalInfo({ ...personalInfo, headline: e.target.value })} />
        </label>
        <label style={fieldStyle}>
          <span style={{ fontSize: "0.85em" }}>Email</span>
          <input style={inputStyle} type="email" value={personalInfo.email || ""} onChange={(e) => onChangePersonalInfo({ ...personalInfo, email: e.target.value })} />
        </label>
        <label style={fieldStyle}>
          <span style={{ fontSize: "0.85em" }}>Phone</span>
          <input style={inputStyle} type="text" value={personalInfo.phone || ""} onChange={(e) => onChangePersonalInfo({ ...personalInfo, phone: e.target.value })} />
        </label>
        <label style={fieldStyle}>
          <span style={{ fontSize: "0.85em" }}>Location</span>
          <input style={inputStyle} type="text" value={personalInfo.location || ""} onChange={(e) => onChangePersonalInfo({ ...personalInfo, location: e.target.value })} />
        </label>
      </div>

      <h3 style={{ marginTop: "var(--space-lg)" }}>Professional Summary</h3>
      <textarea
        rows={4}
        style={inputStyle}
        placeholder="A 2-4 sentence summary of your experience and strengths."
        value={summary || ""}
        onChange={(e) => onChangeSummary(e.target.value)}
      />

      <h3 style={{ marginTop: "var(--space-lg)" }}>Social Links</h3>
      <div style={{ display: "grid", gap: "0.6rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        {["linkedin", "github", "portfolio", "website"].map((key) => (
          <label key={key} style={fieldStyle}>
            <span style={{ fontSize: "0.85em", textTransform: "capitalize" }}>{key}</span>
            <input
              style={inputStyle}
              type="url"
              placeholder="https://..."
              value={socialLinks[key] || ""}
              onChange={(e) => onChangeSocialLinks({ ...socialLinks, [key]: e.target.value })}
            />
          </label>
        ))}
      </div>
    </div>
  );
}
