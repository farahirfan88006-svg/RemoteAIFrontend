import { AUTHORS } from "../authors";

const post = {
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
  };

export default post;
