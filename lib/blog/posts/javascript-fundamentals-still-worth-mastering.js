import { AUTHORS } from "../authors";

const post = {
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
  };

export default post;
