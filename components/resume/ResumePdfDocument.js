import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

/**
 * Produces a genuinely text-based PDF via @react-pdf/renderer — every
 * word is real, selectable, ATS-parseable PDF text content, not a
 * rasterized screenshot of the page (which is what an html2canvas-based
 * "download PDF" would produce, and which most ATS parsers can't read
 * at all). See PdfDownloadButton.js for why this runs client-side with
 * no backend PDF service involved.
 *
 * Kept deliberately plain: single column, standard fonts, no tables or
 * multi-column layouts, no images — the same structural choices that
 * make a resume ATS-friendly in general.
 */

const TEMPLATE_COLORS = {
  modern: "#2563eb",
  professional: "#1e3a5f",
  minimal: "#111111",
  executive: "#7a5c00",
};

const styles = StyleSheet.create({
  page: { padding: 40, fontSize: 10, fontFamily: "Helvetica", color: "#1a1a1a" },
  name: { fontSize: 20, marginBottom: 2 },
  headline: { fontSize: 12, marginBottom: 4 },
  contactLine: { fontSize: 9, color: "#555", marginBottom: 2 },
  sectionHeading: { fontSize: 11, marginTop: 12, marginBottom: 4, borderBottom: "1pt solid #ccc", paddingBottom: 2 },
  entryHeader: { flexDirection: "row", justifyContent: "space-between", fontSize: 10.5 },
  entrySub: { fontSize: 9, color: "#555", marginBottom: 2 },
  paragraph: { fontSize: 9.5, marginTop: 2, lineHeight: 1.4 },
  line: { fontSize: 9.5, marginTop: 1 },
});

function formatDateRange(entry) {
  const start = entry.startDate || "";
  const end = entry.current ? "Present" : entry.endDate || "";
  if (!start && !end) return "";
  return `${start}${start && end ? " - " : ""}${end}`;
}

function SectionHeading({ children, color }) {
  return <Text style={[styles.sectionHeading, { color }]}>{children}</Text>;
}

export default function ResumePdfDocument({ resume }) {
  const color = TEMPLATE_COLORS[resume.template] || TEMPLATE_COLORS.modern;
  const p = resume.personalInfo || {};
  const social = resume.socialLinks || {};

  const contactLine = [p.email, p.phone, p.location].filter(Boolean).join("  |  ");
  const linksLine = Object.entries(social)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join("  |  ");

  const sections = resume.sectionOrder || [
    "summary", "experience", "education", "skills", "projects",
    "certifications", "languages", "awards", "volunteerExperience",
    "interests", "references",
  ];

  const renderers = {
    summary: () => resume.summary && (
      <View key="summary">
        <SectionHeading color={color}>Summary</SectionHeading>
        <Text style={styles.paragraph}>{resume.summary}</Text>
      </View>
    ),
    experience: () => resume.experience?.length > 0 && (
      <View key="experience">
        <SectionHeading color={color}>Experience</SectionHeading>
        {resume.experience.map((e, i) => (
          <View key={i} style={{ marginBottom: 6 }}>
            <View style={styles.entryHeader}>
              <Text>{[e.title, e.company].filter(Boolean).join(" - ")}</Text>
              <Text>{formatDateRange(e)}</Text>
            </View>
            {e.location && <Text style={styles.entrySub}>{e.location}</Text>}
            {e.description && <Text style={styles.paragraph}>{e.description}</Text>}
          </View>
        ))}
      </View>
    ),
    education: () => resume.education?.length > 0 && (
      <View key="education">
        <SectionHeading color={color}>Education</SectionHeading>
        {resume.education.map((e, i) => (
          <View key={i} style={{ marginBottom: 4 }}>
            <View style={styles.entryHeader}>
              <Text>{[e.degree, e.field && `in ${e.field}`].filter(Boolean).join(" ")}</Text>
              <Text>{formatDateRange(e)}</Text>
            </View>
            <Text style={styles.entrySub}>{e.school}</Text>
          </View>
        ))}
      </View>
    ),
    skills: () => resume.skills?.length > 0 && (
      <View key="skills">
        <SectionHeading color={color}>Skills</SectionHeading>
        <Text style={styles.line}>{resume.skills.map((s) => (s.level ? `${s.name} (${s.level})` : s.name)).join(", ")}</Text>
      </View>
    ),
    projects: () => resume.projects?.length > 0 && (
      <View key="projects">
        <SectionHeading color={color}>Projects</SectionHeading>
        {resume.projects.map((e, i) => (
          <View key={i} style={{ marginBottom: 4 }}>
            <Text style={{ fontSize: 10.5 }}>{e.name}</Text>
            {e.description && <Text style={styles.paragraph}>{e.description}</Text>}
            {e.technologies?.length > 0 && <Text style={styles.entrySub}>{e.technologies.join(", ")}</Text>}
          </View>
        ))}
      </View>
    ),
    certifications: () => resume.certifications?.length > 0 && (
      <View key="certifications">
        <SectionHeading color={color}>Certifications</SectionHeading>
        {resume.certifications.map((e, i) => (
          <View key={i} style={styles.entryHeader}>
            <Text>{[e.name, e.issuer].filter(Boolean).join(" - ")}</Text>
            <Text>{e.date}</Text>
          </View>
        ))}
      </View>
    ),
    languages: () => resume.languages?.length > 0 && (
      <View key="languages">
        <SectionHeading color={color}>Languages</SectionHeading>
        <Text style={styles.line}>{resume.languages.map((l) => (l.proficiency ? `${l.name} (${l.proficiency})` : l.name)).join(", ")}</Text>
      </View>
    ),
    awards: () => resume.awards?.length > 0 && (
      <View key="awards">
        <SectionHeading color={color}>Awards</SectionHeading>
        {resume.awards.map((e, i) => (
          <View key={i} style={{ marginBottom: 4 }}>
            <View style={styles.entryHeader}>
              <Text>{[e.title, e.issuer].filter(Boolean).join(" - ")}</Text>
              <Text>{e.date}</Text>
            </View>
            {e.description && <Text style={styles.paragraph}>{e.description}</Text>}
          </View>
        ))}
      </View>
    ),
    volunteerExperience: () => resume.volunteerExperience?.length > 0 && (
      <View key="volunteerExperience">
        <SectionHeading color={color}>Volunteer Experience</SectionHeading>
        {resume.volunteerExperience.map((e, i) => (
          <View key={i} style={{ marginBottom: 4 }}>
            <View style={styles.entryHeader}>
              <Text>{[e.role, e.organization].filter(Boolean).join(" - ")}</Text>
              <Text>{formatDateRange(e)}</Text>
            </View>
            {e.description && <Text style={styles.paragraph}>{e.description}</Text>}
          </View>
        ))}
      </View>
    ),
    interests: () => resume.interests?.length > 0 && (
      <View key="interests">
        <SectionHeading color={color}>Interests</SectionHeading>
        <Text style={styles.line}>{resume.interests.join(", ")}</Text>
      </View>
    ),
    references: () => resume.references?.length > 0 && (
      <View key="references">
        <SectionHeading color={color}>References</SectionHeading>
        {resume.references.map((e, i) => (
          <View key={i} style={{ marginBottom: 3 }}>
            <Text>{[e.name, e.relationship].filter(Boolean).join(" - ")}</Text>
            <Text style={styles.entrySub}>{[e.email, e.phone].filter(Boolean).join("  |  ")}</Text>
          </View>
        ))}
      </View>
    ),
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={[styles.name, { color }]}>{p.fullName || "Your Name"}</Text>
        {p.headline && <Text style={styles.headline}>{p.headline}</Text>}
        {contactLine && <Text style={styles.contactLine}>{contactLine}</Text>}
        {linksLine && <Text style={styles.contactLine}>{linksLine}</Text>}
        {sections.map((key) => renderers[key]?.())}
      </Page>
    </Document>
  );
}
