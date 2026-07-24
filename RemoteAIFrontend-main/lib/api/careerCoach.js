import { authFetch } from "./authClient";

/**
 * AI Career Coach — text-only, JSON.
 * Backend: POST /api/ai/career-coach/advice (src/routes/ai/careerCoach.routes.js)
 * Body: { careerGoal: string, currentSkills: string|string[], experience: string, targetRole: string }
 * Requires auth; subject to usage limits (429 when exhausted).
 */
export const getCareerAdvice = ({ careerGoal, currentSkills, experience, targetRole }) =>
  authFetch("/ai/career-coach/advice", {
    method: "POST",
    body: { careerGoal, currentSkills, experience, targetRole },
  });
