import Link from "next/link";

/**
 * Polymorphic button. Renders a Next.js <Link> when `href` is provided
 * (internal navigation, e.g. nav CTAs), otherwise a native <button>
 * (e.g. form submits added in a later phase).
 *
 * Server Component — has no interactivity of its own, so it stays out of
 * the client bundle. Pages/Client Components can still pass an onClick
 * when they render it inside a "use client" boundary.
 *
 * @param {object} props
 * @param {"primary"|"secondary"|"ghost"} [props.variant]
 * @param {"md"|"lg"} [props.size]
 * @param {string} [props.href]
 */
export default function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  className = "",
  ...rest
}) {
  const classes = ["btn", `btn-${variant}`, size === "lg" ? "btn-lg" : "", className]
    .filter(Boolean)
    .join(" ");

  if (href) {
    return (
      <Link href={href} className={classes} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
