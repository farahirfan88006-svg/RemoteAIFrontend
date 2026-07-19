/**
 * Consistent "nothing here yet" / "something went wrong" block, reused
 * across dashboards (Resumes, Cover Letters, Resume Analyzer history)
 * instead of each page writing its own ad hoc empty/error markup.
 */
export default function StateBlock({ icon = "📄", title, description, action, variant = "empty" }) {
  return (
    <div className={`state-block ${variant === "error" ? "state-block--error" : ""}`.trim()}>
      <span className="state-block__icon" aria-hidden="true">
        {icon}
      </span>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {description && <p style={{ maxWidth: 360 }}>{description}</p>}
      {action}
    </div>
  );
}
