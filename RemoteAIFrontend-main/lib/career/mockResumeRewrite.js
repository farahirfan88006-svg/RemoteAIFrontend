/**
 * Mock AI Resume Rewrite "engine" — same spirit as mockCareerCoach.js:
 * heuristic transforms over the pasted text, not a real model call.
 * Produces an "improved" version plus a change summary so the UI can
 * show Original → Improved → Summary, without inventing facts about
 * the person's actual career.
 *
 * Regex patterns are defined once but every match/replace/test call
 * below builds a fresh RegExp instance from `.source`/`.flags` rather
 * than reusing the shared object directly — a `g`-flagged RegExp is
 * stateful (`.test()`/`.exec()` advance `lastIndex`), and reusing one
 * instance across many lines in a loop silently skips matches. Fresh
 * instances per call sidestep that entirely.
 */

const WEAK_OPENERS = [
  { pattern: /responsible for/gi, replacement: "Led" },
  { pattern: /worked on/gi, replacement: "Delivered" },
  { pattern: /helped with/gi, replacement: "Contributed to" },
  { pattern: /in charge of/gi, replacement: "Owned" },
  { pattern: /tasked with/gi, replacement: "Drove" },
];

const FILLER_PHRASES = [/very\s+/gi, /really\s+/gi, /basically\s+/gi, /just\s+/gi];

function fresh(regex) {
  return new RegExp(regex.source, regex.flags);
}

function splitIntoLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

function strengthenLine(line) {
  let result = line;
  let openerSwapped = false;

  for (const { pattern, replacement } of WEAK_OPENERS) {
    if (fresh(pattern).test(result)) {
      result = result.replace(fresh(pattern), replacement);
      openerSwapped = true;
    }
  }

  let fillerRemoved = false;
  for (const pattern of FILLER_PHRASES) {
    if (fresh(pattern).test(result)) {
      result = result.replace(fresh(pattern), "");
      fillerRemoved = true;
    }
  }

  // Bullet lines that describe work but have no visible number get a
  // bracketed prompt rather than an invented metric — never fabricate
  // a statistic the person didn't provide.
  const looksLikeBullet = /^[-•*]|^\d+\./.test(line) || line.length > 25;
  const hasNumber = /\d/.test(result);
  let quantifyPrompt = false;
  if (looksLikeBullet && !hasNumber && result.length > 20) {
    result = `${result} [add a metric: %, $, time saved, or scale]`;
    quantifyPrompt = true;
  }

  return { result, changed: openerSwapped || fillerRemoved || quantifyPrompt };
}

/**
 * @param {string} originalText - raw pasted resume text
 * @returns {{ improved: string, changes: string[], stats: { linesChanged: number, totalLines: number } }}
 */
export function rewriteResume(originalText) {
  const lines = splitIntoLines(originalText);
  let linesChanged = 0;
  let anyOpenerSwapped = false;
  let anyFillerRemoved = false;
  let anyQuantifyPrompt = false;

  const improvedLines = lines.map((line) => {
    const { result, changed } = strengthenLine(line);
    if (changed) linesChanged += 1;
    if (WEAK_OPENERS.some(({ pattern }) => fresh(pattern).test(line))) anyOpenerSwapped = true;
    if (FILLER_PHRASES.some((pattern) => fresh(pattern).test(line))) anyFillerRemoved = true;
    if (result.includes("[add a metric")) anyQuantifyPrompt = true;
    return result;
  });

  const changes = [];
  if (anyOpenerSwapped) {
    changes.push('Replaced passive phrasing ("responsible for", "worked on") with stronger action verbs ("Led", "Delivered").');
  }
  if (anyFillerRemoved) {
    changes.push('Removed filler words ("very", "really", "basically") that add length without adding information.');
  }
  if (anyQuantifyPrompt) {
    changes.push("Flagged bullet points with no measurable outcome — add a %, $, time, or scale figure where you can back it up.");
  }
  if (changes.length === 0) {
    changes.push("Your phrasing already reads as active and direct — no structural changes were needed on this pass.");
  }
  changes.push(
    "This is an automated, rule-based rewrite (word-choice and structure heuristics), not a human or true AI-generated review — verify every line still accurately reflects your experience before using it."
  );

  return {
    improved: improvedLines.join("\n"),
    changes,
    stats: { linesChanged, totalLines: lines.length },
  };
}
