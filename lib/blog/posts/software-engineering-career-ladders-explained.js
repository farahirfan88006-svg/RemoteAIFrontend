import { AUTHORS } from "../authors";

const post = {
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
  };

export default post;
