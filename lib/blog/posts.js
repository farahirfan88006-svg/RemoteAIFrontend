/**
 * lib/blog/posts.js
 * ---------------------------------------------------------------------
 * Static blog content index. No backend/DB involved — this is intentional:
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
 * Each individual post lives in its own file under lib/blog/posts/,
 * one file per article (e.g. lib/blog/posts/my-post-slug.js), keeping
 * this file a thin index rather than one giant array. This scales
 * cleanly to 100+ posts — adding a new article means adding one new
 * file under posts/ and one import + array entry here, never editing
 * an existing post's file.
 *
 * `content` blocks: { type: "heading", level: 2|3, text } |
 * { type: "paragraph", text } | { type: "list", items: string[] } |
 * { type: "link", href, text }.
 * Kept structured (not raw markdown/HTML) specifically so the detail
 * page can generate a Table of Contents directly from the heading
 * blocks, and so nothing here needs `dangerouslySetInnerHTML`.
 */

import howToFindLegitimateRemoteJobs2026 from "./posts/how-to-find-legitimate-remote-jobs-2026";
import resumeTipsThatActuallyGetYouInterviews from "./posts/resume-tips-that-actually-get-you-interviews";
import whatIsAnAtsResumeAndWhyItMatters from "./posts/what-is-an-ats-resume-and-why-it-matters";
import writingACoverLetterThatDoesntSoundGeneric from "./posts/writing-a-cover-letter-that-doesnt-sound-generic";
import interviewPreparationFrameworkThatWorks from "./posts/interview-preparation-framework-that-works";
import breakingIntoAiCareersWithoutAPhd from "./posts/breaking-into-ai-careers-without-a-phd";
import softwareEngineeringCareerLaddersExplained from "./posts/software-engineering-career-ladders-explained";
import reactBestPracticesFor2026 from "./posts/react-best-practices-for-2026";
import pythonSkillsRemoteEmployersActuallyWant from "./posts/python-skills-remote-employers-actually-want";
import javascriptFundamentalsStillWorthMastering from "./posts/javascript-fundamentals-still-worth-mastering";
import remoteWorkProductivityWithoutBurnout from "./posts/remote-work-productivity-without-burnout";
import freelancingVsFullTimeRemoteWork from "./posts/freelancing-vs-full-time-remote-work";
import careerGrowthPlanForRemoteEmployees from "./posts/career-growth-plan-for-remote-employees";
import remoteJobsNoExperienceRequired from "./posts/remote-jobs-no-experience-required";
import remotePythonDeveloperJobsGuide from "./posts/remote-python-developer-jobs-guide";
import remoteJobsInCanadaInternationalApplicants from "./posts/remote-jobs-in-canada-international-applicants";
import promptEngineerJobsGuide from "./posts/prompt-engineer-jobs-guide";
import resumeForRemoteJobsAtsGuide from "./posts/resume-for-remote-jobs-ats-guide";
import remoteJobInterviewQuestionsAndAnswers from "./posts/remote-job-interview-questions-and-answers";
import salaryNegotiationScriptsRemoteJobOffers from "./posts/salary-negotiation-scripts-remote-job-offers";
import remoteJobsForBeginnersGuide from "./posts/remote-jobs-for-beginners-guide";
import remoteJobsInGermanyGuide from "./posts/remote-jobs-in-germany-guide";
import aiResumeCheckerGuide from "./posts/ai-resume-checker-guide";
import bestResumeFormatForRemoteJobs from "./posts/best-resume-format-for-remote-jobs";
import remoteInterviewEtiquette from "./posts/remote-interview-etiquette";
import codingInterviewPrepRemoteJobs from "./posts/coding-interview-prep-remote-jobs";
import remoteWorkBurnoutRecovery from "./posts/remote-work-burnout-recovery";
import remoteReactDeveloperJobs from "./posts/remote-react-developer-jobs";
import remoteSoftwareEngineerJobsGuide from "./posts/remote-software-engineer-jobs-guide";
import remoteAiJobsGuide from "./posts/remote-ai-jobs-guide";
import workFromHomeCareersGrowing2026 from "./posts/work-from-home-careers-growing-2026";
import bestRemoteCompaniesHiringGuide from "./posts/best-remote-companies-hiring-guide";
import resumeLengthGuide2026 from "./posts/resume-length-guide-2026";
import remoteWorkSkillsResumeNoExperience from "./posts/remote-work-skills-resume-no-experience";
import panelInterviewPrepRemoteJob from "./posts/panel-interview-prep-remote-job";
import salaryExpectationInterviewAnswer from "./posts/salary-expectation-interview-answer";
import findAMentorRemoteWork from "./posts/find-a-mentor-remote-work";
import timeManagementRemoteWorkers from "./posts/time-management-remote-workers";
import gitGithubSkillsRemoteDevelopers from "./posts/git-github-skills-remote-developers";
import freelanceRemoteJobsForBeginners from "./posts/freelance-remote-jobs-for-beginners";
import remoteDevopsSreJobsGuide from "./posts/remote-devops-sre-jobs-guide";
import remoteDataAnalystJobsGuide from "./posts/remote-data-analyst-jobs-guide";
import remoteProductDesignerJobsGuide from "./posts/remote-product-designer-jobs-guide";
import remoteDigitalMarketingJobsGuide from "./posts/remote-digital-marketing-jobs-guide";
import remoteJobsUnitedKingdomGuide from "./posts/remote-jobs-united-kingdom-guide";
import remoteJobsAustraliaGuide from "./posts/remote-jobs-australia-guide";
import starMethodBehavioralInterviewAnswers from "./posts/star-method-behavioral-interview-answers";
import systemDesignInterviewPrepRemoteEngineers from "./posts/system-design-interview-prep-remote-engineers";
import takeHomeTechnicalAssignmentTips from "./posts/take-home-technical-assignment-tips";
import howToPriceFreelanceRemoteWorkRates from "./posts/how-to-price-freelance-remote-work-rates";
import optimizingLinkedinProfileRemoteRecruiters from "./posts/optimizing-linkedin-profile-remote-recruiters";
import remoteJobPortfolioWebsiteGuide from "./posts/remote-job-portfolio-website-guide";
import remoteWorkHomeOfficeSetupGuide from "./posts/remote-work-home-office-setup-guide";
import digitalNomadVisasRemoteWorkGuide from "./posts/digital-nomad-visas-remote-work-guide";
import remoteQaTestEngineerJobsGuide from "./posts/remote-qa-test-engineer-jobs-guide";
import remoteCybersecurityJobsGuide from "./posts/remote-cybersecurity-jobs-guide";
import remoteDataScientistJobsGuide from "./posts/remote-data-scientist-jobs-guide";
import nextjsDeveloperJobsGuide from "./posts/nextjs-developer-jobs-guide";
import awsCloudCertificationsRemoteJobsGuide from "./posts/aws-cloud-certifications-remote-jobs-guide";
import remoteCustomerSupportJobsGuide from "./posts/remote-customer-support-jobs-guide";
import remoteSalesSdrJobsGuide from "./posts/remote-sales-sdr-jobs-guide";
import remoteVirtualAssistantJobsGuide from "./posts/remote-virtual-assistant-jobs-guide";
import remoteProjectManagerJobsGuide from "./posts/remote-project-manager-jobs-guide";
import remoteJobsNetherlandsGuide from "./posts/remote-jobs-netherlands-guide";
import remoteTechnicalWriterJobsGuide from "./posts/remote-technical-writer-jobs-guide";
import costOfLivingAdjustedRemoteSalaries from "./posts/cost-of-living-adjusted-remote-salaries";
import resumeKeywordsByIndustryGuide from "./posts/resume-keywords-by-industry-guide";
import resumeSummaryExamplesThatWork from "./posts/resume-summary-examples-that-work";
import resumeBulletPointFormulaGuide from "./posts/resume-bullet-point-formula-guide";
import explainingEmploymentGapsOnAResume from "./posts/explaining-employment-gaps-on-a-resume";
import asyncVideoInterviewTips from "./posts/async-video-interview-tips";
import negotiatingMultipleJobOffers from "./posts/negotiating-multiple-job-offers";
import redFlagsDuringRemoteInterviewProcess from "./posts/red-flags-during-remote-interview-process";
import freelanceContractsAndInvoicingBasics from "./posts/freelance-contracts-and-invoicing-basics";
import bestPlatformsForFindingFreelanceRemoteWork from "./posts/best-platforms-for-finding-freelance-remote-work";
import transitioningIntoAiCareersFromOtherTechRoles from "./posts/transitioning-into-ai-careers-from-other-tech-roles";
import bestAiCertificationsForRemoteJobs from "./posts/best-ai-certifications-for-remote-jobs";
import githubProfilePortfolioForDeveloperJobSearch from "./posts/github-profile-portfolio-for-developer-job-search";
import remoteJobNetworkingWithoutEventsGuide from "./posts/remote-job-networking-without-events-guide";
import remoteJobsIndiaGlobalCompanies from "./posts/remote-jobs-india-global-companies";
import remoteJobsLatinAmericaGuide from "./posts/remote-jobs-latin-america-guide";
import remoteJobsNigeriaAfricaGuide from "./posts/remote-jobs-nigeria-africa-guide";
import remoteProductManagerJobsGuide from "./posts/remote-product-manager-jobs-guide";
import remoteHrPeopleOpsJobsGuide from "./posts/remote-hr-people-ops-jobs-guide";
import remoteBookkeepingAccountingJobsGuide from "./posts/remote-bookkeeping-accounting-jobs-guide";
import resumeForCareerChangersGuide from "./posts/resume-for-career-changers-guide";
import resumeForOlderExperiencedWorkers from "./posts/resume-for-older-experienced-workers";
import interviewFollowUpThankYouEmailGuide from "./posts/interview-follow-up-thank-you-email-guide";
import preparingForReferenceChecks from "./posts/preparing-for-reference-checks";
import freelanceToFullTimeRemoteTransition from "./posts/freelance-to-full-time-remote-transition";
import buildingRecurringFreelanceClients from "./posts/building-recurring-freelance-clients";
import remoteAiEthicsGovernanceJobsGuide from "./posts/remote-ai-ethics-governance-jobs-guide";
import mlEngineerVsDataScientistRemoteRoles from "./posts/ml-engineer-vs-data-scientist-remote-roles";
import usingAiToolsEthicallyInYourJobSearch from "./posts/using-ai-tools-ethically-in-your-job-search";
import deepWorkForRemoteWorkersGuide from "./posts/deep-work-for-remote-workers-guide";
import asyncCommunicationSkillsRemoteTeams from "./posts/async-communication-skills-remote-teams";
import workLifeBoundariesRemoteWorkGuide from "./posts/work-life-boundaries-remote-work-guide";
import understandingEquityStockOptionsRemoteOffers from "./posts/understanding-equity-stock-options-remote-offers";
import buildingAPersonalBrandBeyondLinkedin from "./posts/building-a-personal-brand-beyond-linkedin";
import careerPivotIntoTechFromNonTechBackground from "./posts/career-pivot-into-tech-from-non-tech-background";

export const BLOG_CATEGORIES = [
  { slug: "remote-work", name: "Remote Work" },
  { slug: "resume-tips", name: "Resume Tips" },
  { slug: "interview-prep", name: "Interview Prep" },
  { slug: "career-growth", name: "Career Growth" },
  { slug: "engineering", name: "Software Engineering" },
  { slug: "ai-careers", name: "AI Careers" },
  { slug: "freelancing", name: "Freelancing" },
  { slug: "linkedin", name: "LinkedIn & Personal Branding" },
  { slug: "remote-roles", name: "Remote Job Roles" },
];

export const BLOG_POSTS = [
  howToFindLegitimateRemoteJobs2026,
  resumeTipsThatActuallyGetYouInterviews,
  whatIsAnAtsResumeAndWhyItMatters,
  writingACoverLetterThatDoesntSoundGeneric,
  interviewPreparationFrameworkThatWorks,
  breakingIntoAiCareersWithoutAPhd,
  softwareEngineeringCareerLaddersExplained,
  reactBestPracticesFor2026,
  pythonSkillsRemoteEmployersActuallyWant,
  javascriptFundamentalsStillWorthMastering,
  remoteWorkProductivityWithoutBurnout,
  freelancingVsFullTimeRemoteWork,
  careerGrowthPlanForRemoteEmployees,
  remoteJobsNoExperienceRequired,
  remotePythonDeveloperJobsGuide,
  remoteJobsInCanadaInternationalApplicants,
  promptEngineerJobsGuide,
  resumeForRemoteJobsAtsGuide,
  remoteJobInterviewQuestionsAndAnswers,
  salaryNegotiationScriptsRemoteJobOffers,
  remoteJobsForBeginnersGuide,
  remoteJobsInGermanyGuide,
  aiResumeCheckerGuide,
  bestResumeFormatForRemoteJobs,
  remoteInterviewEtiquette,
  codingInterviewPrepRemoteJobs,
  remoteWorkBurnoutRecovery,
  remoteReactDeveloperJobs,
  remoteSoftwareEngineerJobsGuide,
  remoteAiJobsGuide,
  workFromHomeCareersGrowing2026,
  bestRemoteCompaniesHiringGuide,
  resumeLengthGuide2026,
  remoteWorkSkillsResumeNoExperience,
  panelInterviewPrepRemoteJob,
  salaryExpectationInterviewAnswer,
  findAMentorRemoteWork,
  timeManagementRemoteWorkers,
  gitGithubSkillsRemoteDevelopers,
  freelanceRemoteJobsForBeginners,
  remoteDevopsSreJobsGuide,
  remoteDataAnalystJobsGuide,
  remoteProductDesignerJobsGuide,
  remoteDigitalMarketingJobsGuide,
  remoteJobsUnitedKingdomGuide,
  remoteJobsAustraliaGuide,
  starMethodBehavioralInterviewAnswers,
  systemDesignInterviewPrepRemoteEngineers,
  takeHomeTechnicalAssignmentTips,
  howToPriceFreelanceRemoteWorkRates,
  optimizingLinkedinProfileRemoteRecruiters,
  remoteJobPortfolioWebsiteGuide,
  remoteWorkHomeOfficeSetupGuide,
  digitalNomadVisasRemoteWorkGuide,
  remoteQaTestEngineerJobsGuide,
  remoteCybersecurityJobsGuide,
  remoteDataScientistJobsGuide,
  nextjsDeveloperJobsGuide,
  awsCloudCertificationsRemoteJobsGuide,
  remoteCustomerSupportJobsGuide,
  remoteSalesSdrJobsGuide,
  remoteVirtualAssistantJobsGuide,
  remoteProjectManagerJobsGuide,
  remoteJobsNetherlandsGuide,
  remoteTechnicalWriterJobsGuide,
  costOfLivingAdjustedRemoteSalaries,
  resumeKeywordsByIndustryGuide,
  resumeSummaryExamplesThatWork,
  resumeBulletPointFormulaGuide,
  explainingEmploymentGapsOnAResume,
  asyncVideoInterviewTips,
  negotiatingMultipleJobOffers,
  redFlagsDuringRemoteInterviewProcess,
  freelanceContractsAndInvoicingBasics,
  bestPlatformsForFindingFreelanceRemoteWork,
  transitioningIntoAiCareersFromOtherTechRoles,
  bestAiCertificationsForRemoteJobs,
  githubProfilePortfolioForDeveloperJobSearch,
  remoteJobNetworkingWithoutEventsGuide,
  remoteJobsIndiaGlobalCompanies,
  remoteJobsLatinAmericaGuide,
  remoteJobsNigeriaAfricaGuide,
  remoteProductManagerJobsGuide,
  remoteHrPeopleOpsJobsGuide,
  remoteBookkeepingAccountingJobsGuide,
  resumeForCareerChangersGuide,
  resumeForOlderExperiencedWorkers,
  interviewFollowUpThankYouEmailGuide,
  preparingForReferenceChecks,
  freelanceToFullTimeRemoteTransition,
  buildingRecurringFreelanceClients,
  remoteAiEthicsGovernanceJobsGuide,
  mlEngineerVsDataScientistRemoteRoles,
  usingAiToolsEthicallyInYourJobSearch,
  deepWorkForRemoteWorkersGuide,
  asyncCommunicationSkillsRemoteTeams,
  workLifeBoundariesRemoteWorkGuide,
  understandingEquityStockOptionsRemoteOffers,
  buildingAPersonalBrandBeyondLinkedin,
  careerPivotIntoTechFromNonTechBackground,
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
