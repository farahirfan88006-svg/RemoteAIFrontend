/**
 * Mock AI Mock Interview question bank — a static, per-track question
 * set (not a live model call), matching Phase 2's "mock AI output"
 * scope. Shape mirrors the real Interview Questions feature's data
 * (question / difficulty / suggestedAnswer) so this could later be
 * swapped for a real backend endpoint (see lib/api/jobs.js's
 * getInterviewQuestions) with no change to the components that render it.
 */

export const TRACKS = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "fullstack", label: "Full Stack" },
  { id: "ai", label: "AI" },
  { id: "data-science", label: "Data Science" },
  { id: "product", label: "Product" },
  { id: "marketing", label: "Marketing" },
];

const QUESTION_BANK = {
  frontend: [
    { difficulty: "beginner", question: "What's the difference between `let`, `const`, and `var`?", suggestedAnswer: "`var` is function-scoped and hoisted with no temporal dead zone; `let`/`const` are block-scoped and hoisted into a temporal dead zone. `const` additionally prevents reassignment (not deep immutability)." },
    { difficulty: "beginner", question: "What problem does the virtual DOM solve?", suggestedAnswer: "It batches and diffs UI updates against an in-memory representation before touching the real DOM, avoiding expensive layout/reflow on every state change." },
    { difficulty: "intermediate", question: "Explain the difference between `useEffect` and `useLayoutEffect`.", suggestedAnswer: "`useEffect` runs asynchronously after paint; `useLayoutEffect` runs synchronously before the browser paints, useful for measuring/mutating the DOM before the user sees a flash." },
    { difficulty: "intermediate", question: "How would you debug a memory leak in a long-running single-page app?", suggestedAnswer: "Take heap snapshots in DevTools over time, look for detached DOM nodes and growing listener/closure counts, and check for un-cleaned event listeners, intervals, or subscriptions in effect cleanup functions." },
    { difficulty: "advanced", question: "How does React's reconciliation algorithm decide whether to reuse or recreate a component instance?", suggestedAnswer: "It compares element type and `key` at the same position in the tree; same type/key reuses the instance and diffs props, a different type or key unmounts the old instance and mounts a new one." },
  ],
  backend: [
    { difficulty: "beginner", question: "What's the difference between authentication and authorization?", suggestedAnswer: "Authentication verifies who a user is; authorization determines what that verified user is allowed to do." },
    { difficulty: "beginner", question: "Why use an index on a database column?", suggestedAnswer: "An index lets the database locate matching rows without scanning the whole table, trading extra write cost and storage for much faster reads on that column." },
    { difficulty: "intermediate", question: "How would you design an idempotent API endpoint for payment processing?", suggestedAnswer: "Require an idempotency key from the client, store it with the result of the first successful request, and return that stored result for any retry with the same key instead of reprocessing." },
    { difficulty: "intermediate", question: "What's the difference between horizontal and vertical scaling?", suggestedAnswer: "Vertical scaling adds resources (CPU/RAM) to one machine; horizontal scaling adds more machines and distributes load, which usually requires the app to be stateless or use shared state." },
    { difficulty: "advanced", question: "How would you design a system to handle 10x traffic growth without a full rewrite?", suggestedAnswer: "Identify the current bottleneck (DB, CPU, I/O) first, then apply caching, read replicas, queueing for async work, and horizontal scaling behind a load balancer — incrementally, validated against real load rather than rewriting the architecture upfront." },
  ],
  fullstack: [
    { difficulty: "beginner", question: "How does a browser know which HTTP method to use for a form submission?", suggestedAnswer: "It uses the form's `method` attribute (GET or POST); GET appends data to the URL, POST sends it in the request body." },
    { difficulty: "intermediate", question: "How do you keep API contracts in sync between frontend and backend on a fast-moving team?", suggestedAnswer: "Shared, versioned schemas (OpenAPI/GraphQL SDL or a shared types package) generated into both sides, plus contract tests that fail CI when either side drifts." },
    { difficulty: "intermediate", question: "Walk through what happens end-to-end when a user submits a login form.", suggestedAnswer: "Client validates input, sends credentials over HTTPS, server verifies against stored (hashed) credentials, issues a session/JWT, client stores the token and attaches it to subsequent authenticated requests." },
    { difficulty: "advanced", question: "How would you architect a feature that needs to work both online and offline?", suggestedAnswer: "Use local-first storage (IndexedDB/local cache) with an optimistic UI, queue mutations while offline, and reconcile with the server via a sync/conflict-resolution strategy (last-write-wins or CRDT-based) when connectivity returns." },
  ],
  ai: [
    { difficulty: "beginner", question: "What's the difference between supervised and unsupervised learning?", suggestedAnswer: "Supervised learning trains on labeled examples to predict an output; unsupervised learning finds structure (clusters, patterns) in unlabeled data with no target label." },
    { difficulty: "intermediate", question: "What is overfitting and how do you detect it?", suggestedAnswer: "The model memorizes training data instead of generalizing. Detected when training accuracy is high but validation/test accuracy is much lower; addressed with regularization, more data, or simpler models." },
    { difficulty: "intermediate", question: "Explain the intuition behind attention in transformer models.", suggestedAnswer: "Attention lets each token weigh how relevant every other token is to it when building its representation, instead of relying only on fixed nearby context like older recurrent models." },
    { difficulty: "advanced", question: "How would you evaluate whether an LLM-based feature is safe to ship to production?", suggestedAnswer: "Define task-specific eval sets and success metrics, test against adversarial/edge-case prompts, add guardrails (input/output filtering), and roll out gradually with monitoring and a fallback path." },
  ],
  "data-science": [
    { difficulty: "beginner", question: "What's the difference between correlation and causation?", suggestedAnswer: "Correlation means two variables move together; causation means one directly produces a change in the other. Correlation alone can't establish causation without controlled experimentation or causal inference methods." },
    { difficulty: "intermediate", question: "How do you decide on a sample size for an A/B test?", suggestedAnswer: "Use a power analysis based on the baseline conversion rate, the minimum detectable effect you care about, and your desired significance level and statistical power (commonly 80%+)." },
    { difficulty: "intermediate", question: "How would you handle a dataset with significant class imbalance?", suggestedAnswer: "Consider resampling (oversampling the minority class or undersampling the majority), class-weighted loss functions, and evaluating with metrics like precision/recall or PR-AUC instead of raw accuracy." },
    { difficulty: "advanced", question: "How would you diagnose whether a model's performance drop in production is data drift or a pipeline bug?", suggestedAnswer: "Compare input feature distributions between training and current production data (data drift), check pipeline logs/schemas for silent breakages, and validate against a held-out recent sample before assuming it's drift." },
  ],
  product: [
    { difficulty: "beginner", question: "How do you prioritize a product backlog with limited engineering capacity?", suggestedAnswer: "Score items against a shared framework (e.g. reach/impact/confidence/effort) tied to a clear objective, then sequence around dependencies and capacity rather than by loudest stakeholder." },
    { difficulty: "intermediate", question: "How would you tell if a feature you shipped was actually successful?", suggestedAnswer: "Define the success metric before shipping, compare against a pre-registered target or control group, and check for both the primary metric and guardrail metrics (e.g. no regression in retention)." },
    { difficulty: "intermediate", question: "Two stakeholders disagree on what to build next — how do you resolve it?", suggestedAnswer: "Ground the disagreement in the shared goal/metric, bring supporting data or user evidence for each option, and make (or facilitate) a decision with a clear owner rather than letting it stall." },
    { difficulty: "advanced", question: "How would you build a roadmap for a product with no existing usage data?", suggestedAnswer: "Lean on qualitative research (user interviews, competitive analysis) to form hypotheses, ship a minimal version fast to start generating real data, then let that data steer the next roadmap iteration." },
  ],
  marketing: [
    { difficulty: "beginner", question: "What's the difference between brand marketing and performance marketing?", suggestedAnswer: "Brand marketing builds long-term awareness and trust with metrics that are hard to attribute directly to a sale; performance marketing runs measurable, ROI-driven campaigns tied to a specific conversion action." },
    { difficulty: "intermediate", question: "How would you measure the ROI of a content marketing campaign?", suggestedAnswer: "Track assisted conversions and attribution across the funnel (not just last-click), tie content engagement to pipeline/revenue where possible, and compare cost per acquired customer against paid channels." },
    { difficulty: "intermediate", question: "A campaign's CTR is high but conversion rate is low — what would you check?", suggestedAnswer: "Check message-to-landing-page match, page load speed, and whether the offer/audience targeting actually matches what the ad promised — a CTR/conversion mismatch is usually an expectation gap, not a traffic quality issue alone." },
    { difficulty: "advanced", question: "How would you build a go-to-market plan for a product entering a new region?", suggestedAnswer: "Validate demand and localize positioning first, choose 1–2 channels based on where the target audience already is, run a small paid pilot to calibrate CAC before scaling spend, and set region-specific success metrics rather than reusing the home-market benchmarks." },
  ],
};

/** @returns {{id: string, label: string}[]} */
export function listTracks() {
  return TRACKS;
}

/** @param {string} trackId @returns {Array<{difficulty: string, question: string, suggestedAnswer: string}>} */
export function getQuestionsForTrack(trackId) {
  return QUESTION_BANK[trackId] || [];
}

export function trackLabel(trackId) {
  return TRACKS.find((t) => t.id === trackId)?.label || trackId;
}
