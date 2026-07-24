"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import * as coverLettersApi from "@/lib/api/coverLetters";
import StateBlock from "@/components/ui/StateBlock";
import AILoadingState from "@/components/career/AILoadingState";

const AUTOSAVE_DELAY_MS = 1000;

async function downloadLetterPdf(letter) {
  const { pdf, Document, Page, Text, StyleSheet } = await import("@react-pdf/renderer");
  const styles = StyleSheet.create({
    page: { padding: 50, fontSize: 11, fontFamily: "Helvetica", lineHeight: 1.5 },
    paragraph: { marginBottom: 10 },
  });
  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        {letter.content.split("\n\n").map((paragraph, i) => (
          <Text key={i} style={styles.paragraph}>
            {paragraph}
          </Text>
        ))}
      </Page>
    </Document>
  );
  const blob = await pdf(doc).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${(letter.title || "cover-letter").replace(/[^a-z0-9-_]+/gi, "-")}.pdf`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export default function CoverLetterEditorPage() {
  const { id } = useParams();
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  const [letter, setLetter] = useState(null);
  const [error, setError] = useState("");
  const [saveState, setSaveState] = useState("idle");
  const [isDownloading, setIsDownloading] = useState(false);
  const saveTimeoutRef = useRef(null);
  const lastSavedRef = useRef(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    coverLettersApi
      .getCoverLetter(id)
      .then((data) => {
        setLetter(data);
        lastSavedRef.current = JSON.stringify({ title: data.title, content: data.content });
      })
      .catch((err) => setError(err.message || "Couldn't load this cover letter."));
  }, [id, user, authLoading, router]);

  const scheduleSave = useCallback(
    (patch) => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(async () => {
        const serialized = JSON.stringify(patch);
        if (serialized === lastSavedRef.current) return;
        setSaveState("saving");
        try {
          const saved = await coverLettersApi.updateCoverLetter(id, patch);
          lastSavedRef.current = JSON.stringify({ title: saved.title, content: saved.content });
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
    setLetter((prev) => {
      const next = { ...prev, ...patch };
      scheduleSave({ title: next.title, content: next.content });
      return next;
    });
  }

  async function handleDownload() {
    setIsDownloading(true);
    try {
      await downloadLetterPdf(letter);
    } finally {
      setIsDownloading(false);
    }
  }

  if (authLoading || !user) return null;
  if (error && !letter) {
    return (
      <section className="section">
        <div className="container">
          <StateBlock variant="error" icon="⚠️" title="Couldn't load this cover letter" description={error} />
        </div>
      </section>
    );
  }
  if (!letter) {
    return (
      <section className="section">
        <div className="container">
          <AILoadingState label="Loading your cover letter…" />
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <div className="ai-toolbar no-print">
          <input
            type="text"
            value={letter.title}
            onChange={(e) => update({ title: e.target.value })}
            className="ai-letter-title-input"
            aria-label="Cover letter title"
          />
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            <span
              className={`ai-save-indicator ${saveState === "saved" ? "ai-save-indicator--saved" : ""} ${saveState === "error" ? "ai-save-indicator--error" : ""}`}
              role="status"
              aria-live="polite"
            >
              {saveState === "saving" && "Saving…"}
              {saveState === "saved" && "All changes saved"}
              {saveState === "error" && "Auto-save failed"}
            </span>
            <button type="button" className="btn btn-secondary" onClick={() => window.print()}>
              Print
            </button>
            <button type="button" className="btn btn-primary" onClick={handleDownload} disabled={isDownloading}>
              {isDownloading ? "Generating…" : "Download PDF"}
            </button>
          </div>
        </div>

        {letter.job?.companyName && (
          <p className="no-print" style={{ color: "var(--color-text-muted)" }}>
            Tailored for {letter.job.title} at {letter.job.companyName}
          </p>
        )}

        <textarea
          value={letter.content}
          onChange={(e) => update({ content: e.target.value })}
          rows={22}
          className="card ai-letter-textarea"
          aria-label="Cover letter content"
        />
      </div>

      <style>{`
        @media print {
          .no-print { display: none !important; }
          nav, footer { display: none !important; }
          textarea { border: none !important; box-shadow: none !important; }
        }
      `}</style>
    </section>
  );
}
