/**
 * scripts/blogEsmResolver.mjs
 * ---------------------------------------------------------------------
 * Next.js's bundler resolves extensionless relative imports (e.g.
 * `import x from "./posts/my-post"`) automatically. Plain Node ESM does
 * not. lib/blog/posts.js relies on that Next-style resolution (by
 * design — see the comment at the top of that file), so
 * scripts/validateBlog.mjs registers this loader hook to get the same
 * behavior when running as a standalone Node script, without changing
 * any application source file's import style.
 */
export async function resolve(specifier, context, nextResolve) {
  try {
    return await nextResolve(specifier, context);
  } catch (err) {
    if (specifier.startsWith(".") && !/\.[a-zA-Z0-9]+$/.test(specifier)) {
      return nextResolve(`${specifier}.js`, context);
    }
    throw err;
  }
}
