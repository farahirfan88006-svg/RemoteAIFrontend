/**
 * Mock AI Resume Match Score "engine" — keyword-overlap heuristic
 * between pasted resume text and a job description, not a real model
 * call. Same disclosed-as-automated approach as the other mock
 * engines in this folder and as the existing rule-based Resume
 * Analyzer (see app/resume-analyzer/page.js).
 */

const STOPWORDS = new Set(
  "a an the and or but for with to of in on at by is are was were be been being this that these those as it its from into your you we our their they he she will can may must should would could not no yes also etc using use used".split(
    " "
  )
);

// Keywords in the job description that don't add signal as "skills" —
// filtered out before computing missing-keyword suggestions.
const NOISE_WORDS = new Set("job description role responsibilities requirements qualifications team company years experience".split(" "));

function tokenize(text) {
  return (text || "")
    .toLowerCase()
    .replace(/[^a-z0-9+.#\s-]/g, " ")
    .split(/\s+/)
    .map((w) => w.trim())
    .filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

function extractKeywords(text, { max = 12 } = {}) {
  const counts = new Map();
  for (const word of tokenize(text)) {
    if (NOISE_WORDS.has(word)) continue;
    if (/^\d+$/.test(word)) continue;
    counts.set(word, (counts.get(word) || 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, max)
    .map(([word]) => word);
}

/**
 * @param {string} resumeText
 * @param {string} jobDescriptionText
 * @returns {{
 *   overallScore: number,
 *   skillsMatch: { skill: string, matched: boolean }[],
 *   missingKeywords: string[],
 *   recommendations: string[]
 * }}
 */
export function analyzeMatch(resumeText, jobDescriptionText) {
  const resumeWords = new Set(tokenize(resumeText));
  const jdKeywords = extractKeywords(jobDescriptionText, { max: 14 });

  const skillsMatch = jdKeywords.map((skill) => ({
    skill,
    matched: resumeWords.has(skill),
  }));

  const matchedCount = skillsMatch.filter((s) => s.matched).length;
  const overallScore = jdKeywords.length
    ? Math.round((matchedCount / jdKeywords.length) * 100)
    : 0;

  const missingKeywords = skillsMatch.filter((s) => !s.matched).map((s) => s.skill);

  const recommendations = [];
  if (missingKeywords.length > 0) {
    recommendations.push(
      `Add these terms where genuinely true of your experience: ${missingKeywords.slice(0, 6).join(", ")}.`
    );
  }
  if (overallScore < 50) {
    recommendations.push("Your resume and this job description share relatively few terms — consider whether this role is a close fit before applying, or reframe existing experience using the JD's own vocabulary.");
  } else if (overallScore < 80) {
    recommendations.push("Solid overlap. Mirror the job description's exact terminology (e.g. its tool/framework names) rather than close synonyms — ATS keyword matching is usually literal.");
  } else {
    recommendations.push("Strong overlap with this job description. Focus your cover letter on the 1–2 requirements you match least, since the resume already covers the rest.");
  }
  recommendations.push(
    "This is an automated keyword-overlap estimate, not a human or true AI-generated review — a low score doesn't mean you're unqualified, and a high score doesn't guarantee an interview."
  );

  return { overallScore, skillsMatch, missingKeywords, recommendations };
}
