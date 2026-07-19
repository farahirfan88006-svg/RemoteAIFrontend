import Link from "next/link";
import JsonLd from "@/components/server/JsonLd";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";
import styles from "./page.module.css";

const LAST_UPDATED = "July 12, 2026";

const SECTIONS = [
  {
    heading: "Information we collect",
    body: "When you create a profile, apply to a role, or contact us, we collect the information you provide directly — such as your name, email address, resume content, and job preferences. We also collect basic usage data (pages visited, actions taken) to keep the platform working reliably.",
  },
  {
    heading: "How we use your information",
    body: `We use your information to operate ${siteConfig.name}: matching you with relevant remote roles, sharing your application with companies you apply to, communicating with you about your account, and improving how our matching works over time.`,
  },
  {
    heading: "How we share information",
    body: "We share your profile and application materials with the companies you choose to apply to. We do not sell your personal information to third parties. We may share limited data with service providers who help us operate the platform, under confidentiality obligations.",
  },
  {
    heading: "Cookies and tracking",
    body: "We use essential cookies to keep you signed in and remember your preferences, and limited analytics cookies to understand how the platform is used. You can control cookies through your browser settings.",
  },
  {
    heading: "Data retention",
    body: "We retain your information for as long as your account is active, or as needed to provide the service. You can request deletion of your account and associated data at any time.",
  },
  {
    heading: "Your rights",
    body: "Depending on where you live, you may have the right to access, correct, export, or delete your personal information. To exercise any of these rights, contact us using the details below.",
  },
  {
    heading: "Changes to this policy",
    body: "We may update this policy as the platform evolves. Material changes will be reflected by an updated date at the top of this page.",
  },
];

export async function generateMetadata() {
  const title = "Privacy Policy";
  const description = `How ${siteConfig.name} collects, uses, and protects your personal information.`;

  return {
    title,
    description,
    alternates: { canonical: "/privacy-policy" },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/privacy-policy`,
    },
  };
}

export default function PrivacyPolicyPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy-policy" },
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
          <h1 className={styles.heading}>Privacy Policy</h1>
          <p className={styles.updated}>Last updated: {LAST_UPDATED}</p>
          <p className={styles.subheading}>
            This policy explains what information {siteConfig.name} collects,
            how we use it, and the choices you have. It applies to everyone
            who uses the platform — candidates and hiring companies alike.
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
              <h2 className={styles.entryHeading}>Contact us</h2>
              <p className={styles.entryBody}>
                If you have questions about this policy or want to exercise
                your rights over your data, email us at{" "}
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
