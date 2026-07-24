"use client";

import { useState } from "react";

/** Copies `text` to the clipboard and shows a brief "Copied" confirmation. */
export default function CopyButton({ text, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard API unavailable/denied — fail silently, no destructive fallback needed.
    }
  }

  return (
    <button type="button" className="btn btn-ghost" onClick={handleCopy} disabled={!text}>
      {copied ? "Copied ✔" : label}
    </button>
  );
}
