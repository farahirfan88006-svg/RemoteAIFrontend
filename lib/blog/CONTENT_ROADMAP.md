# Blog Content Roadmap

Tracks every blog topic — published and planned — so future writing batches
never duplicate an existing search intent. Run `npm run validate:blog`
after adding any new post; it checks duplicate slugs/titles/canonical URLs,
missing metadata, missing OG images, broken internal links, and flags
near-duplicate topics for review.

**Status: 54 of ~100 target articles published** (40 original + 14 added in
this round). 46 more are planned below to reach ~100.

---

## Published (54)

The 40 original articles are unchanged — see `lib/blog/posts.js` for the
full list. The 14 added in this round:

| Slug | Category | Tags |
|---|---|---|
| `remote-devops-sre-jobs-guide` | engineering | devops, sre, remote jobs |
| `remote-data-analyst-jobs-guide` | engineering | data analytics, remote jobs, sql |
| `remote-product-designer-jobs-guide` | remote-roles | product design, ux, remote jobs |
| `remote-digital-marketing-jobs-guide` | remote-roles | digital marketing, remote jobs |
| `remote-jobs-united-kingdom-guide` | remote-work | remote jobs, uk, international jobs |
| `remote-jobs-australia-guide` | remote-work | remote jobs, australia, international jobs |
| `star-method-behavioral-interview-answers` | interview-prep | behavioral interview, star method |
| `system-design-interview-prep-remote-engineers` | interview-prep | system design, coding interview |
| `take-home-technical-assignment-tips` | interview-prep | take-home assignment, technical interview |
| `how-to-price-freelance-remote-work-rates` | freelancing | freelancing, rates, pricing |
| `optimizing-linkedin-profile-remote-recruiters` | linkedin | linkedin, personal branding |
| `remote-job-portfolio-website-guide` | resume-tips | portfolio, personal website |
| `remote-work-home-office-setup-guide` | remote-work | home office, productivity |
| `digital-nomad-visas-remote-work-guide` | remote-work | digital nomad, visas |

Two new categories were added to support this batch: `linkedin` (LinkedIn &
Personal Branding) and `remote-roles` (Remote Job Roles — for non-engineering
role guides like design, marketing, sales, support).

---

## Planned (46) — next batches toward ~100

Each entry below has a unique slug and search intent, checked against all 54
published articles for title/keyword overlap. When writing these, follow the
same structure as the existing posts (intro, 6-8 H2 sections, FAQ array +
matching FAQ heading blocks in `content`, featuredImage, internal links to
2-3 related tools/articles) and run `npm run validate:blog` before merging.

### Countries (4)
- `remote-jobs-netherlands-guide` — Remote Jobs in the Netherlands: A Guide for International Applicants — `remote-work` — remote jobs, netherlands, international jobs
- `remote-jobs-india-global-companies` — How to Get a Remote Job with a Global Company While Based in India — `remote-work` — remote jobs, india, international jobs
- `remote-jobs-latin-america-guide` — Remote Jobs for Latin America-Based Applicants: What US Companies Actually Require — `remote-work` — remote jobs, latin america, international jobs
- `remote-jobs-nigeria-africa-guide` — Remote Jobs for Africa-Based Applicants: Payment, Time Zones, and Where to Look — `remote-work` — remote jobs, africa, international jobs

### Roles (9)
- `remote-qa-test-engineer-jobs-guide` — Remote QA and Test Engineer Jobs: Skills, Salary, and Where to Apply — `engineering` — qa, test engineering, remote jobs
- `remote-cybersecurity-jobs-guide` — Remote Cybersecurity Jobs: Roles, Certifications, and Salary — `engineering` — cybersecurity, remote jobs
- `remote-customer-support-jobs-guide` — Remote Customer Support Jobs: What They Actually Pay and How to Get Hired — `remote-roles` — customer support, remote jobs
- `remote-sales-sdr-jobs-guide` — Remote Sales and SDR Jobs: Skills, Compensation, and Where to Apply — `remote-roles` — sales, sdr, remote jobs
- `remote-bookkeeping-accounting-jobs-guide` — Remote Bookkeeping and Accounting Jobs: Certifications and Realistic Pay — `remote-roles` — accounting, bookkeeping, remote jobs
- `remote-virtual-assistant-jobs-guide` — Remote Virtual Assistant Jobs: How the Work Actually Works and What It Pays — `remote-roles` — virtual assistant, remote jobs
- `remote-hr-people-ops-jobs-guide` — Remote HR and People Ops Jobs: Skills and Salary — `remote-roles` — hr, people ops, remote jobs
- `remote-technical-writer-jobs-guide` — Remote Technical Writer Jobs: Skills, Portfolio, and Salary — `remote-roles` — technical writing, remote jobs
- `remote-product-manager-jobs-guide` — Remote Product Manager Jobs: Skills, Interview Process, and Salary — `remote-roles` — product management, remote jobs

### Resume / ATS deep dives (6)
- `resume-keywords-by-industry-guide` — Resume Keywords by Industry: How to Actually Choose the Right Ones — `resume-tips` — resume keywords, ats
- `resume-summary-examples-that-work` — Resume Summary Examples That Actually Get Read — `resume-tips` — resume summary
- `resume-bullet-point-formula-guide` — The Resume Bullet Point Formula Recruiters Actually Respond To — `resume-tips` — resume bullet points
- `resume-for-career-changers-guide` — How to Write a Resume When You're Changing Careers Entirely — `resume-tips` — career change, resume tips
- `resume-for-older-experienced-workers` — Writing a Resume as an Older or More Experienced Worker (Without Hiding It) — `resume-tips` — experienced workers, age in job search
- `explaining-employment-gaps-on-a-resume` — How to Explain Employment Gaps on a Resume Without Apologizing — `resume-tips` — employment gaps

### Interview (5)
- `async-video-interview-tips` — Asynchronous Video Interviews: How to Not Freeze Up on Camera Alone — `interview-prep` — async interview, video interview
- `negotiating-multiple-job-offers` — How to Negotiate When You Have Multiple Remote Job Offers — `interview-prep` — job offer negotiation
- `interview-follow-up-thank-you-email-guide` — The Interview Follow-Up Email: What Actually Helps vs. What's Just Noise — `interview-prep` — thank you email
- `red-flags-during-remote-interview-process` — Red Flags During a Remote Interview Process (And What to Do About Them) — `interview-prep` — interview red flags
- `preparing-for-reference-checks` — How to Prepare for Reference Checks Before an Employer Calls — `interview-prep` — reference checks

### Freelancing (4)
- `freelance-contracts-and-invoicing-basics` — Freelance Contracts and Invoicing: The Basics Every Remote Freelancer Needs — `freelancing` — freelance contracts, invoicing
- `best-platforms-for-finding-freelance-remote-work` — The Best Platforms for Finding Freelance Remote Work in 2026 — `freelancing` — freelance platforms
- `freelance-to-full-time-remote-transition` — How to Transition from Freelancing to a Full-Time Remote Job — `freelancing` — freelance transition
- `building-recurring-freelance-clients` — How to Build Recurring Clients Instead of Chasing One-Off Freelance Work — `freelancing` — freelance clients

### AI careers (5)
- `transitioning-into-ai-careers-from-other-tech-roles` — Transitioning into AI Careers from Other Tech Roles — `ai-careers` — ai careers, career transition
- `remote-ai-ethics-governance-jobs-guide` — Remote AI Ethics and Governance Jobs: What They Are and How to Get In — `ai-careers` — ai ethics, ai governance
- `ml-engineer-vs-data-scientist-remote-roles` — Machine Learning Engineer vs. Data Scientist: Which Remote Path Fits You — `ai-careers` — machine learning, data scientist
- `best-ai-certifications-for-remote-jobs` — The AI Certifications Actually Worth Having for Remote Job Applications — `ai-careers` — ai certifications
- `using-ai-tools-ethically-in-your-job-search` — Using AI Tools in Your Job Search Without Undermining Your Own Application — `ai-careers` — ai tools, job search ethics

### Productivity / remote-work practice (5)
- `deep-work-for-remote-workers-guide` — Deep Work for Remote Workers: Protecting Focus When No One's Watching — `remote-work` — deep work, focus
- `async-communication-skills-remote-teams` — Async Communication Skills That Actually Make Remote Teams Work — `remote-work` — async communication
- `managing-multiple-time-zones-as-a-team-member` — Managing Multiple Time Zones as an Individual Contributor (Not Just a Manager) — `remote-work` — time zones
- `work-life-boundaries-remote-work-guide` — Setting Work-Life Boundaries When Your Home Is Also Your Office — `remote-work` — work-life balance
- `remote-onboarding-tips-for-new-hires` — Remote Onboarding: What to Do in Your First 30 Days at a New Remote Job — `career-growth` — remote onboarding

### Salary / compensation (3)
- `salary-transparency-by-country-remote-jobs` — Salary Transparency Laws and Remote Job Postings: What to Expect by Country — `career-growth` — salary transparency
- `cost-of-living-adjusted-remote-salaries` — Cost-of-Living Adjusted Remote Salaries: How Companies Actually Calculate Them — `career-growth` — cost of living
- `understanding-equity-stock-options-remote-offers` — Understanding Equity and Stock Options in a Remote Startup Offer — `career-growth` — equity, stock options

### Career growth (5)
- `building-a-promotion-case-while-remote` — How to Build a Case for Promotion When You're Fully Remote — `career-growth` — promotion, remote work
- `remote-performance-review-tips` — Remote Performance Reviews: How to Prepare When Your Manager Rarely Sees You Work — `career-growth` — performance review
- `building-a-personal-brand-beyond-linkedin` — Building a Personal Brand Beyond LinkedIn: Newsletters, Blogs, and Talks — `linkedin` — personal branding, newsletter
- `tech-upskilling-roadmap-2026` — A Practical Upskilling Roadmap for 2026 (Without Chasing Every New Trend) — `career-growth` — upskilling
- `career-pivot-into-tech-from-non-tech-background` — How to Pivot into Tech from a Completely Non-Tech Background — `career-growth` — career pivot

---

## Notes for whoever writes the next batch

- Check this file *and* run `npm run validate:blog` before publishing —
  the script's near-duplicate warnings catch title/keyword overlap this
  document can't fully anticipate as the corpus grows.
- Keep the one-file-per-post pattern: new file in `lib/blog/posts/`, one
  import + one array entry in `lib/blog/posts.js`. Never edit an existing
  post's file to add a new topic.
- Every post needs `featuredImage: { url, alt }` (OG/Twitter image source)
  and, if it's a genuine revision of already-published content, `updatedAt`
  — never backfill `updatedAt` on unchanged content just to look fresh.
