/**
 * Generic content card. Used by homepage feature grids today; general
 * enough to be reused by Jobs listings / Blog previews in later phases.
 */
export default function Card({ children, className = "", as: Tag = "div", ...rest }) {
  return (
    <Tag className={`card ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
