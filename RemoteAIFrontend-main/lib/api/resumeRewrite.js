import { authFetch } from "./authClient";

/**
 * AI Resume Rewrite — text-only, JSON.
 * Backend: POST /api/ai/resume-rewrite/rewrite (src/routes/ai/resumeRewrite.routes.js)
 * Body: { resumeText: string, targetRole: string }
 * Requires auth; subject to usage limits (429 when exhausted).
 */
export const rewriteResume = ({ resumeText, targetRole }) =>
  authFetch("/ai/resume-rewrite/rewrite", {
    method: "POST",
    body: { resumeText, targetRole },
  });
