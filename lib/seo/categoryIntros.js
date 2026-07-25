/**
 * Hand-written, unique long-form content for the highest-priority
 * programmatic SEO landing pages (see lib/seo/seoPages.js /
 * lib/seo/seoAliases.js for how each page's slug is generated).
 *
 * Why this exists as a separate file instead of a template in
 * seoContent.js: seoContent.js's `buildSeoContent()` generates a short,
 * templated eyebrow/heading/meta-description for *every* generated page
 * (skills, employment types, experience levels, and every category) —
 * that template is fine for meta tags, but reusing it for a long-form
 * on-page intro + FAQ across dozens of pages would be exactly the kind
 * of near-duplicate, thin-content pattern search engines penalize.
 *
 * Instead, only the pages keyed here get a real, unique 300-500 word
 * intro paragraph and a curated FAQ set. Every other generated SEO page
 * (skills like /remote-python-jobs, /full-time-remote-jobs, categories
 * without an entry here, etc.) simply doesn't render the extra intro/FAQ
 * sections at all (see seoContent.js's `buildSeoContent` and
 * app/[seoSlug]/page.js) — they keep rendering exactly as they did
 * before this file existed. Nothing here is invented per-page filler;
 * add a new entry only when someone has actually written unique copy
 * for that page.
 *
 * Keyed by the page's full URL slug (the same `slug` on each SeoPageDef
 * from lib/seo/seoPages.js), since that's the one stable, unique
 * identifier per generated page — a couple of these aliases resolve to
 * the same underlying category (e.g. "ai" and "data-analyst" both filter
 * `data-and-ai`), so keying by canonical category value would collide.
 */
export const CATEGORY_INTROS = {
  "remote-ai-jobs": {
    intro: `Remote AI jobs span a wider range of work than the label suggests — from machine learning engineers training and deploying models, to data scientists turning raw data into decisions, to prompt engineers and AI workflow specialists shaping how people and models interact, to AI product managers deciding what gets built next. What ties them together is that almost all of it can be done from anywhere: model training runs on cloud infrastructure, datasets live in shared warehouses, and the collaboration tools teams already use for standups and code review work just as well across time zones as they do across a hallway.

That portability is part of why AI hiring has moved toward remote-first so quickly. Companies building AI products are often small, fast-moving, and competing globally for a limited pool of people who actually know how to get a model from a notebook into production — restricting the search to one metro area rarely makes sense when the best candidate might be three time zones away. The result is a genuinely broad remote job market: well-funded startups building foundation-model applications, larger tech companies running dedicated AI teams, and traditional companies in finance, healthcare, and retail hiring their first in-house AI hires to keep pace with competitors.

What it takes to land one of these roles depends heavily on which flavor of "AI job" you're targeting. Machine learning engineering and data science roles usually expect solid Python, a working grasp of statistics, and hands-on experience with common ML frameworks — these are the most technically demanding roles in the category, and usually the best-compensated. Prompt engineering and AI workflow roles reward precise, structured thinking more than deep ML theory, and are more accessible to people coming from adjacent technical or analytical backgrounds. AI product management leans on the same skills as product management generally — prioritization, user research, cross-functional communication — plus enough fluency in what current models can and can't do to make realistic calls. Data annotation and quality-review work is the most accessible entry point of all, valuing careful, consistent judgment over any coding background.

If you're searching this category, it's worth deciding early which of these you're actually aiming for rather than treating "AI job" as one target — the skills you'd build, the portfolio you'd need, and the interview process all differ meaningfully by role. Below are the current openings pulled continuously from remote-first companies hiring across the AI space, updated as new roles come in and old ones close.`,
    faqs: [
      {
        question: "What's the easiest remote AI job to break into with no experience?",
        answer:
          "Data annotation and labeling roles are typically the most accessible entry point — they value careful, consistent judgment over any coding background, and plenty of people use them as a genuine stepping stone toward more specialized AI work.",
      },
      {
        question: "Do I need a machine learning degree to get a remote AI job?",
        answer:
          "Only for some roles. Machine learning engineering and certain data science positions usually expect it or equivalent hands-on experience, but prompt engineering, AI product management, and data annotation roles typically don't require one at all.",
      },
      {
        question: "What skills matter most for remote AI roles?",
        answer:
          "It depends on the role: Python and statistics for ML engineering and data science, structured writing and systematic thinking for prompt engineering, and product/communication skills plus AI literacy for AI product management.",
      },
      {
        question: "Are remote AI jobs paid more than other remote tech roles?",
        answer:
          "It varies widely rather than following one pattern — machine learning engineering tends to be among the higher-paying tracks in tech, but \"AI job\" as a category spans a very wide compensation range depending on specialization and seniority.",
      },
      {
        question: "How do I know if a company hiring for an \"AI role\" is doing real work?",
        answer:
          "Read the actual responsibilities and required skills in the listing rather than the title alone — postings that lean heavily on the word \"AI\" without describing concrete tasks, tools, or outcomes are worth extra scrutiny.",
      },
    ],
  },

  "remote-developer-jobs": {
    intro: `Remote developer jobs make up the largest single slice of the remote job market, and for good reason: writing, testing, and shipping software is work that mostly happens inside an editor, a terminal, and a browser — none of which care where you're physically sitting. Backend engineers building APIs and services, frontend engineers building the interfaces people click on, full-stack developers doing both, and specialists in mobile, embedded, or platform engineering all fall under this umbrella, and virtually all of it is done today with the same git-based workflows, code review tools, and async communication whether the team sits in one office or across six countries.

Remote-first hiring took hold in software earlier and more thoroughly than almost any other field, partly because the tooling caught up first — cloud infrastructure, containerized deployments, and mature CI/CD pipelines mean a developer's local setup and a production server behave the same way regardless of location. That maturity is why you'll find remote developer openings across the full spectrum of company types: bootstrapped startups hiring their first engineers, well-funded scale-ups building out entire remote engineering orgs, and established software companies that shifted permanently distributed after finding it didn't slow shipping down.

What differs page to page is which stack and seniority a given opening calls for. Junior and mid-level roles typically weight fundamentals — data structures, testing discipline, ability to work through a codebase you didn't write — over any one specific framework. Senior and staff-level roles increasingly expect system design judgment, the ability to make tradeoffs under ambiguity, and comfort mentoring or reviewing other engineers' work, on top of deep expertise in whatever stack the team runs. Specializations like DevOps, mobile, or security pull from the same core engineering skill set but layer on their own tooling and depth requirements (see the dedicated DevOps and QA & Testing categories on this site if that's closer to what you're looking for).

Remote hiring for developers also tends to move faster than most other categories simply because the applicant pool and the hiring pool are both larger and more liquid — companies aren't limited to local talent, and developers aren't limited to local openings. That cuts both ways: competition for well-known companies and popular stacks can be intense, which is exactly why a resume and portfolio that clearly demonstrate real, shippable work tend to matter more here than almost anywhere else. Below are the current remote developer openings pulled continuously from companies hiring right now.`,
    faqs: [
      {
        question: "Which programming languages get the most remote developer job postings?",
        answer:
          "JavaScript/TypeScript and Python currently show up in the widest range of listings across frontend, backend, and full-stack roles, though demand for a specific language always depends heavily on the individual company's existing stack.",
      },
      {
        question: "Do remote developer jobs pay less than in-office roles?",
        answer:
          "Not inherently — many remote-first companies pay competitively regardless of location, though some do adjust compensation to a candidate's local cost of living, so it's worth checking a specific company's stated pay policy rather than assuming either way.",
      },
      {
        question: "Is a computer science degree required for remote developer roles?",
        answer:
          "No, but it's not irrelevant either — a strong portfolio of real projects, contributions, or work history increasingly substitutes for a formal degree at many remote-first companies, especially at junior to mid levels.",
      },
      {
        question: "How competitive are remote developer jobs compared to on-site roles?",
        answer:
          "Generally more competitive for well-known companies and popular stacks, simply because the applicant pool isn't limited by geography — a portfolio that demonstrates real, working code tends to matter even more here.",
      },
      {
        question: "What's the difference between a full-stack and a specialized developer role?",
        answer:
          "Full-stack roles expect working competence across both frontend and backend layers of an application, while specialized roles (frontend, backend, mobile, embedded) go deeper into one layer's specific tools and performance concerns.",
      },
    ],
  },

  "remote-data-analyst-jobs": {
    intro: `Remote data analyst jobs sit at the practical, business-facing end of the data spectrum — turning existing data into dashboards, reports, and recommendations that other teams actually act on, as distinct from the more research-heavy work of a data scientist or the infrastructure-building work of a data engineer. A typical week might mean writing SQL against a warehouse, building or maintaining dashboards in a BI tool, and presenting findings to a marketing, product, or finance team that doesn't have the technical background to pull the numbers themselves. That output-oriented, cross-functional nature is exactly why so much of this work has moved remote: the analysis itself happens in a browser tab connected to company data, and the "meeting" part of the job now happens over video call as naturally as it once did in a conference room.

Companies hiring remote data analysts span nearly every industry, not just tech — SaaS companies tracking product usage, e-commerce businesses analyzing sales and marketing spend, fintechs monitoring risk and transaction data, and healthcare or logistics companies making sense of operational data all need someone translating numbers into decisions. That breadth is good news for job seekers: unlike some remote categories concentrated in a handful of sectors, data analyst demand is genuinely widespread, which means more openings but also more variation in exactly what "data analyst" means at a given company.

The core toolkit is fairly consistent across postings: SQL is close to universal, spreadsheet fluency is assumed, and familiarity with a BI tool (Tableau, Looker, Power BI, or similar) shows up in most listings. Python or R appear more often at the senior end or in companies doing heavier statistical work, but plenty of solid analyst roles don't require either. What separates candidates in practice is less which specific tools they know and more whether they can demonstrate they've actually used data to change a real decision — a portfolio built around a couple of concrete, well-explained analyses tends to carry more weight than a long list of software names.

Because analyst output is judged by non-technical stakeholders as often as technical ones, clear communication is treated as a core skill here, not a soft extra — the ability to explain what a number means and why it matters is frequently weighted alongside the technical query itself. Below are the current remote data analyst roles pulled continuously from companies hiring now.`,
    faqs: [
      {
        question: "What's the difference between a data analyst and a data scientist?",
        answer:
          "Data analysts typically focus on interpreting existing data to answer specific business questions using SQL and BI tools, while data scientists more often build predictive models and do open-ended statistical research — the roles overlap but the day-to-day work differs.",
      },
      {
        question: "Do remote data analyst jobs require coding skills?",
        answer:
          "SQL is close to a universal requirement, but general-purpose coding (Python or R) is more common at the senior end or in statistically heavy roles — many solid analyst positions don't require it at all.",
      },
      {
        question: "What tools should I know for a remote data analyst role?",
        answer:
          "SQL and spreadsheet fluency show up in nearly every listing, with a BI tool like Tableau, Looker, or Power BI appearing in most — Python or R is a plus rather than a baseline requirement for many roles.",
      },
      {
        question: "Which industries hire the most remote data analysts?",
        answer:
          "Demand is genuinely spread across SaaS, e-commerce, fintech, healthcare, and logistics rather than concentrated in one sector — most industries generating meaningful volumes of data need someone turning it into decisions.",
      },
      {
        question: "How do I stand out when applying for remote data analyst jobs?",
        answer:
          "A portfolio built around a couple of concrete, clearly explained analyses — what question you answered and what decision it informed — tends to matter more than listing every tool you've touched.",
      },
    ],
  },

  "remote-writing-jobs": {
    intro: `Remote writing jobs cover a genuinely wide field: technical writers documenting how software works, content writers and bloggers producing articles for a company's marketing funnel, copywriters shaping the words on landing pages and ads, editors refining other people's drafts, and journalists reporting for fully digital publications. Despite the range, the work shares a common shape — research, draft, revise, ship — that has always been comfortable done asynchronously and in writing, which is a big part of why writing was one of the earliest categories of knowledge work to normalize working remotely, well before "remote-first" became a widespread hiring strategy elsewhere.

Most remote writing roles today fall into one of two arrangements: a full- or part-time in-house position (common at SaaS companies, media outlets, and larger content-driven brands) or freelance/contract work paid per piece or per project, which is especially common in content and copywriting. Each has real tradeoffs — in-house roles trade some flexibility for steadier income and closer collaboration with a specific brand's voice, while freelance work offers more control over workload at the cost of having to find your own next assignment. Job seekers browsing this category should read postings carefully for which arrangement is actually on offer, since "writer" postings mix both freely.

What companies look for varies by the specific type of writing. Technical writing leans on the ability to make complex, often engineering-heavy material clear to a non-expert reader, and increasingly asks for direct experience with documentation tools and sometimes a working knowledge of the product's own tech stack. Content and copywriting roles weight a portfolio of published, on-brand work heavily, often alongside some familiarity with SEO fundamentals given how much of that writing exists to be found in search. Editorial and journalism roles put more emphasis on judgment — knowing what's worth writing about and how to shape a piece — than on any single technical skill.

Across all of these, a strong, relevant portfolio does more work than a resume alone: writing is one of the few remote categories where a hiring manager can directly evaluate the actual output of your past work, and most listings ask for writing samples explicitly. Below are the current remote writing roles pulled continuously from companies hiring now.`,
    faqs: [
      {
        question: "What types of jobs count as \"remote writing jobs\"?",
        answer:
          "The category spans technical writing, content writing and blogging, copywriting, editing, and digital journalism — each with different day-to-day work despite sharing the same core research-draft-revise process.",
      },
      {
        question: "Are remote writing jobs mostly freelance or full-time?",
        answer:
          "Both exist in real volume — in-house full- or part-time roles are common at SaaS and media companies, while freelance/contract work paid per piece is especially common in content and copywriting, so it's worth reading each listing carefully.",
      },
      {
        question: "Do I need a portfolio to apply for remote writing jobs?",
        answer:
          "Almost always, yes — writing is one of the few categories where a hiring manager can directly judge your past output, and most listings explicitly ask for writing samples relevant to the role.",
      },
      {
        question: "Does SEO knowledge matter for remote content writing roles?",
        answer:
          "It's frequently listed as a plus or requirement for content and copywriting roles specifically, since much of that writing exists to be found in search, though it matters far less for technical writing or editorial roles.",
      },
      {
        question: "What skills matter most for remote technical writing jobs?",
        answer:
          "The ability to explain complex, often engineering-heavy material clearly to a non-expert reader is central, and direct experience with documentation tools or the product's own tech stack is increasingly asked for.",
      },
    ],
  },

  "remote-marketing-jobs": {
    intro: `Remote marketing jobs cover everything from performance and growth marketing (paid ads, funnel optimization, experimentation) to content and SEO marketing, social media and community management, brand and communications, and product marketing that bridges what a company builds with how it's positioned and sold. The common thread is that marketing has become an inherently digital discipline over the last decade — campaigns run through ad platforms and analytics dashboards, content lives in a CMS, and most of the collaboration marketing teams need (with design, sales, and product) already happens through shared docs and async tools rather than requiring everyone in the same room.

That digital-first nature is why marketing was another of the earlier categories to normalize remote hiring, and why it now spans such a wide range of company types: venture-backed startups needing an early growth hire to find product-market fit, mid-size SaaS companies running full in-house marketing teams, and larger consumer or B2B brands hiring remote specialists into an otherwise distributed function. Agencies and marketing consultancies add another layer of remote-friendly roles, often serving several clients at once from a fully distributed team.

The specific skills a listing asks for vary a lot by which flavor of marketing it is. Performance and growth roles weight comfort with ad platforms, analytics tools, and a genuinely experimental, metrics-driven mindset — being able to read a funnel and know what to test next matters more than any single tool. Content and SEO roles weight writing ability alongside keyword research and on-page optimization fundamentals. Social and community roles weight platform fluency and a sense for tone and audience. Product marketing roles weight the ability to translate technical product detail into messaging that resonates with a specific buyer, often requiring close work with both product and sales teams.

Because marketing work is judged heavily on outcomes — traffic, conversion, pipeline, engagement — postings frequently ask candidates to speak to specific metrics they've moved in past roles rather than just listing responsibilities, and a portfolio or case study of a campaign you actually ran tends to stand out more than a general skills list. Below are the current remote marketing roles pulled continuously from companies hiring now.`,
    faqs: [
      {
        question: "What are the different types of remote marketing jobs?",
        answer:
          "The category spans performance/growth marketing, content and SEO marketing, social media and community management, brand and communications, and product marketing — each drawing on a different mix of skills.",
      },
      {
        question: "Do remote marketing jobs require a specific degree?",
        answer:
          "Rarely a strict requirement — most listings care more about demonstrated results (traffic, conversion, pipeline moved) and relevant campaign experience than a specific marketing degree.",
      },
      {
        question: "What tools should I know for remote growth marketing roles?",
        answer:
          "Comfort with major ad platforms and analytics tools matters, but the more consistently valued trait across listings is an experimental, metrics-driven approach to knowing what to test next.",
      },
      {
        question: "Is SEO knowledge required for remote marketing jobs?",
        answer:
          "It's commonly expected for content and SEO-focused roles specifically, but far less central to performance marketing, social/community, or product marketing positions.",
      },
      {
        question: "How do I stand out when applying for remote marketing roles?",
        answer:
          "Speaking to specific, measurable outcomes from past campaigns — and ideally a short case study or portfolio piece — tends to carry more weight than a general list of marketing skills.",
      },
    ],
  },

  "remote-design-jobs": {
    intro: `Remote design jobs mostly mean product design today — UX/UI designers shaping how software looks, feels, and functions — alongside related work in visual/graphic design, user research, and interaction design. It's a category that took to remote work naturally: modern design tools are built for real-time, cloud-based collaboration by default, design systems and component libraries are shared digitally regardless of where a team sits, and feedback loops with engineering and product happen through comments on a shared file just as effectively as they would across a desk.

Most remote design hiring comes from software companies building their own products — B2B SaaS, consumer apps, fintech, and increasingly AI-driven products all need designers shaping the actual user-facing experience, not just the visual layer on top of it. A smaller but steady stream of remote design work comes from agencies and design consultancies serving multiple clients, and from larger companies distributing what used to be a centralized, in-office design team across time zones. Because so much of design work is genuinely portable — a Figma file looks the same wherever it's opened — it's also one of the categories where fully async, no-meetings-required arrangements show up more often than in most technical roles.

What a given listing asks for depends on seniority and focus. Product design roles at growth-stage and larger companies increasingly expect comfort owning a problem end-to-end — user research, wireframing, prototyping, and working directly with engineering through implementation — rather than just producing polished mockups. Earlier-career and more visually focused roles weight strong craft and a cohesive portfolio more heavily than research or strategy experience. User research specialists are hired separately at some companies and folded into the general product designer role at others, so it's worth reading a listing's actual responsibilities rather than assuming from the title alone.

Design is also one of the few remote categories where a portfolio effectively is the resume: almost every listing expects a link to real, shipped work, and hiring decisions lean heavily on the quality and relevance of that portfolio rather than years of experience alone. Below are the current remote design roles pulled continuously from companies hiring now.`,
    faqs: [
      {
        question: "What's the difference between UX design, UI design, and product design?",
        answer:
          "UX design focuses on how a product works and flows, UI design focuses on its visual and interactive surface, and \"product design\" is commonly used as an umbrella term covering both, especially at software companies hiring one generalist role.",
      },
      {
        question: "Do remote design jobs require a specific design degree?",
        answer:
          "Rarely — a strong, relevant portfolio of shipped or well-executed work carries far more weight in hiring decisions than a formal design credential.",
      },
      {
        question: "What should be in a design portfolio for remote job applications?",
        answer:
          "A small number of real projects explained in depth — the problem, your process, and the outcome — tends to be far more effective than a large volume of polished but unexplained visuals.",
      },
      {
        question: "Which industries hire the most remote product designers?",
        answer:
          "B2B SaaS, consumer apps, and fintech make up the bulk of demand, with a growing share of openings now coming from companies building AI-driven products.",
      },
      {
        question: "Is user research a separate role from product design?",
        answer:
          "It depends on the company — some hire dedicated user researchers, while many fold research responsibilities into a single generalist product designer role, so it's worth checking a listing's actual responsibilities.",
      },
    ],
  },

  "remote-devops-jobs": {
    intro: `Remote DevOps jobs cover the engineering work that sits between writing code and running it reliably in production — infrastructure engineering, site reliability engineering (SRE), platform engineering, release engineering, and cloud infrastructure roles all fall under this umbrella. The work itself is defined by tools that are cloud-native and remote-friendly almost by design: infrastructure-as-code, container orchestration, CI/CD pipelines, and monitoring/observability platforms are all managed through the same dashboards and command-line tools whether an engineer is on-site or three continents away from the servers they're managing.

Demand for remote DevOps talent tends to track closely with how much infrastructure a company runs, which means it spans company sizes and stages more evenly than some other technical categories — early-stage startups often need their first DevOps hire the moment they outgrow a single deploy script, while larger companies run entire distributed platform teams responsible for the infrastructure dozens of product engineers depend on. Because reliability and uptime are inherently continuous concerns, DevOps and SRE roles are also more likely than most to mention on-call rotations explicitly in the listing — worth checking specifically if that's a dealbreaker for you.

Core expectations across most listings include comfort with a major cloud provider (AWS, GCP, or Azure), containerization and orchestration (Docker and Kubernetes show up constantly), infrastructure-as-code tools like Terraform, and CI/CD pipeline experience. Beyond that baseline, roles diverge: SRE-leaning positions weight incident response, monitoring, and reliability engineering more heavily, while platform engineering roles focus more on building the internal tools and paved paths other engineers use day to day. Security-adjacent DevOps roles (sometimes labeled DevSecOps) layer in compliance and security tooling on top of the same infrastructure skill set.

Because this work directly affects whether production stays up, listings tend to weight real operational experience — incidents handled, systems scaled, outages prevented — more heavily than credentials or certifications alone, though cloud certifications can still help a resume clear an initial screen. Below are the current remote DevOps and infrastructure roles pulled continuously from companies hiring now.`,
    faqs: [
      {
        question: "What's the difference between DevOps and Site Reliability Engineering (SRE)?",
        answer:
          "DevOps is the broader practice of streamlining how software gets built, deployed, and operated, while SRE is a more specific discipline focused on reliability, incident response, and uptime — many companies use the titles somewhat interchangeably in practice.",
      },
      {
        question: "What tools should I know for remote DevOps jobs?",
        answer:
          "A major cloud provider (AWS, GCP, or Azure), Docker and Kubernetes for containerization, and an infrastructure-as-code tool like Terraform show up in the large majority of listings, alongside CI/CD pipeline experience.",
      },
      {
        question: "Do remote DevOps jobs require on-call rotations?",
        answer:
          "Often, yes, especially for SRE-leaning roles — reliability work is inherently continuous, so it's worth checking a specific listing for on-call expectations if that matters to your decision.",
      },
      {
        question: "Are cloud certifications worth it for remote DevOps job applications?",
        answer:
          "They can help a resume clear an initial screen, but most listings weight real operational experience — incidents handled, systems scaled — more heavily than certifications alone.",
      },
      {
        question: "What's the difference between DevOps and platform engineering?",
        answer:
          "Platform engineering usually refers more specifically to building the internal tools and self-service infrastructure other engineers use day to day, while DevOps is the broader umbrella term covering that plus deployment, reliability, and operations work generally.",
      },
    ],
  },

  "remote-qa-testing-jobs": {
    intro: `Remote QA and testing jobs cover the work of making sure software actually behaves the way it's supposed to before it reaches users — manual QA testers working through test cases and exploratory testing, automation/SDET (software development engineer in test) roles writing code that tests other code, and quality engineers embedded directly in product teams responsible for a feature's reliability end to end. It's a category that maps cleanly onto remote work because the core loop — write or run tests, log what broke, verify the fix — happens entirely inside the same tools engineering already uses (bug trackers, CI pipelines, staging environments), with no dependency on being in a specific physical location.

Because nearly every company that ships software needs some form of quality assurance, remote QA and testing demand spans an unusually wide range of company types and sizes — from startups where one QA hire owns testing for the whole product, to larger engineering orgs running dedicated QA teams alongside every product squad. It's also a category with a real, well-worn path for career changers: manual testing roles are one of the more accessible ways into a tech career without a traditional CS background, and many QA engineers move from manual testing into automation and eventually into broader software engineering roles over time.

What a specific listing expects depends heavily on whether it's manual or automation-focused. Manual QA roles weight attention to detail, the ability to think through edge cases a developer might miss, and clear, precise bug reporting — coding ability is a plus but not always required. Automation and SDET roles expect real programming ability (commonly in the same language the product is built in, or in a dedicated framework like Selenium, Cypress, or Playwright) and treat test writing as its own engineering discipline rather than a QA-adjacent task. Quality engineer roles increasingly sit inside the product team itself, blending manual exploration, automation, and process improvement (like defining what "done" means for a feature) into one role.

Because the job exists specifically to catch what would otherwise go wrong in production, listings tend to value demonstrated rigor — a portfolio of test plans, automation suites, or bugs you've caught with real impact — more than a long list of testing tools alone. Below are the current remote QA and testing roles pulled continuously from companies hiring now.`,
    faqs: [
      {
        question: "What's the difference between manual QA and automation testing (SDET) roles?",
        answer:
          "Manual QA roles focus on exploratory testing and precise bug reporting with coding ability as a plus rather than a requirement, while automation/SDET roles require real programming ability to write the code that tests other code.",
      },
      {
        question: "Do I need a coding background for remote QA jobs?",
        answer:
          "Not for manual QA testing roles, where attention to detail and clear bug reporting matter most — but automation and SDET roles do require genuine programming ability, typically in the product's own language or a testing framework like Selenium or Cypress.",
      },
      {
        question: "Is remote QA testing a good way to break into tech without a CS degree?",
        answer:
          "It's one of the more accessible entry points into a tech career, and it's common for QA engineers to move from manual testing into automation and eventually broader software engineering roles over time.",
      },
      {
        question: "What testing tools should I know for remote automation roles?",
        answer:
          "Selenium, Cypress, and Playwright are among the most commonly requested frameworks, alongside general programming ability in whatever language the product itself is built in.",
      },
      {
        question: "What's a quality engineer, and how is it different from a QA tester?",
        answer:
          "Quality engineer roles typically sit embedded inside a specific product team and blend manual testing, automation, and process work (like defining what \"done\" means for a feature) into one broader role, rather than testing as a separate, standalone function.",
      },
    ],
  },
};

/**
 * @param {string} slug - the full SEO page slug, e.g. "remote-ai-jobs"
 * @returns {{intro: string, faqs: Array<{question:string,answer:string}>} | undefined}
 */
export function getCategoryIntro(slug) {
  return CATEGORY_INTROS[slug];
}
