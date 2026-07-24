import { AUTHORS } from "../authors";

const post = {
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
  };

export default post;
