import { authFetch } from "./authClient";

/**
 * AI Mock Interview — text-only, JSON.
 * Backend: POST /api/ai/mock-interview/start (src/routes/ai/mockInterview.routes.js)
 * Body: { jobTitle, experienceLevel, interviewType: "technical"|"hr"|"behavioral", skills, resumeText }
 * Requires auth; subject to usage limits (429 when exhausted).
 */
export const startMockInterview = ({ jobTitle, experienceLevel, interviewType, skills, resumeText }) =>
  authFetch("/ai/mock-interview/start", {
    method: "POST",
    body: { jobTitle, experienceLevel, interviewType, skills, resumeText },
  });
