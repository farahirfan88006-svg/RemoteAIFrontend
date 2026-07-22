/**
 * Mock AI Career Coach "engine" — Phase 2 is frontend-only with no
 * backend AI call, so this builds a realistic-looking roadmap from the
 * form inputs using plain heuristics (experience-band lookups + simple
 * skill-gap diffing), not a real model. Structured so a later phase
 * can swap this module's internals for a real API call without
 * touching the page or components that consume it — callers only see
 * `buildRoadmap(input) -> roadmap shape`.
 */

// Skills a target role commonly expects, used only to compute a
// plausible "skills to develop" gap list against what the person
// already entered — not an exhaustive taxonomy, just enough per role
// family to make the mock output feel tailored instead of generic.
const ROLE_SKILL_LIBRARY = {
  "frontend engineer": ["TypeScript", "React", "Testing (Jest/RTL)", "Web performance", "Accessibility (a11y)"],
  "backend engineer": ["System design", "Distributed systems", "SQL & database design", "API design", "Observability"],
  "full stack engineer": ["System design", "TypeScript", "CI/CD", "Cloud infrastructure (AWS/GCP)", "Testing strategy"],
  "engineering manager": ["1:1 coaching", "Roadmapping", "Cross-team communication", "Performance reviews", "Hiring & interviewing"],
  "product manager": ["Product analytics", "Roadmapping", "Stakeholder communication", "User research", "Prioritization frameworks"],
  "data scientist": ["Statistical modeling", "SQL", "ML pipelines", "Experimentation (A/B testing)", "Data storytelling"],
  "designer": ["Design systems", "User research", "Prototyping", "Accessibility", "Cross-functional collaboration"],
  default: ["System design", "Communication & leadership", "Domain expertise", "Mentorship", "Technical writing"],
};

function normalizeRole(role) {
  return (role || "").trim().toLowerCase();
}

function skillLibraryFor(targetRole) {
  const key = normalizeRole(targetRole);
  const match = Object.keys(ROLE_SKILL_LIBRARY).find((k) => k !== "default" && key.includes(k));
  return ROLE_SKILL_LIBRARY[match || "default"];
}

function experienceBand(years) {
  const n = Number(years);
  if (!Number.isFinite(n) || n < 2) return "early-career";
  if (n < 5) return "mid-level";
  if (n < 9) return "senior";
  return "leadership-track";
}

const TIMELINE_BY_BAND = {
  "early-career": "9–12 months",
  "mid-level": "6–9 months",
  senior: "6–8 months",
  "leadership-track": "4–6 months",
};

/**
 * @param {object} input
 * @param {string} input.currentRole
 * @param {string|number} input.yearsExperience
 * @param {string} input.targetRole
 * @param {string[]} input.skills - skills the person already listed
 * @param {string} input.country
 * @returns {object} roadmap
 */
export function buildRoadmap(input) {
  const currentRole = input.currentRole?.trim() || "your current role";
  const targetRole = input.targetRole?.trim() || "your target role";
  const country = input.country?.trim() || "your region";
  const knownSkills = (input.skills || []).map((s) => s.trim()).filter(Boolean);
  const band = experienceBand(input.yearsExperience);

  const targetSkillLibrary = skillLibraryFor(targetRole);
  const knownLower = knownSkills.map((s) => s.toLowerCase());
  const skillGaps = targetSkillLibrary.filter((skill) => !knownLower.some((k) => skill.toLowerCase().includes(k) || k.includes(skill.toLowerCase())));

  const timeline = TIMELINE_BY_BAND[band];

  const milestones = [
    {
      phase: "Phase 1",
      timeframe: "Weeks 1–4",
      title: "Close the highest-impact skill gaps",
      description: `Focus on the skills employers hiring for "${targetRole}" screen for first.`,
      actions: [
        `Pick 1–2 skills from your gap list below and complete a focused project using them.`,
        `Update your resume headline to point at "${targetRole}" instead of "${currentRole}".`,
        "Ask 2–3 people already in the target role for a 20-minute informational chat.",
      ],
      skillsToLearn: skillGaps.slice(0, 2).length ? skillGaps.slice(0, 2) : targetSkillLibrary.slice(0, 2),
    },
    {
      phase: "Phase 2",
      timeframe: "Months 2–3",
      title: "Build visible proof of the transition",
      description: "Turn new skills into something a hiring manager can see, not just a bullet point.",
      actions: [
        "Ship one portfolio project or internal initiative that demonstrates the target role's core skill.",
        "Get your resume analyzed and tightened for the new target role.",
        `Start applying selectively to "${targetRole}" openings in ${country} to calibrate your gap in real feedback.`,
      ],
      skillsToLearn: skillGaps.slice(2, 4).length ? skillGaps.slice(2, 4) : targetSkillLibrary.slice(2, 4),
    },
    {
      phase: "Phase 3",
      timeframe: `Remaining runway (target: ${timeline})`,
      title: "Convert interviews into offers",
      description: "Shift from learning mode to interview performance and negotiation.",
      actions: [
        "Run 2–3 mock interviews focused on the target role's most common question types.",
        "Prepare 3 stories (STAR format) that map your current experience directly onto the target role.",
        "Set a target compensation band for the role in your market before your first offer conversation.",
      ],
      skillsToLearn: skillGaps.slice(4).length ? skillGaps.slice(4) : [],
    },
  ];

  return {
    currentRole,
    targetRole,
    country,
    experienceBand: band,
    estimatedTimeline: timeline,
    summary: `Moving from ${currentRole} to ${targetRole} is a realistic ${timeline} transition at your experience level. The fastest path is closing the ${
      skillGaps.length || targetSkillLibrary.length
    } skill gaps below while building visible proof you can already operate at that level.`,
    skillGaps: skillGaps.length ? skillGaps : targetSkillLibrary,
    milestones,
  };
}
