import { AUTHORS } from "../authors";

const post = {
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
  };

export default post;
