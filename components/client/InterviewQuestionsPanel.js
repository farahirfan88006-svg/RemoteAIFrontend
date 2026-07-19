"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { getInterviewQuestions } from "@/lib/api/jobs";
import { INTERVIEW_QUESTIONS_HASH } from "@/lib/jobs/constants";

// Fetched once as a full set (the existing API's pageSize param, unchanged
// contract) — search/filter/pagination/shuffle below all happen
// client-side over that set, rather than round-tripping to the server for
// every filter keystroke.
const FULL_FETCH_PAGE_SIZE = 200;
const DISPLAY_PAGE_SIZE = 8;

const SECTION_LABELS = { technical: "Technical", hr: "HR", behavioral: "Behavioral", coding: "Coding" };
const DIFFICULTY_COLOR = { beginner: "#16a34a", intermediate: "#d97706", advanced: "#dc2626" };

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

async function downloadQuestionsPdf(questions, jobTitle) {
  const { pdf, Document, Page, Text, View, StyleSheet } = await import("@react-pdf/renderer");

  const styles = StyleSheet.create({
    page: { padding: 40, fontSize: 10, fontFamily: "Helvetica" },
    heading: { fontSize: 16, marginBottom: 12 },
    section: { fontSize: 12, marginTop: 14, marginBottom: 4, fontWeight: 700 },
    question: { fontSize: 10.5, marginTop: 6, fontWeight: 700 },
    answer: { fontSize: 9.5, marginTop: 2, color: "#333" },
    difficulty: { fontSize: 8.5, color: "#666", marginTop: 1 },
  });

  const bySection = questions.reduce((acc, q) => {
    (acc[q.section] ||= []).push(q);
    return acc;
  }, {});

  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.heading}>Interview Questions — {jobTitle}</Text>
        {Object.entries(bySection).map(([section, items]) => (
          <View key={section}>
            <Text style={styles.section}>{SECTION_LABELS[section] || section}</Text>
            {items.map((q, i) => (
              <View key={i} style={{ marginBottom: 6 }}>
                <Text style={styles.question}>{q.question}</Text>
                <Text style={styles.difficulty}>Difficulty: {q.difficulty}</Text>
                <Text style={styles.answer}>{q.suggestedAnswer}</Text>
              </View>
            ))}
          </View>
        ))}
      </Page>
    </Document>
  );

  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `interview-questions-${(jobTitle || "job").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API can be denied/unavailable — fail silently rather
      // than throwing an error over a non-critical convenience action.
    }
  }
  return (
    <button type="button" className="btn btn-ghost" onClick={handleCopy} style={{ padding: "0.3rem 0.6rem", fontSize: "0.8em" }} aria-label="Copy question and answer">
      {copied ? "Copied ✓" : "Copy"}
    </button>
  );
}

/**
 * Interview Questions panel — reachable via the "Interview Questions"
 * button in the job page's action row (see app/jobs/[slug]/page.js), or
 * by navigating straight in with a `#interview-questions` hash (used by
 * the "🎯 Interview Questions" button on the /jobs listing's JobCard —
 * see components/server/JobCard.js), in which case it auto-loads and
 * scrolls itself into view on mount instead of waiting for a click.
 * Auto-loads for the current job (no slug/job selection needed).
 *
 * Search/filter/"Generate New Questions" all operate on a full fetch of
 * the EXISTING `/api/jobs/:slug/interview-questions` endpoint (just a
 * larger pageSize, same contract, no backend change) — search/filter
 * happen client-side, and "Generate New Questions" reshuffles/resamples
 * that same fixed pool rather than calling a different endpoint, since
 * the question bank itself is deterministic per job (see backend
 * ai/interviewQuestions.js) — documented here rather than silently
 * pretending every click invents entirely novel questions.
 */
export default function InterviewQuestionsPanel({ jobSlug, jobTitle }) {
  const [status, setStatus] = useState("idle"); // idle | loading | ready | error
  const [errorMessage, setErrorMessage] = useState("");
  const [allQuestions, setAllQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sectionFilter, setSectionFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);
  const panelRef = useRef(null);

  // Arriving via a `#interview-questions` deep link (e.g. the JobCard
  // button on /jobs) should behave like the user clicked the trigger
  // themselves: auto-load, then scroll the panel into view once it's
  // actually rendered. Runs once on mount per job page; the trigger
  // button below still works unchanged for everyone else.
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash === `#${INTERVIEW_QUESTIONS_HASH}`) {
      load();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      status === "ready" &&
      typeof window !== "undefined" &&
      window.location.hash === `#${INTERVIEW_QUESTIONS_HASH}` &&
      panelRef.current
    ) {
      panelRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  async function load({ reshuffle = false } = {}) {
    setStatus("loading");
    setErrorMessage("");
    try {
      const data = await getInterviewQuestions(jobSlug, { page: 1, pageSize: FULL_FETCH_PAGE_SIZE });
      setAllQuestions(reshuffle ? shuffle(data.questions) : data.questions);
      setPage(1);
      setStatus("ready");
    } catch (err) {
      setErrorMessage(err.message || "Couldn't generate interview questions.");
      setStatus("error");
    }
  }

  const availableSections = useMemo(
    () => Array.from(new Set(allQuestions.map((q) => q.section))),
    [allQuestions],
  );

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return allQuestions.filter((q) => {
      if (sectionFilter !== "all" && q.section !== sectionFilter) return false;
      if (!term) return true;
      return q.question.toLowerCase().includes(term) || q.suggestedAnswer.toLowerCase().includes(term);
    });
  }, [allQuestions, searchTerm, sectionFilter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / DISPLAY_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice((currentPage - 1) * DISPLAY_PAGE_SIZE, currentPage * DISPLAY_PAGE_SIZE);

  async function handleDownload() {
    setIsDownloading(true);
    try {
      await downloadQuestionsPdf(filtered.length > 0 ? filtered : allQuestions, jobTitle);
    } finally {
      setIsDownloading(false);
    }
  }

  if (status === "idle") {
    return (
      <button type="button" id="interview-questions-trigger" className="btn btn-secondary" onClick={() => load()}>
        🎯 Interview Questions
      </button>
    );
  }

  return (
    <div ref={panelRef} id="interview-questions" className="card" style={{ padding: "var(--space-lg)", scrollMarginTop: "calc(var(--nav-height) + 1rem)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
        <h3 style={{ margin: 0 }}>Interview Questions</h3>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button type="button" className="btn btn-ghost" onClick={() => load({ reshuffle: true })} disabled={status === "loading"}>
            🔄 Generate New Questions
          </button>
          {status === "ready" && (
            <button type="button" className="btn btn-secondary" onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? "Preparing…" : "Download PDF"}
            </button>
          )}
        </div>
      </div>

      {status === "loading" && <p style={{ marginTop: "var(--space-sm)" }}>Generating…</p>}
      {status === "error" && (
        <p style={{ color: "crimson", marginTop: "var(--space-sm)" }}>{errorMessage}</p>
      )}

      {status === "ready" && (
        <>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginTop: "var(--space-md)" }}>
            <input
              type="search"
              placeholder="Search questions…"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              style={{ flex: "1 1 200px", padding: "0.5rem" }}
              aria-label="Search interview questions"
            />
            <select
              value={sectionFilter}
              onChange={(e) => {
                setSectionFilter(e.target.value);
                setPage(1);
              }}
              style={{ padding: "0.5rem" }}
              aria-label="Filter by section"
            >
              <option value="all">All sections</option>
              {availableSections.map((section) => (
                <option key={section} value={section}>
                  {SECTION_LABELS[section] || section}
                </option>
              ))}
            </select>
          </div>

          {filtered.length === 0 ? (
            <p style={{ marginTop: "var(--space-md)", color: "var(--color-text-muted)" }}>
              No questions match your search/filter.
            </p>
          ) : (
            <div style={{ marginTop: "var(--space-md)", display: "grid", gap: "var(--space-sm)" }}>
              {pageItems.map((q, i) => (
                <div key={i} style={{ borderBottom: "1px solid var(--color-border)", paddingBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: "0.5rem", alignItems: "center" }}>
                    <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
                      <span className="tag">{SECTION_LABELS[q.section] || q.section}</span>
                      <span className={`badge badge-${q.difficulty === "advanced" ? "warning" : q.difficulty === "intermediate" ? "accent" : "success"}`}>
                        {q.difficulty}
                      </span>
                    </div>
                    <CopyButton text={`Q: ${q.question}\nA: ${q.suggestedAnswer}`} />
                  </div>
                  <p style={{ fontWeight: 600, margin: "0.4rem 0 0.2rem" }}>{q.question}</p>
                  <p style={{ margin: 0, fontSize: "0.9em", color: "var(--color-text-muted)" }}>{q.suggestedAnswer}</p>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div style={{ display: "flex", gap: "0.5rem", marginTop: "var(--space-md)", alignItems: "center" }}>
              <button type="button" className="btn btn-ghost" disabled={currentPage <= 1} onClick={() => setPage(currentPage - 1)}>
                ← Previous
              </button>
              <span style={{ fontSize: "0.85em" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button type="button" className="btn btn-ghost" disabled={currentPage >= totalPages} onClick={() => setPage(currentPage + 1)}>
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
