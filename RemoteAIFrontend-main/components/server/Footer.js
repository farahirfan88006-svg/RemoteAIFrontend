import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { siteConfig } from "@/lib/seo/siteConfig";
import styles from "./Footer.module.css";

const QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const LEGAL_LINKS = [
  { href: "/privacy-policy", label: "Privacy policy" },
  { href: "/terms", label: "Terms of service" },
];

/**
 * Site footer. Pure server component — no state, no browser APIs, so it
 * never needs to ship JS to the client.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        <div className={styles.about}>
          <Logo size={26} />
          <p className={styles.tagline}>{siteConfig.tagline}</p>
          <p className={styles.description}>{siteConfig.description}</p>
        </div>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Quick links</span>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.column}>
          <span className={styles.columnTitle}>Company</span>
          <ul>
            <li>{siteConfig.company.legalName}</li>
            <li>Founded {siteConfig.company.foundedYear}</li>
            <li>
              <a href={`mailto:${siteConfig.contactEmail}`}>{siteConfig.contactEmail}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className={`container ${styles.bottomBar}`}>
        <span>
          © {year} {siteConfig.company.legalName}. All rights reserved.
        </span>
        <ul className={styles.legalList}>
          {LEGAL_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
