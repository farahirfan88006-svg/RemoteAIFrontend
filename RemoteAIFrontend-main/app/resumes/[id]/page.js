"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import * as resumesApi from "@/lib/api/resumes";
import PersonalInfoForm from "@/components/resume/PersonalInfoForm";
import ListSectionEditor from "@/components/resume/ListSectionEditor";
import StringListEditor from "@/components/resume/StringListEditor";
import ResumePreview from "@/components/resume/ResumePreview";
import PdfDownloadButton from "@/components/resume/PdfDownloadButton";

const TEMPLATES = ["modern", "professional", "minimal", "executive"];
const AUTOSAVE_DELAY_MS = 1200;

export default function ResumeEditorPage() {
  const { id } = useParams();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [resume, setResume] = useState(null);
  const [error, setError] = useState("");
  const [saveState, setSaveState] = useState("idle"); // idle | saving | saved | error
  const saveTimeoutRef = useRef(null);
  const lastSavedRef = useRef(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    resumesApi
      .getResume(id)
      .then((data) => {
        setResume(data);
        lastSavedRef.current = JSON.stringify(data);
      })
      .catch((err) => setError(err.message || "Couldn't load this resume."));
  }, [id, user, authLoading, router]);

  // Debounced autosave — fires AUTOSAVE_DELAY_MS after the last edit,
  // and only sends a request if something actually changed since the
  // last successful save (avoids redundant PUTs on e.g. focus events).
  const scheduleSave = useCallback(
    (nextResume) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(async () => {
        const serialized = JSON.stringify(nextResume);
        if (serialized === lastSavedRef.current) return;
        setSaveState("saving");
        try {
          const saved = await resumesApi.updateResume(id, nextResume);
          lastSavedRef.current = JSON.stringify(saved);
          setSaveState("saved");
        } catch (err) {
          setSaveState("error");
          setError(err.message || "Auto-save failed.");
        }
      }, AUTOSAVE_DELAY_MS);
    },
    [id],
  );

  function update(patch) {
    setResume((prev) => {
      const next = { ...prev, ...patch };
      scheduleSave(next);
      return next;
    });
  }

  if (authLoading || !user) return null;

  if (error && !resume) {
    return (
      <section className="section">
        <div className="container">
          <p style={{ color: "crimson" }}>{error}</p>
        </div>
      </section>
    );
  }

  if (!resume) {
    return (
      <section className="section">
        <div className="container">
          <p>Loading resume…</p>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-sm)" }}>
          <input
            type="text"
            value={resume.title}
            onChange={(e) => update({ title: e.target.value })}
            style={{ fontSize: "1.4rem", fontWeight: 600, border: "none", background: "none", padding: 0 }}
            aria-label="Resume title"
          />
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span style={{ fontSize: "0.85em", color: "var(--color-text-muted, #666)" }}>
              {saveState === "saving" && "Saving…"}
              {saveState === "saved" && "All changes saved"}
              {saveState === "error" && "Auto-save failed"}
            </span>
            <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
              Print
            </button>
            <PdfDownloadButton resume={resume} />
          </div>
        </div>

        <div
          style={{
            marginTop: "var(--space-lg)",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "var(--space-lg)",
          }}
          className="resume-editor-grid"
        >
          {/* Editor column — hidden on print, only the preview should print */}
          <div className="no-print">
            <div style={{ marginBottom: "var(--space-md)" }}>
              <h3>Template</h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {TEMPLATES.map((template) => (
                  <button
                    key={template}
                    type="button"
                    className={template === resume.template ? "btn btn-primary" : "btn btn-secondary"}
                    onClick={() => update({ template })}
                    style={{ textTransform: "capitalize" }}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>

            <PersonalInfoForm
              personalInfo={resume.personalInfo}
              summary={resume.summary}
              socialLinks={resume.socialLinks}
              onChangePersonalInfo={(personalInfo) => update({ personalInfo })}
              onChangeSummary={(summary) => update({ summary })}
              onChangeSocialLinks={(socialLinks) => update({ socialLinks })}
            />

            <ListSectionEditor
              title="Work Experience"
              items={resume.experience}
              dateRange
              fields={[
                { key: "title", label: "Job title" },
                { key: "company", label: "Company" },
                { key: "location", label: "Location" },
                { key: "description", label: "Description", type: "textarea", span2: true },
              ]}
              onChange={(experience) => update({ experience })}
              addLabel="+ Add experience"
            />

            <ListSectionEditor
              title="Education"
              items={resume.education}
              dateRange
              fields={[
                { key: "school", label: "School" },
                { key: "degree", label: "Degree" },
                { key: "field", label: "Field of study" },
                { key: "description", label: "Description", type: "textarea", span2: true },
              ]}
              onChange={(education) => update({ education })}
              addLabel="+ Add education"
            />

            <ListSectionEditor
              title="Skills"
              items={resume.skills}
              fields={[
                { key: "name", label: "Skill" },
                { key: "level", label: "Level (optional)" },
              ]}
              onChange={(skills) => update({ skills })}
              addLabel="+ Add skill"
            />

            <ListSectionEditor
              title="Projects"
              items={resume.projects}
              fields={[
                { key: "name", label: "Project name" },
                { key: "url", label: "URL" },
                { key: "description", label: "Description", type: "textarea", span2: true },
              ]}
              onChange={(projects) => update({ projects })}
              addLabel="+ Add project"
            />

            <ListSectionEditor
              title="Certifications"
              items={resume.certifications}
              fields={[
                { key: "name", label: "Certification" },
                { key: "issuer", label: "Issuer" },
                { key: "date", label: "Date" },
                { key: "url", label: "URL" },
              ]}
              onChange={(certifications) => update({ certifications })}
              addLabel="+ Add certification"
            />

            <ListSectionEditor
              title="Languages"
              items={resume.languages}
              fields={[
                { key: "name", label: "Language" },
                { key: "proficiency", label: "Proficiency" },
              ]}
              onChange={(languages) => update({ languages })}
              addLabel="+ Add language"
            />

            <ListSectionEditor
              title="Awards"
              items={resume.awards}
              fields={[
                { key: "title", label: "Award" },
                { key: "issuer", label: "Issuer" },
                { key: "date", label: "Date" },
                { key: "description", label: "Description", type: "textarea", span2: true },
              ]}
              onChange={(awards) => update({ awards })}
              addLabel="+ Add award"
            />

            <ListSectionEditor
              title="Volunteer Experience"
              items={resume.volunteerExperience}
              dateRange
              fields={[
                { key: "organization", label: "Organization" },
                { key: "role", label: "Role" },
                { key: "description", label: "Description", type: "textarea", span2: true },
              ]}
              onChange={(volunteerExperience) => update({ volunteerExperience })}
              addLabel="+ Add volunteer experience"
            />

            <StringListEditor
              title="Interests"
              items={resume.interests}
              onChange={(interests) => update({ interests })}
              placeholder="e.g. Chess — press Enter"
            />

            <ListSectionEditor
              title="References"
              items={resume.references}
              fields={[
                { key: "name", label: "Name" },
                { key: "relationship", label: "Relationship" },
                { key: "email", label: "Email" },
                { key: "phone", label: "Phone" },
              ]}
              onChange={(references) => update({ references })}
              addLabel="+ Add reference"
            />
          </div>

          {/* Live preview column — this is what prints and what the PDF mirrors */}
          <div>
            <h3 className="no-print">Live preview</h3>
            <div id="resume-print-area" className="card" style={{ padding: 0, overflow: "hidden" }}>
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          nav, footer { display: none !important; }
          .resume-editor-grid { display: block !important; }
          #resume-print-area { box-shadow: none !important; border: none !important; }
        }
        @media (max-width: 900px) {
          .resume-editor-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
