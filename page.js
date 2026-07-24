"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import * as analyzerApi from "@/lib/api/analyzer";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import ScoreBadge from "@/components/career/ScoreBadge";
import AILoadingState from "@/components/career/AILoadingState";
import StateBlock from "@/components/ui/StateBlock";

function ReportView({ report }) {
  return (
    <div className="card ai-panel" style={{ marginTop: "var(--space-lg)" }}>
      <div style={{ display: "flex", gap: "var(--space-lg)", flexWrap: "wrap", alignItems: "center" }}>
        <ScoreBadge score={report.atsScore} label="ATS Score / 100" />
        <div>
          <h3 style={{ margin: 0 }}>{report.fileName}</h3>
          <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
            Analyzed {new Date(report.createdAt).toLocaleString()}
          </p>
        </div>
      </div>

      <div className="ai-result-grid">
        <div>
          <h4>Sections detected</h4>
          <p style={{ color: "var(--color-success)" }}>{report.sectionAnalysis.present.join(", ") || "None"}</p>
          {report.sectionAnalysis.missing.length > 0 && (
            <>
              <h4>Sections missing</h4>
              <p style={{ color: "var(--color-danger)" }}>{report.sectionAnalysis.missing.join(", ")}</p>
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
          <ul className="ai-bullet-list">
            {report.formattingIssues.map((issue, i) => (
              <li key={i}>
                <span aria-hidden="true">•</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {report.suggestions.length > 0 && (
        <div style={{ marginTop: "var(--space-md)" }}>
          <h4>Suggestions</h4>
          <ul className="ai-bullet-list">
            {report.suggestions.map((suggestion, i) => (
              <li key={i}>
                <span aria-hidden="true">•</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p style={{ marginTop: "var(--space-md)", fontSize: "0.8em", color: "var(--color-text-muted)" }}>
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
    <PremiumRoute feature="resumeAnalyzer">
      <section className="section">
        <div className="container">
          <PremiumPageHeader
            eyebrow="Resume Analyzer"
            title="Check your resume against real job-market demand"
            description="Upload a PDF or DOCX resume for an automated ATS-style check and skill-gap comparison."
            feature="resumeAnalyzer"
          />

          <div className="card ai-panel">
            <label className="ai-upload-dropzone" style={{ cursor: isUploading ? "not-allowed" : "pointer" }}>
              <span aria-hidden="true" style={{ fontSize: "var(--fs-2xl)" }}>
                📄
              </span>
              <span className="btn btn-primary">{isUploading ? "Analyzing…" : "Upload resume (PDF or DOCX)"}</span>
              <span className="ai-upload-dropzone__hint">PDF or DOCX, up to your account&apos;s file size limit</span>
              <input
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                disabled={isUploading}
                style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden" }}
              />
            </label>
          </div>

          {error && (
            <p className="ai-error" role="alert">
              {error}
            </p>
          )}

          {isUploading && <AILoadingState label="Analyzing your resume…" />}

          {activeReport && <ReportView report={activeReport} />}

          <h2 className="ai-section-title">History</h2>
          {history === null ? (
            <AILoadingState label="Loading your analysis history…" />
          ) : history.length === 0 ? (
            <StateBlock icon="📄" title="No past analyses yet" description="Upload a resume above to run your first analysis." />
          ) : (
            <div className="ai-history-list">
              {history.map((item) => (
                <button key={item._id} type="button" className="card ai-history-item" onClick={() => viewPastReport(item._id)}>
                  <span>{item.fileName}</span>
                  <span className="ai-history-item__meta">
                    {item.atsScore}/100 · {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </PremiumRoute>
  );
}
