/**
 * Small mono-font pill, used for metadata-style labels. Not used on the
 * homepage placeholder content yet, but the Jobs feature (location,
 * employment type, salary band) will lean on this heavily — defined now
 * so that feature doesn't reinvent it.
 */
export default function Tag({ children, className = "" }) {
  return <span className={`tag ${className}`.trim()}>{children}</span>;
}
