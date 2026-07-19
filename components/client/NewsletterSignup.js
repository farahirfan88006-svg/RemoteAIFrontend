"use client";

import { useState } from "react";

/**
 * Newsletter signup — UI only. There's no email/newsletter service
 * configured anywhere in this project (no SendGrid/Mailchimp/etc.
 * credentials, no backend endpoint for it), so wiring this to actually
 * send/store subscriptions would mean inventing a fake integration.
 * Instead this is honestly a presentational component: submitting shows
 * a confirmation state locally, and does not persist or send anything.
 * Swapping in a real provider later just means replacing `handleSubmit`.
 */
export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  }

  return (
    <div className="card glass" style={{ padding: "var(--space-lg)", textAlign: "center" }}>
      <h3 style={{ marginTop: 0 }}>Get career tips in your inbox</h3>
      <p style={{ color: "var(--color-text-muted)" }}>Remote job trends, resume advice, and interview prep — no spam.</p>
      {submitted ? (
        <p style={{ fontWeight: 600 }}>You&apos;re on the list — thanks!</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "0.6rem", minWidth: 220, flex: "1 1 220px" }}
            aria-label="Email address"
          />
          <button type="submit" className="btn btn-primary">
            Subscribe
          </button>
        </form>
      )}
    </div>
  );
}
