"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import * as analyzerApi from "@/lib/api/analyzer";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumBadge from "@/components/premium/PremiumBadge";
import StateBlock from "@/components/ui/StateBlock";
import { SkeletonLine } from "@/components/ui/Skeleton";
import styles from "@/components/career/AITools.module.css";

function ScoreGauge({ score }) {
  const color = score >= 80 ? "var(--color-success)" : score >= 60 ? "#d97706" : "var(--color-danger)";
  return (
    <div className={styles.scoreGauge} style={{ "--score": score, "--score-color": color }}>
      <div className={styles.scoreGaugeInner}>
        <span className={styles.scoreGaugeValue}>{score}</span>
        <span className={styles.scoreGaugeLabel}>ATS Score</span>
      </div>
    </div>
  );
}

function ReportView({ report }) {
  return (
    <div className={`card ${styles.sectionGap}`} style={{ padding: "var(--space-lg)" }}>
      <div className={styles.scoreHeader}>
        <ScoreGauge score={report.atsScore} />
        <div className={styles.scoreMeta}>
          <h3>{report.fileName}</h3>
          <p className={styles.scoreMetaDate}>Analyzed {new Date(report.createdAt).toLocaleString()}</p>
        </div>
      </div>

      <div className={styles.resultGrid}>
        <div className={styles.resultCard}>
          <span className="eyebrow">Sections</span>
          <h4 className={styles.sectionGap} style={{ marginTop: "var(--space-sm)" }}>
            Detected
          </h4>
          <div className={styles.chipRow}>
            {report.sectionAnalysis.present.length > 0 ? (
              report.sectionAnalysis.present.map((section) => (
                <span key={section} className="badge badge-success">
                  ✔ {section}
                </span>
              ))
            ) : (
              <span className={styles.mutedNote}>None detected</span>
            )}
          </div>
          {report.sectionAnalysis.missing.length > 0 && (
            <>
              <h4 style={{ marginTop: "var(--space-md)" }}>Missing</h4>
              <div className={styles.chipRow}>
                {report.sectionAnalysis.missing.map((section) => (
                  <span key={section} className="badge badge-warning">
                    {section}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        <div className={styles.resultCard}>
          <span className="eyebrow">Skills</span>
          <h4 style={{ marginTop: "var(--space-sm)" }}>Detected in your resume</h4>
          <div className={styles.chipRow}>
            {report.detectedSkills.length > 0 ? (
              report.detectedSkills.map((s) => (
                <span key={s.name} className="badge badge-accent">
                  {s.name}
                </span>
              ))
            ) : (
              <span className={styles.mutedNote}>None detected</span>
            )}
          </div>
          {report.missingSkills.length > 0 && (
            <>
              <h4 style={{ marginTop: "var(--space-md)" }}>In-demand skills not found</h4>
              <div className={styles.chipRow}>
                {report.missingSkills.map((s) => (
                  <span key={s.name} className="tag">
                    {s.name}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {report.formattingIssues.length > 0 && (
        <div className={styles.resultCard} style={{ marginTop: "var(--space-md)" }}>
          <span className="eyebrow">Formatting</span>
          <h4 style={{ marginTop: "var(--space-sm)" }}>Issues to fix</h4>
          <ul className={styles.bulletList}>
            {report.formattingIssues.map((issue, i) => (
              <li key={i} className={styles.bulletItem}>
                <span aria-hidden="true">⚠</span>
                <span>{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {report.suggestions.length > 0 && (
        <div className={styles.resultCard} style={{ marginTop: "var(--space-md)" }}>
          <span className="eyebrow">Suggestions</span>
          <h4 style={{ marginTop: "var(--space-sm)" }}>Ways to improve</h4>
          <ul className={styles.bulletList}>
            {report.suggestions.map((suggestion, i) => (
              <li key={i} className={styles.bulletItem}>
                <span aria-hidden="true">→</span>
                <span>{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className={styles.mutedNote} style={{ marginTop: "var(--space-md)" }}>
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
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

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

  const analyzeFile = useCallback(
    async (file) => {
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
      }
    },
    [loadHistory],
  );

  async function handleFileChange(event) {
    const file = event.target.files?.[0];
    await analyzeFile(file);
    event.target.value = "";
  }

  function handleDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    if (isUploading) return;
    const file = event.dataTransfer.files?.[0];
    analyzeFile(file);
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
          <div className={styles.hero}>
            <div className={styles.heroInner}>
              <span className="eyebrow">
                <span className="dot dot--pulse" />
                Resume Analyzer
              </span>
              <div className={styles.heroTitleRow}>
                <h1>Check your resume against real job-market demand</h1>
                <PremiumBadge feature="resumeAnalyzer" />
              </div>
              <p className={styles.heroDescription}>
                Upload a PDF or DOCX resume for an automated ATS-style check and skill-gap comparison.
              </p>
            </div>
          </div>

          <div
            className={`${styles.uploadZone} ${isUploading ? styles["uploadZone--busy"] : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              if (!isUploading) setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            style={isDragging ? { borderColor: "var(--color-accent)" } : undefined}
          >
            <span className={styles.uploadIcon} aria-hidden="true">
              {isUploading ? "⏳" : "📄"}
            </span>
            <span className={styles.uploadTitle}>
              {isUploading ? "Analyzing your resume…" : "Drop your resume here, or click to browse"}
            </span>
            <span className={styles.uploadHint}>PDF or DOCX, up to a few MB</span>
            <label className="btn btn-primary" style={{ cursor: "pointer", marginTop: "var(--space-sm)" }}>
              {isUploading ? "Analyzing…" : "Choose file"}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                onChange={handleFileChange}
                disabled={isUploading}
                style={{ display: "none" }}
              />
            </label>
          </div>

          {isUploading && (
            <div className={styles.loadingCard}>
              <div className={styles.loadingHeader}>
                <span className={styles.loadingSpinner} aria-hidden="true" />
                <span className={styles.loadingLabel}>Analyzing your resume…</span>
              </div>
              <SkeletonLine width="60%" height="1.25rem" />
              <SkeletonLine width="90%" />
              <SkeletonLine width="80%" />
            </div>
          )}

          {error && (
            <p className={styles.errorText} role="alert">
              <span aria-hidden="true">⚠</span> {error}
            </p>
          )}

          {activeReport && <ReportView report={activeReport} />}

          <h2 style={{ marginTop: "var(--space-2xl)" }}>History</h2>
          {history === null ? (
            <div className={styles.historyGrid} style={{ marginTop: "var(--space-md)" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} className="card" style={{ padding: "var(--space-md)" }}>
                  <SkeletonLine width="70%" height="1.1rem" />
                  <SkeletonLine width="45%" />
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <StateBlock
              icon="📄"
              title="No past analyses yet"
              description="Upload a resume above to see your ATS score, detected skills, and improvement suggestions here."
            />
          ) : (
            <div className={styles.historyGrid}>
              {history.map((item) => (
                <button key={item._id} type="button" className={styles.historyRow} onClick={() => viewPastReport(item._id)}>
                  <span>{item.fileName}</span>
                  <span className={styles.historyRowMeta}>
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
