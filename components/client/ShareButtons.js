"use client";

import { useState } from "react";

export default function ShareButtons({ url, title }) {
  const [copied, setCopied] = useState(false);

  async function handleCopyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Non-critical convenience action — fail silently if clipboard access is denied.
    }
  }

  async function handleNativeShare() {
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {
        // User cancelled the share sheet — not an error.
      }
    }
  }

  const twitterHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const linkedinHref = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
      <span style={{ fontSize: "0.85em", color: "var(--color-text-muted)" }}>Share:</span>
      <a href={twitterHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "0.35rem 0.7rem" }}>
        X / Twitter
      </a>
      <a href={linkedinHref} target="_blank" rel="noopener noreferrer" className="btn btn-ghost" style={{ padding: "0.35rem 0.7rem" }}>
        LinkedIn
      </a>
      <button type="button" className="btn btn-ghost" style={{ padding: "0.35rem 0.7rem" }} onClick={handleCopyLink}>
        {copied ? "Copied ✓" : "Copy link"}
      </button>
      {typeof navigator !== "undefined" && navigator.share && (
        <button type="button" className="btn btn-ghost" style={{ padding: "0.35rem 0.7rem" }} onClick={handleNativeShare}>
          Share…
        </button>
      )}
    </div>
  );
}
