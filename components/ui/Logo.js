/**
 * Logo placeholder. A simple lettermark rendered as inline SVG so it needs
 * no external asset and stays crisp at any size. Swap the <svg> markup for
 * a real brand mark when one exists — everything that renders the logo
 * (Navbar, Footer) imports this single component.
 */
export default function Logo({ size = 28, showWordmark = true, className = "" }) {
  return (
    <span className={`logo ${className}`.trim()}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="var(--color-accent)" />
        <circle cx="11" cy="16" r="3.2" fill="var(--color-accent-contrast)" />
        <circle cx="21" cy="16" r="3.2" fill="var(--color-accent-contrast)" />
        <path
          d="M11 16h10"
          stroke="var(--color-accent-contrast)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
      {showWordmark && <span className="logo-wordmark">RemoteAI</span>}
    </span>
  );
}
