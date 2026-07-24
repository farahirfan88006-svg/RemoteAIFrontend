import { authFetch } from "./authClient";

/**
 * AI Job Match Score — text-only, JSON.
 * Backend: POST /api/ai/job-match-score/calculate (src/routes/ai/jobMatchScore.routes.js)
 * Body: { resumeText, jobDescription, skills, experience, education }
 * The score/matchedSkills/missingSkills/breakdown are always computed by a
 * deterministic backend algorithm; only the `insights` text may vary with
 * AI-provider availability. Requires auth; subject to usage limits (429 when exhausted).
 */
export const calculateJobMatchScore = ({ resumeText, jobDescription, skills, experience, education }) =>
  authFetch("/ai/job-match-score/calculate", {
    method: "POST",
    body: { resumeText, jobDescription, skills, experience, education },
  });
