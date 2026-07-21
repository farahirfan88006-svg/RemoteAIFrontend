import { AUTHORS } from "../authors";

const post = {
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
  };

export default post;
