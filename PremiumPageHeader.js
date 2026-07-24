import PremiumBadge from "./PremiumBadge";

/**
 * Shared header for premium feature pages — eyebrow, title, description,
 * and a Premium badge, in the same shape every AI Workspace page uses
 * (Resume Analyzer, Job Match Score, Cover Letter Generator, Mock
 * Interview, Career Coach). Rendered outside PremiumRoute/FeatureGuard
 * so it's always visible (including to signed-out visitors and search
 * engines) — only the interactive tool underneath gets locked.
 */
export default function PremiumPageHeader({ eyebrow, title, description, feature }) {
  return (
    <div className="ai-page-header">
      <span className="eyebrow">
        <span className="dot" />
        {eyebrow}
      </span>
      <div className="ai-page-header__top">
        <h1 className="ai-page-header__title">{title}</h1>
        <PremiumBadge feature={feature} />
      </div>
      {description && <p className="ai-page-header__description">{description}</p>}
    </div>
  );
}
