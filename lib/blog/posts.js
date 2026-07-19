/**
 * lib/blog/posts.js
 * ---------------------------------------------------------------------
 * Static blog content. No backend/DB involved — this is intentional:
 * blog content here is closer to marketing/editorial copy than to the
 * live, per-user data the rest of this app is built around (jobs,
 * resumes, auth), and the ticket explicitly asks for "sample content so
 * the blog looks complete during development", not a CMS. Zero backend
 * risk (nothing here touches existing APIs/models), and the shape below
 * (id/slug/title/... plus lib/blog/blogService.js's function-based
 * access) mirrors this project's existing service-layer pattern
 * closely enough that migrating to a real Post model + MongoDB later —
 * if/when real editorial content is needed — is a swap of this file's
 * internals, not a rewrite of any page that reads from blogService.js.
 *
 * `content` blocks: { type: "heading", level: 2|3, text } |
 * { type: "paragraph", text } | { type: "list", items: string[] }.
 * Kept structured (not raw markdown/HTML) specifically so the detail
 * page can generate a Table of Contents directly from the heading
 * blocks, and so nothing here needs `dangerouslySetInnerHTML`.
 */

const AUTHORS = {
  sam: { name: "Sam Okafor", role: "Senior Editor, Careers", avatarInitials: "SO" },
  priya: { name: "Priya Menon", role: "Software Engineer & Writer", avatarInitials: "PM" },
  jordan: { name: "Jordan Lee", role: "Technical Recruiter", avatarInitials: "JL" },
};

export const BLOG_CATEGORIES = [
  { slug: "remote-work", name: "Remote Work" },
  { slug: "resume-tips", name: "Resume Tips" },
  { slug: "interview-prep", name: "Interview Prep" },
  { slug: "career-growth", name: "Career Growth" },
  { slug: "engineering", name: "Software Engineering" },
  { slug: "ai-careers", name: "AI Careers" },
  { slug: "freelancing", name: "Freelancing" },
];

export const BLOG_POSTS = [
  {
    slug: "how-to-find-legitimate-remote-jobs-2026",
    title: "How to Find Legitimate Remote Jobs in 2026 (Without Getting Scammed)",
    excerpt: "Remote job boards are full of noise. Here's how to separate real, well-paying remote roles from scams and low-quality listings.",
    category: "remote-work",
    tags: ["remote jobs", "job search", "remote work"],
    author: AUTHORS.sam,
    publishedAt: "2026-01-08",
    featured: true,
    content: [
      { type: "paragraph", text: "Remote work is no longer a perk — for millions of people, it's the default. But the same growth that made remote jobs mainstream has also made remote job boards a magnet for scams, ghost listings, and roles that quietly expect you to be online 12 hours a day across three time zones. Here's how to filter for the real thing." },
      { type: "heading", level: 2, text: "Start with the source, not the listing" },
      { type: "paragraph", text: "A job posted directly on a company's own careers page, or syndicated from Greenhouse/Lever/Ashby (the systems most real companies actually use to hire), is a much stronger signal than a listing that only exists on a random aggregator with no link back to the company. Before you apply anywhere, check whether the original posting URL actually resolves to the company's own domain or ATS." },
      { type: "heading", level: 2, text: "Red flags worth taking seriously" },
      { type: "list", items: [
        "Any request for payment, equipment fees, or 'training deposits' before you're hired",
        "Interviews conducted entirely over chat apps with no video call, ever",
        "Salary that seems disconnected from the stated experience level or region",
        "Vague company details with no verifiable website, LinkedIn presence, or press mentions",
      ] },
      { type: "heading", level: 2, text: "What a genuinely remote-first company looks like" },
      { type: "paragraph", text: "Real remote-first employers tend to over-communicate, not under-communicate: clear async norms, documented onboarding, and a hiring process that doesn't rely on you being available at odd hours just to prove you're 'committed'. If a company can't clearly explain how a remote employee actually gets work done and stays in the loop, that's worth asking about directly in your interview." },
      { type: "heading", level: 2, text: "Use category and skill pages to narrow your search" },
      { type: "paragraph", text: "Rather than scrolling an undifferentiated firehose of listings, narrow by what you actually do — a dedicated skill or category page (like our own Python, React, or DevOps remote-jobs pages) tends to surface more relevant, higher-quality listings than a generic keyword search." },
    ],
  },
  {
    slug: "resume-tips-that-actually-get-you-interviews",
    title: "Resume Tips That Actually Get You Interviews (Not Just Generic Advice)",
    excerpt: "Most resume advice is vague. Here's what specifically moves the needle when a recruiter is skimming your resume in under 10 seconds.",
    category: "resume-tips",
    tags: ["resume", "job search", "career growth"],
    author: AUTHORS.sam,
    publishedAt: "2026-01-15",
    featured: false,
    content: [
      { type: "paragraph", text: "Recruiters spend, on average, well under a minute on a first resume pass. That means every line is competing for attention — and vague advice like 'be concise' doesn't tell you what to actually change. Here's what does." },
      { type: "heading", level: 2, text: "Lead every bullet with an action, not a duty" },
      { type: "paragraph", text: "\"Responsible for the checkout flow\" tells a reader what your job was. \"Rebuilt the checkout flow, cutting cart abandonment by 18%\" tells them what you did and what happened because of it. If a bullet doesn't have a verb and (ideally) a number, it's a job description, not an accomplishment." },
      { type: "heading", level: 2, text: "Match the resume to the role, not the other way around" },
      { type: "paragraph", text: "A single, one-size-fits-all resume sent to every job is one of the most common reasons a strong candidate gets skipped — not because the resume is bad, but because it doesn't visibly line up with what that specific role asks for. Reordering your existing bullets to lead with the most relevant ones for each application costs a few minutes and meaningfully changes how a resume reads." },
      { type: "heading", level: 2, text: "Quantify even when the number feels small" },
      { type: "list", items: [
        "\"Supported a team of 4 engineers\" instead of \"worked with a team\"",
        "\"Reduced page load time from 3.2s to 1.1s\" instead of \"improved performance\"",
        "\"Onboarded 12 new hires over 6 months\" instead of \"helped with onboarding\"",
      ] },
      { type: "heading", level: 2, text: "Keep formatting boring on purpose" },
      { type: "paragraph", text: "Multi-column layouts, graphics, and creative fonts often look impressive to a human eye but can silently break in an ATS parser (see our companion piece on ATS resumes). A single-column, plain-text-first layout is not the exciting choice — it's the one that reliably reaches a human at all." },
    ],
  },
  {
    slug: "what-is-an-ats-resume-and-why-it-matters",
    title: "What Is an ATS Resume, and Why Does It Actually Matter?",
    excerpt: "Applicant Tracking Systems reject more resumes than most job seekers realize. Here's what an ATS actually does, and how to build around it.",
    category: "resume-tips",
    tags: ["ats", "resume", "job search"],
    author: AUTHORS.priya,
    publishedAt: "2026-01-22",
    featured: false,
    content: [
      { type: "paragraph", text: "An Applicant Tracking System (ATS) is the software that sits between your submitted resume and an actual human recruiter. Some ATS platforms rank/score resumes against a job description; nearly all of them, at minimum, parse your resume's text into structured fields (name, experience, education, skills) before a human ever opens it." },
      { type: "heading", level: 2, text: "What actually breaks in parsing" },
      { type: "list", items: [
        "Text inside tables, text boxes, or multi-column layouts — often skipped entirely",
        "Headers/footers used for contact info, which many parsers never read",
        "Unusual section titles (e.g. 'My Journey' instead of 'Experience') that a parser can't map to a known field",
        "Scanned images or resumes exported as flattened images rather than real text",
      ] },
      { type: "heading", level: 2, text: "Keywords matter, but not as a checklist" },
      { type: "paragraph", text: "Stuffing invisible keywords or a wall of unrelated skills at the bottom of a resume is an old, increasingly ineffective trick — modern ATS scoring and human reviewers both tend to notice. The more durable approach is using the specific terms from the job description naturally, in the context of real experience: if the listing says 'PostgreSQL', and you've used PostgreSQL, say PostgreSQL — not 'relational databases'." },
      { type: "heading", level: 2, text: "A simple pre-flight check" },
      { type: "paragraph", text: "Before submitting anywhere, copy your resume's text out of the PDF and paste it into a plain text editor. If names, dates, and section content come out in a readable, correctly-ordered block of plain text, an ATS almost certainly can parse it too. If it comes out garbled or missing chunks, so will the ATS." },
    ],
  },
  {
    slug: "writing-a-cover-letter-that-doesnt-sound-generic",
    title: "Writing a Cover Letter That Doesn't Sound Generic",
    excerpt: "Most cover letters restate the resume in paragraph form. Here's how to write one that actually adds something a resume can't.",
    category: "resume-tips",
    tags: ["cover letter", "job search"],
    author: AUTHORS.sam,
    publishedAt: "2026-01-29",
    featured: false,
    content: [
      { type: "paragraph", text: "A cover letter that just repeats your resume in sentence form wastes the one thing a resume can't do well: explain why. Why this role, why this company, why now, and why you specifically care — that's the actual job of a cover letter." },
      { type: "heading", level: 2, text: "Open with something specific" },
      { type: "paragraph", text: "Skip \"I am writing to apply for...\" — a hiring manager already knows what role they posted. Open with the single most relevant thing about your background relative to what this specific role needs, in one sentence." },
      { type: "heading", level: 2, text: "Connect your experience to their actual problem" },
      { type: "paragraph", text: "Job descriptions usually hint at a real problem the team is trying to solve (scaling a system, building a function from scratch, cleaning up technical debt). If you can point to a time you solved something similar — briefly, concretely — that does more work than a paragraph of adjectives about being a 'hard worker'." },
      { type: "heading", level: 2, text: "Keep it short" },
      { type: "paragraph", text: "Three to four short paragraphs is plenty. A cover letter's job is to earn the next five minutes of attention on your resume, not to contain your entire career story." },
    ],
  },
  {
    slug: "interview-preparation-framework-that-works",
    title: "An Interview Preparation Framework That Actually Works",
    excerpt: "Cramming every possible question doesn't work. Here's a structured way to prepare that covers technical, behavioral, and HR rounds without burning out.",
    category: "interview-prep",
    tags: ["interview prep", "career growth"],
    author: AUTHORS.jordan,
    publishedAt: "2026-02-03",
    featured: true,
    content: [
      { type: "paragraph", text: "Most interview prep advice is a giant list of questions to memorize answers to. That approach is exhausting and brittle — the moment a question is phrased slightly differently, the memorized answer falls apart. A framework travels better than a script." },
      { type: "heading", level: 2, text: "For behavioral questions: build a story bank, not scripted answers" },
      { type: "paragraph", text: "Instead of preparing an answer for every possible behavioral question, prepare 5-6 real stories from your own experience — a conflict, a failure, a big win, a time you learned something fast, a time you influenced without authority. Almost every behavioral question maps to one of these. Structure each with the STAR method (Situation, Task, Action, Result) so you can adapt the same story to different framings." },
      { type: "heading", level: 2, text: "For technical rounds: practice explaining out loud, not just solving" },
      { type: "paragraph", text: "Solving a problem silently and solving it while narrating your reasoning are different skills — most technical interviews are evaluating the second one. Practice thinking out loud, including saying what you're unsure about, rather than going silent while you work something out." },
      { type: "heading", level: 2, text: "For HR/logistics rounds: know your own numbers" },
      { type: "list", items: [
        "A realistic salary range for the role, location, and your experience level",
        "Your actual availability/notice period",
        "A clear, honest answer for why you're looking to leave your current role",
      ] },
      { type: "heading", level: 2, text: "Use role-specific question generators to focus your prep" },
      { type: "paragraph", text: "Generic 'top 50 interview questions' lists are a poor use of limited prep time. Generating questions specific to the actual job title, skills, and description in front of you (like the Interview Questions tool on this platform) tends to produce a much more relevant, less overwhelming prep list." },
    ],
  },
  {
    slug: "breaking-into-ai-careers-without-a-phd",
    title: "Breaking Into AI Careers Without a PhD",
    excerpt: "You don't need a doctorate to build a career in AI. Here's a realistic path for engineers coming from adjacent backgrounds.",
    category: "ai-careers",
    tags: ["ai careers", "machine learning", "career growth"],
    author: AUTHORS.priya,
    publishedAt: "2026-02-10",
    featured: false,
    content: [
      { type: "paragraph", text: "AI research roles at frontier labs often do require deep specialization. But the vast majority of paid, in-demand AI work today isn't research — it's applied engineering: building data pipelines, fine-tuning and evaluating existing models, and shipping AI features inside ordinary products. That work is much more accessible from a software engineering background." },
      { type: "heading", level: 2, text: "The most in-demand skill isn't what you'd think" },
      { type: "paragraph", text: "Being able to reliably evaluate whether an AI system's output is actually good — building evals, catching failure modes, iterating on prompts or fine-tuning data — is often a bigger hiring gap than raw model-building skill. That's a skill any strong engineer with attention to detail can develop." },
      { type: "heading", level: 2, text: "A realistic transition path" },
      { type: "list", items: [
        "Get hands-on with existing model APIs and open-source models before worrying about training anything from scratch",
        "Build one real, complete project (not a tutorial clone) that involves retrieval, evaluation, or fine-tuning",
        "Contribute to or read the code of a real open-source AI tooling project to see production patterns",
        "Target 'AI engineer' / 'ML engineer' roles at product companies, not only research labs",
      ] },
      { type: "heading", level: 2, text: "Don't underweight your existing background" },
      { type: "paragraph", text: "A strong backend engineer who understands data pipelines, or a strong product engineer who understands user-facing tradeoffs, brings something a pure ML researcher often doesn't. Frame your transition around what you already bring, not just what you're catching up on." },
    ],
  },
  {
    slug: "software-engineering-career-ladders-explained",
    title: "Software Engineering Career Ladders, Explained",
    excerpt: "Junior, mid, senior, staff, principal — what actually changes at each level, and what to focus on to get promoted.",
    category: "engineering",
    tags: ["software engineering", "career growth"],
    author: AUTHORS.jordan,
    publishedAt: "2026-02-17",
    featured: false,
    content: [
      { type: "paragraph", text: "Engineering levels are often described vaguely (\"more impact\", \"more scope\") in ways that don't actually tell you what to do differently. Here's a more concrete breakdown of what tends to change at each level." },
      { type: "heading", level: 2, text: "Junior to mid: from correct to owned" },
      { type: "paragraph", text: "A junior engineer's code getting reviewed and merged is success. A mid-level engineer is expected to own a feature or component end to end — including edge cases, monitoring, and what happens when it breaks at 2am — without heavy oversight." },
      { type: "heading", level: 2, text: "Mid to senior: from execution to judgment" },
      { type: "paragraph", text: "Seniority is less about writing more code and more about making good calls under ambiguity: knowing when NOT to build something, pushing back on a bad requirement, and correctly scoping a project before it starts, not just executing well once scope is handed to you." },
      { type: "heading", level: 2, text: "Senior to staff/principal: from your own output to the system around you" },
      { type: "paragraph", text: "At staff+ levels, impact usually comes through other people and systems — architecture decisions that outlive any single project, mentoring that changes how a team works, or identifying a problem nobody had framed yet. Individual code output stops being the main signal." },
      { type: "heading", level: 2, text: "What actually gets you promoted" },
      { type: "list", items: [
        "Visible ownership of outcomes, not just tasks",
        "A track record other engineers can point to when asked about your impact",
        "Consistently operating slightly above your current level before the promotion, not after",
      ] },
    ],
  },
  {
    slug: "react-best-practices-for-2026",
    title: "React Best Practices for 2026",
    excerpt: "React has changed a lot. Here's what's actually considered good practice now, versus outdated patterns still floating around older tutorials.",
    category: "engineering",
    tags: ["react", "javascript", "software engineering"],
    author: AUTHORS.priya,
    publishedAt: "2026-02-24",
    featured: false,
    content: [
      { type: "paragraph", text: "A lot of React advice circulating online is several years stale. Here's a current snapshot of what's actually considered good practice." },
      { type: "heading", level: 2, text: "Prefer server-rendered data fetching where your framework supports it" },
      { type: "paragraph", text: "For frameworks with server components (like Next.js's App Router), fetching data on the server and passing it down avoids client-side loading waterfalls and ships less JavaScript to the browser. Reach for client-side fetching (useEffect + state) specifically for data that depends on user interaction, not as the default for everything." },
      { type: "heading", level: 2, text: "Keep state as close to where it's used as possible" },
      { type: "paragraph", text: "Reflexively lifting all state to a global store is a common overcorrection. Most component state should live in the component that needs it; lift it only when two or more components genuinely need to share and synchronize it." },
      { type: "heading", level: 2, text: "Derive, don't duplicate" },
      { type: "paragraph", text: "If a value can be computed from existing props/state during render, computing it is usually simpler and less error-prone than storing it as a separate piece of state that has to be kept in sync." },
      { type: "heading", level: 2, text: "Common outdated patterns to retire" },
      { type: "list", items: [
        "Class components for new code (function components + hooks are the default now)",
        "Reaching for Redux by default for state that's actually local to a few components",
        "Manually memoizing everything with useMemo/useCallback 'just in case' without a measured performance problem",
      ] },
    ],
  },
  {
    slug: "python-skills-remote-employers-actually-want",
    title: "Python Skills Remote Employers Actually Want in 2026",
    excerpt: "Beyond syntax, here's what remote job listings for Python roles are consistently asking for.",
    category: "engineering",
    tags: ["python", "software engineering", "remote jobs"],
    author: AUTHORS.priya,
    publishedAt: "2026-03-03",
    featured: false,
    content: [
      { type: "paragraph", text: "\"Knows Python\" covers an enormous range of actual skill. Looking across real remote job descriptions, a few specific, recurring asks stand out beyond basic language syntax." },
      { type: "heading", level: 2, text: "Async programming, for real workloads" },
      { type: "paragraph", text: "asyncio and async frameworks (FastAPI, for instance) show up constantly in backend and API-heavy roles — teams increasingly expect Python engineers to understand when and why to reach for async rather than just knowing the keyword." },
      { type: "heading", level: 2, text: "Data tooling, even outside data-science roles" },
      { type: "paragraph", text: "Comfort with pandas, basic SQL, and reading/writing common data formats (CSV/Parquet/JSON at scale) shows up even in listings that aren't explicitly 'data' roles — a lot of backend work touches data pipelines somewhere." },
      { type: "heading", level: 2, text: "Testing discipline" },
      { type: "paragraph", text: "pytest fluency and an actual habit of writing tests (not just knowing the syntax) is one of the more commonly and specifically requested skills in mid-to-senior Python job descriptions." },
      { type: "heading", level: 2, text: "Packaging and dependency management" },
      { type: "paragraph", text: "Understanding virtual environments, lockfiles, and how to structure a real installable package (not just running a script) comes up repeatedly — especially for roles that involve shipping internal libraries." },
    ],
  },
  {
    slug: "javascript-fundamentals-still-worth-mastering",
    title: "JavaScript Fundamentals Still Worth Mastering (Even With All the Frameworks)",
    excerpt: "Frameworks come and go, but a handful of core JavaScript concepts keep showing up in interviews and real debugging sessions.",
    category: "engineering",
    tags: ["javascript", "software engineering"],
    author: AUTHORS.jordan,
    publishedAt: "2026-03-10",
    featured: false,
    content: [
      { type: "paragraph", text: "It's easy to spend years working almost entirely inside a framework's abstractions and never revisit core JavaScript. But a handful of fundamentals keep resurfacing — in interviews, and in real debugging sessions when a framework's abstraction leaks." },
      { type: "heading", level: 2, text: "Closures and scope" },
      { type: "paragraph", text: "Understanding exactly when a variable is captured by a closure — and why a loop variable behaves differently with var versus let — explains a surprising number of real bugs, not just interview trivia." },
      { type: "heading", level: 2, text: "The event loop" },
      { type: "paragraph", text: "Knowing the actual order of execution between synchronous code, microtasks (Promises), and macrotasks (setTimeout, I/O) explains why some async bugs happen and helps you reason about performance instead of guessing." },
      { type: "heading", level: 2, text: "Prototypal inheritance" },
      { type: "paragraph", text: "Even with classes now standard syntax, JavaScript's underlying object model is still prototype-based — understanding this makes debugging unexpected property lookups and framework internals much less mysterious." },
      { type: "heading", level: 2, text: "Equality and type coercion" },
      { type: "paragraph", text: "Knowing precisely when === differs from ==, and how JavaScript coerces types in comparisons, prevents an entire category of subtle bugs before they happen." },
    ],
  },
  {
    slug: "remote-work-productivity-without-burnout",
    title: "Remote Work Productivity Without Burning Out",
    excerpt: "Remote work removes commute time but often adds \"always available\" pressure. Here's how to stay productive sustainably.",
    category: "remote-work",
    tags: ["remote work", "career growth"],
    author: AUTHORS.sam,
    publishedAt: "2026-03-17",
    featured: false,
    content: [
      { type: "paragraph", text: "Remote work removes a commute, but for a lot of people it quietly adds something worse: a blurred line between \"working\" and \"available\", which can be more exhausting than a long office day ever was." },
      { type: "heading", level: 2, text: "Set a real end to your day" },
      { type: "paragraph", text: "Without a commute or an office closing, the workday can silently stretch. A specific, repeated end-of-day ritual (even something small, like closing your laptop and physically leaving the room) recreates the psychological \"leaving work\" signal a commute used to provide." },
      { type: "heading", level: 2, text: "Default to async, escalate to sync deliberately" },
      { type: "paragraph", text: "Not every question needs an instant reply. Teams that default to async communication (written updates, clear docs) and reserve real-time calls for things that actually need them tend to produce both more focused work and less always-on pressure." },
      { type: "heading", level: 2, text: "Protect blocks of uninterrupted time" },
      { type: "paragraph", text: "Deep work (writing code, writing, focused analysis) rarely survives constant notification interruptions. Blocking real, protected chunks of time — and communicating that boundary to your team — tends to matter more for output than total hours worked." },
    ],
  },
  {
    slug: "freelancing-vs-full-time-remote-work",
    title: "Freelancing vs. Full-Time Remote Work: How to Actually Decide",
    excerpt: "Both offer flexibility, but they trade off very differently on income stability, benefits, and day-to-day autonomy.",
    category: "freelancing",
    tags: ["freelancing", "remote work", "career growth"],
    author: AUTHORS.jordan,
    publishedAt: "2026-03-24",
    featured: false,
    content: [
      { type: "paragraph", text: "Freelancing and full-time remote work both offer location flexibility, but the similarities mostly end there. The right choice depends heavily on what you're actually optimizing for at this point in your career." },
      { type: "heading", level: 2, text: "Income stability vs. income ceiling" },
      { type: "paragraph", text: "Full-time remote work trades a capped, predictable salary for stability — steady pay, benefits, and (usually) less time spent on sales/admin. Freelancing removes that ceiling but replaces stability with variability: feast-or-famine periods are common, especially early on." },
      { type: "heading", level: 2, text: "Benefits are easy to underweight" },
      { type: "paragraph", text: "Health insurance, retirement matching, and paid time off have real dollar value that's easy to forget when comparing a freelance day rate to a salary. A true comparison needs to account for what you'd otherwise pay for these yourself." },
      { type: "heading", level: 2, text: "The hidden cost of freelancing: non-billable work" },
      { type: "paragraph", text: "Client acquisition, invoicing, scope negotiation, and gaps between contracts are all real time that doesn't show up as billable hours. Many first-time freelancers underestimate this by a wide margin." },
      { type: "heading", level: 2, text: "A middle path exists" },
      { type: "paragraph", text: "Contract-to-hire roles, fractional/part-time arrangements, and long-term retainer clients can offer a hybrid of freelancing's flexibility with more of full-time's predictability — worth considering rather than treating it as a strict binary choice." },
    ],
  },
  {
    slug: "career-growth-plan-for-remote-employees",
    title: "Building a Career Growth Plan When You Work Remotely",
    excerpt: "Remote work can make career growth feel invisible. Here's how to make your progress visible and intentional anyway.",
    category: "career-growth",
    tags: ["career growth", "remote work"],
    author: AUTHORS.sam,
    publishedAt: "2026-03-31",
    featured: false,
    content: [
      { type: "paragraph", text: "In an office, career growth often happens partly by osmosis — visibility from hallway conversations, being pulled into the right rooms, informal mentorship. Remote work removes a lot of that ambient visibility, which means growth has to become more deliberate, not less." },
      { type: "heading", level: 2, text: "Make your impact legible in writing" },
      { type: "paragraph", text: "If nobody sees you working, the only record of your impact is what you write down: project updates, documentation, and a running personal log of what you shipped and why it mattered. This becomes invaluable at review time and for your own resume later." },
      { type: "heading", level: 2, text: "Seek out visibility deliberately" },
      { type: "paragraph", text: "Volunteer for cross-team projects, present your work in shared channels or meetings, and make a habit of sharing progress proactively rather than waiting to be asked — remote visibility rarely happens by accident." },
      { type: "heading", level: 2, text: "Find a mentor outside your immediate reporting line" },
      { type: "paragraph", text: "Remote settings make casual mentorship less likely to happen organically. Actively asking someone more senior for regular, structured time tends to work better than hoping a mentorship relationship develops on its own." },
      { type: "heading", level: 2, text: "Revisit your resume and skills regularly, not just when job hunting" },
      { type: "paragraph", text: "Treat your resume as a living document you update quarterly, not something you scramble to rebuild only when you're ready to leave — it makes both internal promotion conversations and external job searches far less stressful when the time comes." },
    ],
  },
];

/** ~200 words/minute reading speed, computed once at module load. */
function estimateReadingTimeMinutes(post) {
  const words = post.content.reduce((count, block) => {
    if (block.type === "list") return count + block.items.join(" ").split(/\s+/).length;
    return count + (block.text || "").split(/\s+/).length;
  }, post.title.split(/\s+/).length);
  return Math.max(1, Math.round(words / 200));
}

BLOG_POSTS.forEach((post) => {
  post.readingTimeMinutes = estimateReadingTimeMinutes(post);
});
