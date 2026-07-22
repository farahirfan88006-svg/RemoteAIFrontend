import Link from "next/link";
import JsonLd from "@/components/server/JsonLd";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";
import styles from "./page.module.css";

const LAST_UPDATED = "July 22, 2026";

const SECTIONS = [
  {
    heading: "1. Acceptance of Terms",
    body: `By accessing or using ${siteConfig.name} (the "Platform"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not access or use the Platform. If you are using the Platform on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.`,
  },
  {
    heading: "2. Description of RemoteAI",
    body: `${siteConfig.name} is a platform that helps candidates discover remote job opportunities and helps them prepare for those opportunities through AI-assisted tools, including resume building, resume analysis, cover letter generation, career coaching, mock interviews, and match scoring. We do not employ candidates directly and are not a party to any employment relationship formed between a candidate and a hiring company.`,
  },
  {
    heading: "3. Eligibility",
    body: "You must be at least 18 years old, or the age of legal majority in your jurisdiction, to create an account and use the Platform. By using the Platform, you represent and warrant that you meet this requirement and that any information you provide during registration is accurate, current, and complete.",
  },
  {
    heading: "4. User Responsibilities",
    body: "You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account. You agree to provide accurate information in your profile, resume, and job applications, and to promptly update that information if it changes. You are solely responsible for the content you submit, including its accuracy and legality.",
  },
  {
    heading: "5. Acceptable Use",
    body: `You agree not to misuse the Platform. This includes, without limitation: attempting to gain unauthorized access to any part of the Platform or another user's account; scraping, crawling, or harvesting data without our prior written consent; uploading false, misleading, or fraudulent job listings, resumes, or credentials; interfering with or disrupting the Platform's operation or security; impersonating any person or entity; and using the Platform for any unlawful purpose. We reserve the right to suspend or terminate accounts that violate this section.`,
  },
  {
    heading: "6. Job Listings Disclaimer",
    body: `Job listings displayed on ${siteConfig.name} are sourced from third-party employers, job boards, and public postings. We do not guarantee the accuracy, completeness, availability, or legitimacy of any listing, and we do not endorse any employer whose listing appears on the Platform. You are responsible for independently verifying any opportunity, including the employer's identity and the terms of employment, before applying or accepting an offer.`,
  },
  {
    heading: "7. AI Features Disclaimer",
    body: `${siteConfig.name} uses artificial intelligence to power features such as job matching, match scoring, career coaching, and mock interviews. AI-generated content and recommendations are provided for informational and guidance purposes only, may be incomplete or inaccurate, and should not be treated as a guarantee of outcome, employment, or suitability for any role. You should apply your own judgment, and where appropriate seek independent advice, before relying on any AI-generated output.`,
  },
  {
    heading: "8. Resume Builder Disclaimer",
    body: "Our resume builder and resume analysis tools are designed to help you organize and present your professional experience. We do not guarantee that a resume created or optimized using these tools will result in interviews, offers, or employment. You remain responsible for reviewing all generated content for accuracy before submitting it to any employer, and for ensuring it truthfully represents your background and qualifications.",
  },
  {
    heading: "9. Career Advice Disclaimer",
    body: `Career coaching, interview preparation, and related guidance available through ${siteConfig.name} are provided for general informational purposes only and do not constitute professional, legal, financial, or career counseling advice. Outcomes vary by individual, and we make no representations or warranties regarding the results you may achieve by following any advice provided through the Platform.`,
  },
  {
    heading: "10. Intellectual Property",
    body: `The Platform, including its design, text, graphics, logos, software, and underlying technology, is owned by ${siteConfig.company.legalName} or its licensors and is protected by applicable intellectual property laws. You retain ownership of the content you submit, such as your resume and profile information, but you grant us a limited, non-exclusive, worldwide license to use, host, and display that content as necessary to operate and provide the Platform's features to you. You may not copy, modify, distribute, or create derivative works from any part of the Platform without our prior written consent.`,
  },
  {
    heading: "11. Third-Party Links",
    body: `The Platform may contain links to third-party websites, services, or job listings that are not owned or controlled by ${siteConfig.name}. We are not responsible for the content, privacy practices, or terms of any third-party site. Accessing a third-party link is at your own risk, and we encourage you to review the applicable terms and privacy policy of any third-party service before using it.`,
  },
  {
    heading: "12. Limitation of Liability",
    body: `To the fullest extent permitted by law, ${siteConfig.company.legalName} and its officers, employees, and affiliates will not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of income, data, or opportunity, arising out of or related to your use of the Platform, including reliance on any job listing, AI-generated content, or career advice. The Platform is provided on an "as is" and "as available" basis, without warranties of any kind, whether express or implied.`,
  },
  {
    heading: "13. Privacy",
    body: (
      <>
        Your use of the Platform is also governed by our{" "}
        <Link href="/privacy-policy" className={styles.link}>
          Privacy Policy
        </Link>
        , which explains how we collect, use, and protect your personal
        information. By using the Platform, you consent to the practices
        described in that policy.
      </>
    ),
  },
  {
    heading: "14. Changes to Terms",
    body: "We may update these Terms from time to time to reflect changes to the Platform or applicable law. If we make material changes, we will update the date at the top of this page. Your continued use of the Platform after any change takes effect constitutes acceptance of the revised Terms.",
  },
  {
    heading: "15. Governing Law",
    body: `These Terms are governed by and construed in accordance with the laws applicable to ${siteConfig.company.legalName}'s place of incorporation, without regard to conflict-of-law principles. Any disputes arising from these Terms or your use of the Platform will be subject to the exclusive jurisdiction of the courts located in that jurisdiction, unless otherwise required by applicable law.`,
  },
];

export async function generateMetadata() {
  const title = "Terms of Service";
  const description = `The terms and conditions that govern your use of ${siteConfig.name}, including job listings, AI features, and account responsibilities.`;

  return {
    title,
    description,
    alternates: { canonical: "/terms" },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/terms`,
    },
  };
}

export default function TermsPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Terms of Service", path: "/terms" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className={styles.intro}>
        <div className="container">
          <span className="eyebrow">
            <span className="dot" />
            Legal
          </span>
          <h1 className={styles.heading}>Terms of Service</h1>
          <p className={styles.updated}>Last updated: {LAST_UPDATED}</p>
          <p className={styles.subheading}>
            These Terms of Service govern your access to and use of{" "}
            {siteConfig.name}. Please read them carefully before using the
            Platform — they apply to every candidate and hiring company that
            uses our services.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.content}>
            {SECTIONS.map((section) => (
              <article key={section.heading} className={styles.entry}>
                <h2 className={styles.entryHeading}>{section.heading}</h2>
                <p className={styles.entryBody}>{section.body}</p>
              </article>
            ))}

            <article className={styles.entry}>
              <h2 className={styles.entryHeading}>16. Contact Information</h2>
              <p className={styles.entryBody}>
                If you have questions about these Terms, email us at{" "}
                <a href={`mailto:${siteConfig.contactEmail}`} className={styles.link}>
                  {siteConfig.contactEmail}
                </a>{" "}
                or visit our{" "}
                <Link href="/contact" className={styles.link}>
                  contact page
                </Link>
                .
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
