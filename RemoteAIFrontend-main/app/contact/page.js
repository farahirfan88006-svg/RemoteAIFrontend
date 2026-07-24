import Card from "@/components/ui/Card";
import JsonLd from "@/components/server/JsonLd";
import ContactForm from "@/components/client/ContactForm";
import { siteConfig } from "@/lib/seo/siteConfig";
import { buildBreadcrumbSchema } from "@/lib/seo/schemas";
import styles from "./page.module.css";

/**
 * Real contact info only — one verified inbox, no invented phone
 * numbers, office addresses, or social accounts.
 */
const CONTACT_CHANNELS = [
  {
    label: "Email",
    value: siteConfig.contactEmail,
    href: `mailto:${siteConfig.contactEmail}`,
  },
];

const CONTACT_REASONS = [
  "General questions",
  "Technical support",
  "Bug reports",
  "Feature requests",
  "Business inquiries",
  "Partnership opportunities",
];

export async function generateMetadata() {
  const title = "Contact";
  const description =
    "Get in touch with RemoteAI — general questions, technical support, bug reports, feature requests, business inquiries, and partnership opportunities.";

  return {
    title,
    description,
    alternates: { canonical: "/contact" },
    openGraph: {
      type: "website",
      title: `${title} | ${siteConfig.name}`,
      description,
      url: `${siteConfig.url}/contact`,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      images: [{ url: siteConfig.socialImage }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${siteConfig.name}`,
      description,
      images: [siteConfig.socialImage],
    },
  };
}

export default function ContactPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />

      <section className={styles.intro}>
        <div className="container">
          <span className="eyebrow">
            <span className="dot" />
            Contact
          </span>
          <h1 className={styles.heading}>Get in touch</h1>
          <p className={styles.subheading}>
            We&apos;d love to hear from you. Whether you have a question,
            found a bug, have a feature suggestion, or want to share
            feedback, feel free to get in touch.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className={styles.layout}>
            <div className={styles.channels}>
              <h2 className={styles.channelsHeading}>Reach us directly</h2>
              <div className={styles.channelList}>
                {CONTACT_CHANNELS.map((channel) => (
                  <Card key={channel.label} className={styles.channelCard}>
                    <span className={styles.channelLabel}>{channel.label}</span>
                    <a href={channel.href} className={styles.channelValue}>
                      {channel.value}
                    </a>
                  </Card>
                ))}
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoHeading}>
                  What can you contact us about?
                </h3>
                <ul className={styles.reasonsList}>
                  {CONTACT_REASONS.map((reason) => (
                    <li key={reason} className={styles.reasonItem}>
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.infoBlock}>
                <h3 className={styles.infoHeading}>Response time</h3>
                <p className={styles.responseTime}>
                  We aim to respond to most emails within 24–48 business
                  hours.
                </p>
              </div>
            </div>

            <div className={styles.formWrapper}>
              <h2 className={styles.formHeading}>Send a message</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
