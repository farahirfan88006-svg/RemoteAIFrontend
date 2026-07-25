/**
 * Hand-written SEO content for the site's AI tool pages (career coach,
 * mock interview, match score, resume rewrite, resume analyzer, resume
 * builder). Same pattern and rationale as lib/seo/categoryIntros.js:
 * curated, unique copy per page rather than a shared template, kept in
 * one data file so each page.js/layout.js stays focused on wiring
 * metadata/schema rather than holding long paragraphs inline.
 *
 * `relatedJobLinks` feeds the existing <RelatedLinks seoLinks={...} />
 * component (see components/server/RelatedLinks.js) so each tool page
 * links back into a couple of relevant job-category SEO pages — reusing
 * that component rather than building a second internal-linking system.
 */
export const TOOL_CONTENT = {
  "resume-builder": {
    keywords: ["ai resume builder", "free ai resume builder", "ats resume builder", "remote resume builder"],
    intro: `Most resumes get filtered by an applicant tracking system (ATS) before a human ever reads them, and generic templates built for in-office roles often don't emphasize what remote hiring managers actually screen for — async communication, self-direction, and results that are easy to verify without daily in-person check-ins. RemoteAI's free AI resume builder is built specifically around that gap: it turns your experience into a clean, ATS-friendly resume structured the way remote-first companies actually read them.

The builder asks for your real work history and experience, then helps you phrase it in the language that gets past both the initial ATS keyword scan and the human reviewer after it — clear, quantified outcomes instead of vague responsibility lists. Because it's tuned for remote hiring specifically, it also helps surface the details that matter more in a distributed role: tools you've used for async collaboration, time zones you've worked across, and evidence you can operate independently without needing constant oversight.

It's free to generate your first ATS-optimized resume, and every export is formatted to stay readable by both machines and people — no dense graphics or columns that confuse an ATS parser, just a clean structure that highlights what remote employers are actually scanning for.`,
    faqs: [
      {
        question: "Is RemoteAI's AI resume builder free to use?",
        answer:
          "Yes, generating your first ATS-optimized resume with the builder is free — you can create and export a resume without a paid plan.",
      },
      {
        question: "Will an AI-built resume actually pass an ATS scan?",
        answer:
          "The builder is specifically designed to produce ATS-friendly formatting and phrasing — clean structure without dense graphics or columns that confuse a parser, plus keyword and outcome phrasing tuned to pass both the automated scan and the human review after it.",
      },
      {
        question: "How is this different from a generic resume builder?",
        answer:
          "It's built specifically around remote hiring — helping you surface the details remote employers screen for, like async collaboration tools, time zone overlap, and evidence of working independently, rather than assuming an in-office context.",
      },
      {
        question: "Can I edit the resume after the AI generates it?",
        answer:
          "Yes — the generated resume is a starting point you can review and refine before exporting, rather than a locked, unchangeable output.",
      },
    ],
    relatedJobLinks: [
      { name: "Remote AI Jobs", href: "/remote-ai-jobs" },
      { name: "Remote Developer Jobs", href: "/remote-developer-jobs" },
      { name: "Remote Marketing Jobs", href: "/remote-marketing-jobs" },
      { name: "All Remote Jobs", href: "/jobs" },
    ],
  },

  "resume-analyzer": {
    keywords: ["ai resume analyzer", "ats resume checker", "resume score ai", "free resume checker"],
    intro: `Before you send a resume out to another remote job posting, it's worth knowing whether it will actually clear the applicant tracking system standing between you and a human reviewer. RemoteAI's AI resume analyzer scans your existing resume the same way an ATS does, then gives you a clear score along with specific, actionable feedback — not just a pass/fail signal, but what's actually holding the score down.

The analyzer checks the things that most commonly sink an otherwise-strong resume: formatting an ATS can't parse correctly, missing keywords relevant to the roles you're targeting, vague or unquantified bullet points, and structural issues like inconsistent dates or buried contact information. Because it's built into a platform focused on remote hiring specifically, it also flags where a resume reads like it was written for an in-office role — missing the signals of independence, async communication, and measurable output that remote hiring managers tend to look for first.

Instead of guessing why applications are going unanswered, you get a concrete resume score and a prioritized list of fixes, so the next version of your resume is measurably stronger rather than just different.`,
    faqs: [
      {
        question: "How does the AI resume analyzer calculate my resume score?",
        answer:
          "It checks the resume the way an ATS would — parseable formatting, relevant keywords, and clear structure — combined with an assessment of how well your bullet points communicate quantified, verifiable outcomes.",
      },
      {
        question: "Is the resume analyzer free to use?",
        answer:
          "You can run your resume through the analyzer and get a score and feedback without needing to build a new resume from scratch first.",
      },
      {
        question: "What's the difference between the resume analyzer and the resume builder?",
        answer:
          "The analyzer scores and gives feedback on a resume you already have; the resume builder generates a new ATS-optimized resume for you from your work history if you're starting from scratch.",
      },
      {
        question: "Why did my resume get a low ATS score even though I have relevant experience?",
        answer:
          "Low scores usually come from formatting an ATS can't parse (like tables, columns, or graphics), missing role-relevant keywords, or vague bullet points without measurable outcomes — the analyzer flags which of these is actually the issue.",
      },
    ],
    relatedJobLinks: [
      { name: "Remote AI Jobs", href: "/remote-ai-jobs" },
      { name: "Remote Data Analyst Jobs", href: "/remote-data-analyst-jobs" },
      { name: "Remote Writing Jobs", href: "/remote-writing-jobs" },
      { name: "All Remote Jobs", href: "/jobs" },
    ],
  },

  "mock-interview": {
    keywords: ["ai mock interview", "interview practice ai", "remote job interview practice"],
    intro: `Remote interviews come with their own particular pressure — you're often being assessed on video for how clearly you communicate async, not just what you say, and there's no in-person rapport to fall back on if an answer gets off to a rocky start. RemoteAI's AI mock interview tool lets you practice against realistic questions for the specific type of role you're targeting, with instant feedback on your answers instead of waiting for a real interview to find out what needs work.

The practice sessions cover both the technical and behavioral sides of a remote interview: role-specific technical questions where relevant, plus the questions remote-hiring managers ask more often than most — how you handle ambiguity without a manager nearby, how you stay accountable without daily check-ins, and how you communicate progress across time zones. After each answer, you get feedback aimed at making the next attempt sharper, so you walk into the real interview having already worked through the rough patches.

It's a low-stakes way to build the specific muscle remote interviews require — clear, structured answers delivered on camera — before it counts.`,
    faqs: [
      {
        question: "Does the AI mock interview ask questions specific to my target role?",
        answer:
          "Yes — practice sessions are built around the type of role you're preparing for, covering relevant technical questions where applicable alongside the behavioral questions common in remote interviews.",
      },
      {
        question: "What kind of feedback does the AI mock interview give?",
        answer:
          "You get feedback on each answer aimed at making your response clearer and more structured, so you can identify weak points before a real interview rather than during one.",
      },
      {
        question: "Why do remote job interviews ask different questions than in-office interviews?",
        answer:
          "Remote hiring managers tend to weight questions about handling ambiguity independently, staying accountable without in-person oversight, and communicating clearly across time zones more heavily than a typical in-office interview would.",
      },
      {
        question: "How many times can I practice with the AI mock interview?",
        answer:
          "You can run through practice sessions repeatedly to work through different question types and refine your answers before a real interview.",
      },
    ],
    relatedJobLinks: [
      { name: "Remote Developer Jobs", href: "/remote-developer-jobs" },
      { name: "Remote AI Jobs", href: "/remote-ai-jobs" },
      { name: "Remote QA Testing Jobs", href: "/remote-qa-testing-jobs" },
      { name: "All Remote Jobs", href: "/jobs" },
    ],
  },

  "career-coach": {
    keywords: ["ai career coach", "career advice ai", "remote career coaching", "career roadmap ai"],
    intro: `Figuring out the next step in a remote career is harder without a manager or mentor down the hall to bounce ideas off — RemoteAI's AI career coach is built to fill that gap with a personalized roadmap instead of generic advice. Tell it where you are now and where you want to go, and it maps out the specific skill gaps, milestones, and a realistic timeline to close the distance, tuned to the remote job market rather than a one-size-fits-all career framework.

Because it's grounded in what remote-first companies are actually hiring for, the guidance goes beyond generic "learn more skills" advice — it points at the specific gaps between your current experience and the roles you're targeting, and sequences them into a plan you can actually follow, rather than an overwhelming list. That's especially useful in fields like AI, data, and engineering where the skill landscape shifts quickly enough that generic career advice ages fast.

Whether you're aiming to move from an in-office role into fully remote work, level up within a remote career track, or pivot into a new field entirely, the AI career coach gives you a concrete, personalized plan instead of another generic checklist.`,
    faqs: [
      {
        question: "How does the AI career coach build my roadmap?",
        answer:
          "It takes your current experience and target role, identifies the specific skill gaps between the two, and sequences them into milestones with a realistic timeline rather than a generic list of advice.",
      },
      {
        question: "Is the AI career coach specific to remote jobs?",
        answer:
          "Yes — the guidance is grounded in what remote-first companies are actually hiring for, rather than general career advice that doesn't account for the remote job market specifically.",
      },
      {
        question: "Can the AI career coach help me switch careers, not just advance in my current one?",
        answer:
          "Yes — it can map a roadmap for pivoting into a new field, not just leveling up within your current track, based on the gap between your existing experience and the new target role.",
      },
      {
        question: "Is the AI career coach a premium feature?",
        answer:
          "Career coaching is one of RemoteAI's premium tools — check the pricing page for current plan details.",
      },
    ],
    relatedJobLinks: [
      { name: "Remote AI Jobs", href: "/remote-ai-jobs" },
      { name: "Remote Data Analyst Jobs", href: "/remote-data-analyst-jobs" },
      { name: "Remote DevOps Jobs", href: "/remote-devops-jobs" },
      { name: "All Remote Jobs", href: "/jobs" },
    ],
  },

  "match-score": {
    keywords: ["job match score ai", "resume job match", "ai job fit checker"],
    intro: `Applying to remote jobs at scale often means guessing which listings are actually worth the time — Match Score removes the guesswork by comparing your profile directly against a specific job listing and giving you a clear score for how well you fit before you spend time on an application. Instead of skimming a job description and hoping your background lines up, you get a direct, listing-by-listing read on fit.

The score looks at the same signals a hiring manager would weigh first — relevant skills and experience, seniority alignment, and role-specific requirements — and surfaces where your profile is a strong match versus where there's a real gap worth addressing before you apply. That's especially useful when a listing looks appealing on the surface but the actual requirements skew more senior or more specialized than your current background.

Used alongside the resume builder and analyzer, Match Score helps you prioritize applications strategically: spend your effort on the listings where you're already a strong fit, and use the gap analysis on the rest to decide whether it's worth tailoring your resume or moving on to a better-matched opening.`,
    faqs: [
      {
        question: "How is Match Score calculated?",
        answer:
          "It compares your profile — skills, experience, and seniority — against a specific job listing's stated requirements to produce a fit score, the same core signals a hiring manager would weigh first.",
      },
      {
        question: "Should I still apply to a job with a low Match Score?",
        answer:
          "A low score points to a real gap worth reviewing before you apply — sometimes it's worth tailoring your resume to close it, and sometimes it's a signal the role skews more senior or specialized than your current background.",
      },
      {
        question: "Does Match Score work with any job listing on RemoteAI?",
        answer:
          "Yes — it's designed to score your profile against individual listings on the platform so you can prioritize which ones are worth applying to first.",
      },
      {
        question: "How is Match Score different from the AI Resume Analyzer?",
        answer:
          "The Resume Analyzer scores your resume against general ATS and quality standards; Match Score compares your profile specifically against one job listing's requirements.",
      },
    ],
    relatedJobLinks: [
      { name: "Remote Developer Jobs", href: "/remote-developer-jobs" },
      { name: "Remote Marketing Jobs", href: "/remote-marketing-jobs" },
      { name: "Remote Design Jobs", href: "/remote-design-jobs" },
      { name: "All Remote Jobs", href: "/jobs" },
    ],
  },

  "resume-rewrite": {
    keywords: ["ai resume rewrite", "resume rewriter ai", "rewrite resume for remote jobs"],
    intro: `A resume written for one role or one style of company often doesn't translate cleanly to another — language that reads well for an in-office position can undersell exactly the qualities remote hiring managers look for first. RemoteAI's AI resume rewrite tool takes an existing resume and rewrites it with sharper, more results-oriented language, tuned specifically for remote hiring.

Rather than starting from scratch, the tool works with what you already have — restructuring vague responsibility statements into clear, quantified outcomes, tightening language that's currently too dense or too vague to scan quickly, and adjusting the framing to highlight the independence and async-communication signals remote employers screen for. It's particularly useful when you're retargeting a resume that was built for an in-office role, or refreshing one that's grown cluttered after years of edits.

The result is a tighter, more targeted version of your existing resume — not a generic rewrite, but one shaped around what actually gets read favorably by both an ATS and a remote hiring manager.`,
    faqs: [
      {
        question: "What does the AI resume rewrite tool actually change?",
        answer:
          "It restructures vague responsibility statements into clear, quantified outcomes, tightens overly dense or unclear language, and reframes experience to highlight the independence and communication signals remote employers look for.",
      },
      {
        question: "Do I need an existing resume to use the rewrite tool?",
        answer:
          "Yes — the rewrite tool works with a resume you already have; if you're starting from scratch, the AI Resume Builder is the better starting point.",
      },
      {
        question: "Will the rewritten resume still sound like me?",
        answer:
          "The rewrite works from your existing content and experience rather than inventing new material, so the result is a sharper version of your own background, not a generic template.",
      },
      {
        question: "Is the resume rewrite tool useful if I'm switching from an in-office job to remote work?",
        answer:
          "Yes — that's one of the most common uses, since a resume written for an in-office role often doesn't emphasize the independence and async-communication signals remote hiring managers weigh heavily.",
      },
    ],
    relatedJobLinks: [
      { name: "Remote Writing Jobs", href: "/remote-writing-jobs" },
      { name: "Remote Marketing Jobs", href: "/remote-marketing-jobs" },
      { name: "Remote Developer Jobs", href: "/remote-developer-jobs" },
      { name: "All Remote Jobs", href: "/jobs" },
    ],
  },
};

export function getToolContent(key) {
  return TOOL_CONTENT[key];
}
