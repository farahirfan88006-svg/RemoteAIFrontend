"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import styles from "./ContactForm.module.css";

const INITIAL_FIELDS = { name: "", email: "", reason: "general", message: "" };

/**
 * Contact form. Marked "use client" because it needs local state for the
 * field values and submission status — the one interactive seam on an
 * otherwise static page.
 *
 * Reason options mirror the real contact categories listed on the Contact
 * page (app/contact/page.js) rather than an unrelated candidate/employer
 * split, so the dropdown and the page copy stay in sync.
 *
 * No backend is wired up yet (per lib/api/client.js, which is intentionally
 * not connected to a real service). Submitting validates the fields and
 * shows a confirmation state locally; swapping in a real request later is a
 * matter of calling `apiFetch(\"/contact\", { method: \"POST\", body: fields })`
 * inside handleSubmit.
 */
export default function ContactForm() {
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [status, setStatus] = useState("idle"); // idle | submitted

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setStatus("submitted");
  }

  if (status === "submitted") {
    return (
      <div className={styles.confirmation} role="status">
        <span className="eyebrow">
          <span className="dot" />
          Message sent
        </span>
        <h3 className={styles.confirmationTitle}>Thanks, {fields.name.split(" ")[0] || "there"}.</h3>
        <p>We&apos;ll get back to you at {fields.email} within 24–48 business hours.</p>
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            setFields(INITIAL_FIELDS);
            setStatus("idle");
          }}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.field}>
        <label htmlFor="name">Full name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={fields.name}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={fields.email}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="reason">I&apos;m reaching out as a</label>
        <select id="reason" name="reason" value={fields.reason} onChange={handleChange}>
          <option value="general">General questions</option>
          <option value="technical">Technical support</option>
          <option value="bug">Bug reports</option>
          <option value="feature">Feature requests</option>
          <option value="business">Business inquiries</option>
          <option value="partnership">Partnership opportunities</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={fields.message}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className={styles.submit}>
        Send message
      </Button>
    </form>
  );
}
