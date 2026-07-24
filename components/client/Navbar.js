"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import Button from "@/components/ui/Button";
import { useAuth } from "@/lib/auth/AuthContext";
import PremiumToolsMenu from "@/components/premium/PremiumToolsMenu";
import PremiumBadge from "@/components/premium/PremiumBadge";
import { PREMIUM_NAV_LINKS } from "@/lib/premium/premiumNav";
import styles from "./Navbar.module.css";

// Mobile nav uses the full site link list — unchanged (see the
// "Mobile navbar must remain unchanged" requirement in Phase UX-2.1).
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

// Phase UX-2.1: the desktop bar was overflowing — too many nav links +
// action buttons competing for the same row, with no room to shrink.
// Rather than hiding the overflow with CSS or shrinking type/logo, the
// desktop row itself is trimmed to only the essentials. Everything
// dropped here is still reachable: Home/Blog/About/Contact live in the
// footer (components/server/Footer.js), and Resume Builder/Cover
// Letters are already Dashboard quick actions
// (lib/dashboard/quickActions.js) — nothing lost, just not duplicated
// in the navbar too. Mobile keeps the full NAV_LINKS list above.
const DESKTOP_NAV_LINKS = [
  { href: "/jobs", label: "Jobs" },
  { href: "/pricing", label: "Pricing" },
];

/**
 * Site navigation. Marked "use client" because the mobile menu needs
 * local open/closed state — this is the one interactive seam in an
 * otherwise server-rendered layout. Everything it renders that doesn't
 * need interactivity (Logo, Button-as-link) stays a plain component that
 * happens to be included in this client boundary.
 */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  function isActive(href) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  // Close the mobile menu on route-independent viewport resize back to desktop.
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 780) setIsOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className={styles.header}>
      <div className={`container ${styles.bar}`}>
        <Link href="/" className={styles.brand} onClick={() => setIsOpen(false)}>
          <Logo size={26} />
        </Link>

        <nav className={styles.desktopNav} aria-label="Primary">
          <ul>
            {DESKTOP_NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive(link.href) ? styles.navLinkActive : undefined}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.desktopActions}>
          {user ? (
            <>
              <PremiumToolsMenu />
              <Button href="/dashboard" variant="ghost">
                Dashboard
              </Button>
              <Button href="/saved-jobs" variant="ghost">
                Saved Jobs
              </Button>
              <Button variant="secondary" onClick={() => logout()}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost">
                Log in
              </Button>
              <Button href="/register" variant="primary">
                Sign up
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className={styles.menuToggle}
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <span className={styles.menuIcon} data-open={isOpen} />
        </button>
      </div>

      <nav
        id="mobile-nav"
        className={styles.mobileNav}
        data-open={isOpen}
        aria-label="Mobile"
      >
        <ul>
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={isActive(link.href) ? styles.navLinkActive : undefined}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className={styles.mobileActions}>
          <Button href="/jobs" variant="secondary" onClick={() => setIsOpen(false)}>
            Browse jobs
          </Button>
          {user ? (
            <>
              <Button href="/dashboard" variant="primary" onClick={() => setIsOpen(false)}>
                Dashboard
              </Button>
              <Button href="/resumes" variant="secondary" onClick={() => setIsOpen(false)}>
                Resume Builder
              </Button>
              <Button href="/cover-letters" variant="ghost" onClick={() => setIsOpen(false)}>
                Cover Letters
              </Button>
              <Button href="/saved-jobs" variant="ghost" onClick={() => setIsOpen(false)}>
                Saved Jobs
              </Button>
              {PREMIUM_NAV_LINKS.map((item) => (
                <Button
                  key={item.href}
                  href={item.href}
                  variant="ghost"
                  onClick={() => setIsOpen(false)}
                  style={{ justifyContent: "space-between", width: "100%" }}
                >
                  <span>{item.label}</span>
                  <PremiumBadge feature={item.feature} />
                </Button>
              ))}
              <Button
                variant="ghost"
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
              >
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button href="/login" variant="ghost" onClick={() => setIsOpen(false)}>
                Log in
              </Button>
              <Button href="/register" variant="primary" onClick={() => setIsOpen(false)}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
