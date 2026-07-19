"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import * as analyzerApi from "@/lib/api/analyzer";

function ScoreBadge({ score }) {
  const color = score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626";
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: "2.5rem", fontWeight: 700, color }}>{score}</div>
      <div style={{ fontSize: "0.85em", color: "var(--color-text-muted, #666)" }}>ATS Score / 100</div>
    </div>
  );
}

function ReportView({ report }) {
  return (
    <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-lg)" }}>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap", alignItems: "center" }}>
        <ScoreBadge score={report.atsScore} />
        <div>
          <h3 style={{ margin: 0 }}>{report.fileName}</h3>
          <p style={{ margin: 0, color: "var(--color-text-muted, #666)" }}>
            Analyzed {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gap: "var(--space-md)", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", marginTop: "var(--space-lg)" }}>
        <div>
          <h4>Sections detected</h4>
          <p style={{ color: "#16a34a" }}>{report.sectionAnalysis.present.join(", ") || "None"}</p>
          {report.sectionAnalysis.missing.length > 0 && (
            <>
              <h4>Sections missing</h4>
              <p style={{ color: "#dc2626" }}>{report.sectionAnalysis.missing.join(", ")}</p>
            </>
          )}
        </div>

        <div>
          <h4>Detected skills</h4>
          <p>{report.detectedSkills.map((s) => s.name).join(", ") || "None detected"}</p>
          {report.missingSkills.length > 0 && (
            <>
              <h4>In-demand skills not found</h4>
              <p>{report.missingSkills.map((s) => s.name).join(", ")}</p>
            </>
          )}
        </div>
      </div>

      {report.formattingIssues.length > 0 && (
        <div style={{ marginTop: "var(--space-md)" }}>
          <h4>Formatting issues</h4>
          <ul>
            {report.formattingIssues.map((issue, i) => (
              <li key={i}>{issue}</li>
            ))}
          </ul>
        </div>
      )}

      {report.suggestions.length > 0 && (
        <div style={{ marginTop: "var(--space-md)" }}>
          <h4>Suggestions</h4>
          <ul>
            {report.suggestions.map((suggestion, i) => (
              <li key={i}>{suggestion}</li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ marginTop: "var(--space-md)", fontSize: "0.8em", color: "var(--color-text-muted, #666)" }}>
        This is an automated, rule-based analysis (keyword and section detection), not a human or
        AI-generated review — use it as a starting checklist, not a final judgment.
      </p>
    </div>
  );
}

export default function ResumeAnalyzerPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [history, setHistory] = useState(null);
  const [activeReport, setActiveReport] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const loadHistory = useCallback(async () => {
    try {
      setHistory(await analyzerApi.listAnalysisHistory());
    } catch (err) {
      setError(err.message || "Couldn't load your analysis history.");
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    loadHistory();
  }, [authLoading, user, router, loadHistory]);

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    setError("");
    try {
      const report = await analyzerApi.analyzeResumeFile(file);
      setActiveReport(report);
      await loadHistory();
    } catch (err) {
      setError(err.message || "Couldn't analyze that file.");
    } finally {
      setIsUploading(false);
      event.target.value = "";
    }
  }

  async function viewPastReport(id) {
    setError("");
    try {
      setActiveReport(await analyzerApi.getAnalysisReport(id));
    } catch (err) {
      setError(err.message || "Couldn't load that report.");
    }
  }

  if (authLoading || !user) return null;

  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">
          <span className="dot" />
          Resume Analyzer
        </span>
        <h1 style={{ marginTop: "var(--space-sm)" }}>Check your resume against real job-market demand</h1>
        <p>Upload a PDF or DOCX resume for an automated ATS-style check and skill-gap comparison.</p>

        <div className="card" style={{ padding: "var(--space-lg)", marginTop: "var(--space-md)" }}>
          <label className="btn btn-primary" style={{ cursor: "pointer", display: "inline-block" }}>
            {isUploading ? "Analyzing…" : "Upload resume (PDF or DOCX)"}
            <input
              type="file"
              accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              disabled={isUploading}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {error && <p style={{ color: "crimson", marginTop: "var(--space-sm)" }}>{error}</p>}

        {activeReport && <ReportView report={activeReport} />}

        <h2 style={{ marginTop: "var(--space-xl)" }}>History</h2>
        {history === null ? (
          <p>Loading…</p>
        ) : history.length === 0 ? (
          <p>No past analyses yet.</p>
        ) : (
          <div style={{ display: "grid", gap: "0.5rem" }}>
            {history.map((item) => (
              <button
                key={item._id}
                type="button"
                className="card"
                onClick={() => viewPastReport(item._id)}
                style={{ padding: "var(--space-sm) var(--space-md)", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between" }}
              >
                <span>{item.fileName}</span>
                <span>
                  {item.atsScore}/100 · {new Date(item.createdAt).toLocaleDateString()}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
