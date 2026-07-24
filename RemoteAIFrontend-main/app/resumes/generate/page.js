"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import { generateResume } from "@/lib/api/resumes";
import ListSectionEditor from "@/components/resume/ListSectionEditor";
import StringListEditor from "@/components/resume/StringListEditor";

/**
 * AI Resume Generator — collects only the minimal info the ticket asks
 * for (name, contact, education, experience, skills, projects,
 * certifications, languages), then calls POST /api/resumes/generate
 * (backend ai/resumeGenerator.js expands it into a full resume) and
 * redirects straight into the EXISTING resume editor
 * (/resumes/[id]) for template selection, live preview, further
 * editing, and PDF export — none of that is reimplemented here.
 *
 * Reuses ListSectionEditor/StringListEditor (the same components the
 * manual editor uses) for Experience/Education/Skills/Projects/
 * Certifications/Languages, rather than building a second set of
 * repeatable-entry form components just for this page.
 */
const inputStyle = { width: "100%", padding: "0.5rem" };
const fieldStyle = { display: "grid", gap: "0.25rem" };

export default function GenerateResumePage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [basics, setBasics] = useState({ fullName: "", email: "", phone: "", location: "", headline: "" });
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  if (!authLoading && !user) {
    router.replace("/login");
    return null;
  }

  async function handleGenerate() {
    setIsGenerating(true);
    setError("");
    try {
      const resume = await generateResume({
        ...basics,
        education,
        experience,
        skills,
        projects,
        certifications,
        languages,
      });
      router.push(`/resumes/${resume._id}`);
    } catch (err) {
      setError(err.message || "Couldn't generate a resume.");
      setIsGenerating(false);
    }
  }

  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">
          <span className="dot" />
          AI Resume Generator
        </span>
        <h1 style={{ marginTop: "var(--space-sm)" }}>Generate a resume from the basics</h1>
        <p>Fill in your basic information and we&apos;ll assemble a professional, ATS-friendly resume — you can then edit and refine it like any other resume.</p>

        <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-md)" }}>
          <h3 style={{ marginTop: 0 }}>Basics</h3>
          <div style={{ display: "grid", gap: "0.6rem", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Full name</span>
              <input style={inputStyle} type="text" value={basics.fullName} onChange={(e) => setBasics({ ...basics, fullName: e.target.value })} />
            </label>
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Headline</span>
              <input style={inputStyle} type="text" placeholder="e.g. Senior Backend Engineer" value={basics.headline} onChange={(e) => setBasics({ ...basics, headline: e.target.value })} />
            </label>
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Email</span>
              <input style={inputStyle} type="email" value={basics.email} onChange={(e) => setBasics({ ...basics, email: e.target.value })} />
            </label>
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Phone</span>
              <input style={inputStyle} type="text" value={basics.phone} onChange={(e) => setBasics({ ...basics, phone: e.target.value })} />
            </label>
            <label style={fieldStyle}>
              <span style={{ fontSize: "0.85em" }}>Location</span>
              <input style={inputStyle} type="text" value={basics.location} onChange={(e) => setBasics({ ...basics, location: e.target.value })} />
            </label>
          </div>
        </div>

        <ListSectionEditor
          title="Experience"
          items={experience}
          dateRange
          fields={[
            { key: "title", label: "Job title" },
            { key: "company", label: "Company" },
            { key: "location", label: "Location" },
          ]}
          onChange={setExperience}
          addLabel="+ Add experience"
        />

        <ListSectionEditor
          title="Education"
          items={education}
          dateRange
          fields={[
            { key: "school", label: "School" },
            { key: "degree", label: "Degree" },
            { key: "field", label: "Field of study" },
          ]}
          onChange={setEducation}
          addLabel="+ Add education"
        />

        <ListSectionEditor
          title="Skills"
          items={skills}
          fields={[{ key: "name", label: "Skill" }]}
          onChange={setSkills}
          addLabel="+ Add skill"
        />

        <ListSectionEditor
          title="Projects"
          items={projects}
          fields={[
            { key: "name", label: "Project name" },
            { key: "description", label: "Description", type: "textarea", span2: true },
          ]}
          onChange={setProjects}
          addLabel="+ Add project"
        />

        <ListSectionEditor
          title="Certifications"
          items={certifications}
          fields={[
            { key: "name", label: "Certification" },
            { key: "issuer", label: "Issuer" },
          ]}
          onChange={setCertifications}
          addLabel="+ Add certification"
        />

        <StringListEditor title="Languages" items={languages.map((l) => l.name || l)} onChange={(names) => setLanguages(names.map((name) => ({ name })))} placeholder="e.g. Spanish — press Enter" />

        {error && <p style={{ color: "crimson", marginTop: "var(--space-md)" }}>{error}</p>}

        <button type="button" className="btn btn-primary btn-lg" style={{ marginTop: "var(--space-lg)" }} onClick={handleGenerate} disabled={isGenerating}>
          {isGenerating ? "Generating…" : "Generate Resume"}
        </button>
      </div>
    </section>
  );
}
