"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      await register({ name, email, password });
      router.push("/resumes");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 420 }}>
        <span className="eyebrow">
          <span className="dot" />
          Account
        </span>
        <h1 style={{ marginTop: "var(--space-sm)" }}>Create your account</h1>

        <form onSubmit={handleSubmit} style={{ marginTop: "var(--space-lg)", display: "grid", gap: "var(--space-md)" }}>
          <label>
            Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="card"
              style={{ width: "100%", padding: "0.6rem 0.8rem" }}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="card"
              style={{ width: "100%", padding: "0.6rem 0.8rem" }}
            />
          </label>
          <label>
            Password
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="card"
              style={{ width: "100%", padding: "0.6rem 0.8rem" }}
            />
            <small>At least 8 characters, with a letter and a number.</small>
          </label>
          {error && <p style={{ color: "crimson" }}>{error}</p>}
          <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? "Creating account…" : "Create account"}
          </button>
        </form>

        <p style={{ marginTop: "var(--space-md)" }}>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </section>
  );
}
