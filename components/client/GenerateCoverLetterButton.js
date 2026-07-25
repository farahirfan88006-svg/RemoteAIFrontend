"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import * as resumesApi from "@/lib/api/resumes";
import * as coverLettersApi from "@/lib/api/coverLetters";

/**
 * Job-specific Cover Letter generation (see ticket's "Job-Specific Cover
 * Letter" mode) — reuses the same `generateCoverLetter` endpoint/logic
 * the General mode (app/cover-letters/new/page.js) uses, just supplying
 * `jobSlug` so the backend tailors the letter to this job (see backend
 * ai/coverLetterGenerator.js). No separate "job cover letter" code path.
 */
export default function GenerateCoverLetterButton({ job }) {
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isWorking, setIsWorking] = useState(false);
  const [error, setError] = useState("");

  async function handleClick() {
    if (authLoading) return;
    if (!user) {
      router.push("/login");
      return;
    }

    setIsWorking(true);
    setError("");
    try {
      const resumes = await resumesApi.listResumes();
      if (resumes.length === 0) {
        router.push("/resumes");
        return;
      }
      const resume = resumes.find((r) => r.isDefault) || resumes[0];
      const letter = await coverLettersApi.generateCoverLetter({ resumeId: resume._id, jobSlug: job.slug });
      router.push(`/cover-letters/${letter._id}`);
    } catch (err) {
      setError(err.message || "Couldn't generate a cover letter.");
      setIsWorking(false);
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-secondary" onClick={handleClick} disabled={isWorking}>
        {isWorking ? "Generating…" : "Generate Cover Letter"}
      </button>
      {error && <p style={{ color: "crimson", fontSize: "0.85em", marginTop: "0.25rem" }}>{error}</p>}
    </div>
  );
}
