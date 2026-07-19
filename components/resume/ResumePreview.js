const TEMPLATE_STYLES = {
  modern: {
    fontFamily: "var(--font-inter, sans-serif)",
    accent: "#2563eb",
    nameSize: "1.9rem",
    headerAlign: "left",
    sectionHeading: { textTransform: "none", letterSpacing: "normal", borderBottom: "2px solid #2563eb" },
  },
  professional: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    accent: "#1e3a5f",
    nameSize: "1.8rem",
    headerAlign: "left",
    sectionHeading: { textTransform: "uppercase", letterSpacing: "0.03em", borderBottom: "1px solid #1e3a5f" },
  },
  minimal: {
    fontFamily: "var(--font-inter, sans-serif)",
    accent: "#111111",
    nameSize: "1.6rem",
    headerAlign: "left",
    sectionHeading: { textTransform: "none", letterSpacing: "normal", borderBottom: "1px solid #ddd" },
  },
  executive: {
    fontFamily: "Georgia, 'Times New Roman', serif",
    accent: "#7a5c00",
    nameSize: "2.1rem",
    headerAlign: "center",
    sectionHeading: { textTransform: "uppercase", letterSpacing: "0.08em", borderBottom: "2px solid #7a5c00" },
  },
};

function formatDateRange(entry) {
  const start = entry.startDate || "";
  const end = entry.current ? "Present" : entry.endDate || "";
  if (!start && !end) return "";
  return `${start}${start && end ? " – " : ""}${end}`;
}

function Section({ heading, style, children }) {
  return (
    <div style={{ marginTop: "1.25rem" }}>
      <h3 style={{ margin: "0 0 0.5rem", paddingBottom: "0.25rem", fontSize: "1rem", ...style.sectionHeading }}>{heading}</h3>
      {children}
    </div>
  );
}

/**
 * Read-only resume preview. Same section order as the editor's
 * `sectionOrder`, but this component doesn't currently support
 * rearranging the whole preview from drag-and-drop — sections render in
 * `resume.sectionOrder` order, driven by the (button-based) section
 * ordering already possible in the editor, not by a separate DnD layer.
 */
export default function ResumePreview({ resume }) {
  const style = TEMPLATE_STYLES[resume.template] || TEMPLATE_STYLES.modern;
  const { personalInfo = {}, socialLinks = {} } = resume;

  const sectionRenderers = {
    summary: () =>
      resume.summary ? (
        <Section heading="Summary" style={style}>
          <p style={{ margin: 0, whiteSpace: "pre-wrap" }}>{resume.summary}</p>
        </Section>
      ) : null,

    experience: () =>
      resume.experience?.length > 0 ? (
        <Section heading="Experience" style={style}>
          {resume.experience.map((entry, i) => (
            <div key={i} style={{ marginBottom: "0.75rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.25rem 0.5rem", fontWeight: 600 }}>
                <span>{entry.title} {entry.company && `· ${entry.company}`}</span>
                <span style={{ fontWeight: 400, fontSize: "0.85em" }}>{formatDateRange(entry)}</span>
              </div>
              {entry.location && <div style={{ fontSize: "0.85em", color: "#555" }}>{entry.location}</div>}
              {entry.description && <p style={{ margin: "0.25rem 0 0", whiteSpace: "pre-wrap" }}>{entry.description}</p>}
            </div>
          ))}
        </Section>
      ) : null,

    education: () =>
      resume.education?.length > 0 ? (
        <Section heading="Education" style={style}>
          {resume.education.map((entry, i) => (
            <div key={i} style={{ marginBottom: "0.6rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.25rem 0.5rem", fontWeight: 600 }}>
                <span>{entry.degree} {entry.field && `in ${entry.field}`}</span>
                <span style={{ fontWeight: 400, fontSize: "0.85em" }}>{formatDateRange(entry)}</span>
              </div>
              <div style={{ fontSize: "0.9em" }}>{entry.school}</div>
              {entry.description && <p style={{ margin: "0.25rem 0 0" }}>{entry.description}</p>}
            </div>
          ))}
        </Section>
      ) : null,

    skills: () =>
      resume.skills?.length > 0 ? (
        <Section heading="Skills" style={style}>
          <p style={{ margin: 0 }}>{resume.skills.map((s) => (s.level ? `${s.name} (${s.level})` : s.name)).join(" · ")}</p>
        </Section>
      ) : null,

    projects: () =>
      resume.projects?.length > 0 ? (
        <Section heading="Projects" style={style}>
          {resume.projects.map((entry, i) => (
            <div key={i} style={{ marginBottom: "0.6rem" }}>
              <div style={{ fontWeight: 600 }}>
                {entry.name} {entry.url && <span style={{ fontWeight: 400, fontSize: "0.85em" }}>({entry.url})</span>}
              </div>
              {entry.description && <p style={{ margin: "0.25rem 0 0" }}>{entry.description}</p>}
              {entry.technologies?.length > 0 && <div style={{ fontSize: "0.85em", color: "#555" }}>{entry.technologies.join(", ")}</div>}
            </div>
          ))}
        </Section>
      ) : null,

    certifications: () =>
      resume.certifications?.length > 0 ? (
        <Section heading="Certifications" style={style}>
          {resume.certifications.map((entry, i) => (
            <div key={i} style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.25rem 0.5rem" }}>
              <span>{entry.name} {entry.issuer && `· ${entry.issuer}`}</span>
              <span style={{ fontSize: "0.85em" }}>{entry.date}</span>
            </div>
          ))}
        </Section>
      ) : null,

    languages: () =>
      resume.languages?.length > 0 ? (
        <Section heading="Languages" style={style}>
          <p style={{ margin: 0 }}>{resume.languages.map((l) => (l.proficiency ? `${l.name} (${l.proficiency})` : l.name)).join(" · ")}</p>
        </Section>
      ) : null,

    awards: () =>
      resume.awards?.length > 0 ? (
        <Section heading="Awards" style={style}>
          {resume.awards.map((entry, i) => (
            <div key={i} style={{ marginBottom: "0.4rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.25rem 0.5rem", fontWeight: 600 }}>
                <span>{entry.title} {entry.issuer && `· ${entry.issuer}`}</span>
                <span style={{ fontWeight: 400, fontSize: "0.85em" }}>{entry.date}</span>
              </div>
              {entry.description && <p style={{ margin: "0.25rem 0 0" }}>{entry.description}</p>}
            </div>
          ))}
        </Section>
      ) : null,

    volunteerExperience: () =>
      resume.volunteerExperience?.length > 0 ? (
        <Section heading="Volunteer Experience" style={style}>
          {resume.volunteerExperience.map((entry, i) => (
            <div key={i} style={{ marginBottom: "0.6rem" }}>
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "0.25rem 0.5rem", fontWeight: 600 }}>
                <span>{entry.role} {entry.organization && `· ${entry.organization}`}</span>
                <span style={{ fontWeight: 400, fontSize: "0.85em" }}>{formatDateRange(entry)}</span>
              </div>
              {entry.description && <p style={{ margin: "0.25rem 0 0" }}>{entry.description}</p>}
            </div>
          ))}
        </Section>
      ) : null,

    interests: () =>
      resume.interests?.length > 0 ? (
        <Section heading="Interests" style={style}>
          <p style={{ margin: 0 }}>{resume.interests.join(" · ")}</p>
        </Section>
      ) : null,

    references: () =>
      resume.references?.length > 0 ? (
        <Section heading="References" style={style}>
          {resume.references.map((entry, i) => (
            <div key={i} style={{ marginBottom: "0.4rem" }}>
              <div style={{ fontWeight: 600 }}>{entry.name} {entry.relationship && `· ${entry.relationship}`}</div>
              <div style={{ fontSize: "0.85em", color: "#555" }}>{[entry.email, entry.phone].filter(Boolean).join(" · ")}</div>
            </div>
          ))}
        </Section>
      ) : null,
  };

  const contactLine = [personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(" · ");
  const linksLine = Object.entries(socialLinks)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join(" · ");

  return (
    <div
      style={{
        fontFamily: style.fontFamily,
        color: "#1a1a1a",
        background: "#fff",
        padding: "2rem",
        textAlign: style.headerAlign === "center" ? "center" : "left",
      }}
    >
      <h2 style={{ margin: 0, fontSize: style.nameSize, color: style.accent }}>{personalInfo.fullName || "Your Name"}</h2>
      {personalInfo.headline && <div style={{ fontSize: "1.05rem", marginTop: "0.15rem" }}>{personalInfo.headline}</div>}
      {contactLine && <div style={{ fontSize: "0.85em", color: "#555", marginTop: "0.35rem" }}>{contactLine}</div>}
      {linksLine && <div style={{ fontSize: "0.8em", color: "#555", marginTop: "0.2rem" }}>{linksLine}</div>}

      <div style={{ textAlign: "left" }}>
        {(resume.sectionOrder || Object.keys(sectionRenderers)).map((key) => (
          <div key={key}>{sectionRenderers[key]?.()}</div>
        ))}
      </div>
    </div>
  );
}
