"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import * as resumesApi from "@/lib/api/resumes";
import { SkeletonCardGrid } from "@/components/ui/Skeleton";
import StateBlock from "@/components/ui/StateBlock";

/**
 * The Resume Builder dashboard — every authenticated user's entry point
 * for creating, editing, duplicating, deleting, and setting a default
 * resume. Individual editing happens on /resumes/[id].
 */
export default function ResumesDashboardPage() {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [resumes, setResumes] = useState(null);
  const [error, setError] = useState("");
  const [pendingId, setPendingId] = useState(null);

  const loadResumes = useCallback(async () => {
    try {
      const data = await resumesApi.listResumes();
      setResumes(data);
    } catch (err) {
      setError(err.message || "Couldn't load your resumes.");
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    loadResumes();
  }, [authLoading, user, router, loadResumes]);

  async function handleCreate() {
    setError("");
    try {
      const resume = await resumesApi.createResume({ title: "Untitled Resume" });
      router.push(`/resumes/${resume._id}`);
    } catch (err) {
      setError(err.message || "Couldn't create a resume.");
    }
  }

  async function handleDuplicate(id) {
    setPendingId(id);
    setError("");
    try {
      await resumesApi.duplicateResume(id);
      await loadResumes();
    } catch (err) {
      setError(err.message || "Couldn't duplicate that resume.");
    } finally {
      setPendingId(null);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this resume? This can't be undone.")) return;
    setPendingId(id);
    setError("");
    try {
      await resumesApi.deleteResume(id);
      await loadResumes();
    } catch (err) {
      setError(err.message || "Couldn't delete that resume.");
    } finally {
      setPendingId(null);
    }
  }

  async function handleSetDefault(id) {
    setPendingId(id);
    setError("");
    try {
      await resumesApi.setDefaultResume(id);
      await loadResumes();
    } catch (err) {
      setError(err.message || "Couldn't set that as default.");
    } finally {
      setPendingId(null);
    }
  }

  if (authLoading || !user) return null;

  return (
    <section className="section">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "var(--space-md)" }}>
          <div>
            <span className="eyebrow">
              <span className="dot" />
              Resume Builder
            </span>
            <h1 style={{ marginTop: "var(--space-sm)" }}>Your resumes</h1>
          </div>
          <div style={{ display: "flex", gap: "var(--space-sm)" }}>
            <Link href="/resume-analyzer" className="btn btn-secondary">
              Analyze a resume
            </Link>
            <Link href="/resumes/generate" className="btn btn-secondary">
              Generate with AI
            </Link>
            <button type="button" className="btn btn-primary" onClick={handleCreate}>
              + New resume
            </button>
          </div>
        </div>

        {error && (
          <StateBlock variant="error" icon="⚠️" title="Something went wrong" description={error} />
        )}

        {resumes === null ? (
          <div style={{ marginTop: "var(--space-lg)" }}>
            <SkeletonCardGrid count={3} />
          </div>
        ) : resumes.length === 0 ? (
          <div style={{ marginTop: "var(--space-lg)" }}>
            <StateBlock
              icon="🗂️"
              title="No resumes yet"
              description="Create your first resume manually, or let AI generate one from the basics."
              action={
                <button type="button" className="btn btn-primary" style={{ marginTop: "var(--space-sm)" }} onClick={handleCreate}>
                  Create your first resume
                </button>
              }
            />
          </div>
        ) : (
          <div
            style={{
              marginTop: "var(--space-lg)",
              display: "grid",
              gap: "var(--space-md)",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {resumes.map((resume) => (
              <div key={resume._id} className="card" style={{ padding: "var(--space-md)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                  <h3 style={{ margin: 0 }}>{resume.title || "Untitled Resume"}</h3>
                  {resume.isDefault && <span className="tag">Default</span>}
                </div>
                <p style={{ color: "var(--color-text-muted, #666)", marginTop: "0.25rem" }}>
                  {resume.personalInfo?.fullName || "No name set"} · {resume.template}
                </p>
                <p style={{ fontSize: "0.85em", color: "var(--color-text-muted, #666)" }}>
                  Updated {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div style={{ marginTop: "var(--space-md)", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  <Link href={`/resumes/${resume._id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    disabled={pendingId === resume._id}
                    onClick={() => handleDuplicate(resume._id)}
                  >
                    Duplicate
                  </button>
                  {!resume.isDefault && (
                    <button
                      type="button"
                      className="btn btn-ghost"
                      disabled={pendingId === resume._id}
                      onClick={() => handleSetDefault(resume._id)}
                    >
                      Set as default
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-ghost"
                    disabled={pendingId === resume._id}
                    onClick={() => handleDelete(resume._id)}
                    style={{ color: "crimson" }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
