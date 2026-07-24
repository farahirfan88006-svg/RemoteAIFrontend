"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";
import { useSavedJobs } from "@/lib/savedJobs/SavedJobsContext";
import { ApiError } from "@/lib/api/authClient";

/**
 * Save/unsave toggle for a job — sits beside ApplyButton on JobCard and
 * the job detail page. Client Component (needs auth state + click
 * handling), unlike the rest of JobCard, following the same
 * "one small client island inside an otherwise server-rendered card"
 * pattern as InterviewQuestionsPanel.js.
 *
 * Not logged in: renders a link to /login rather than a disabled
 * button, so the action is still discoverable and doesn't dead-end.
 *
 * @param {{ job: object, size?: "default"|"large" }} props
 */
export default function SaveJobButton({ job, size = "default" }) {
  const { user } = useAuth();
  const { isSaved, toggleSave } = useSavedJobs();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const jobId = job?.id || job?._id;
  if (!jobId) return null;

  const className = `btn btn-secondary${size === "large" ? " btn-lg" : ""}`;

  if (!user) {
    return (
      <Link href="/login" className={className} title="Log in to save this job">
        ☆ Save
      </Link>
    );
  }

  const saved = isSaved(jobId);

  async function handleClick() {
    if (isPending) return;
    setIsPending(true);
    setError("");
    try {
      await toggleSave(jobId);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Couldn't update saved jobs. Try again.");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <span>
      <button
        type="button"
        onClick={handleClick}
        disabled={isPending}
        className={className}
        aria-pressed={saved}
      >
        {saved ? "★ Saved" : "☆ Save"}
      </button>
      {error && <span role="alert"> {error}</span>}
    </span>
  );
}
