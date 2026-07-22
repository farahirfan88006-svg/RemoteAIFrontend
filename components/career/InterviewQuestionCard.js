"use client";

import { useState } from "react";
import DifficultyBadge from "./DifficultyBadge";

/**
 * One mock interview question: the question text, a difficulty badge,
 * and a "Show Answer" toggle that reveals the suggested answer without
 * navigating away — each card owns its own open/closed state so
 * expanding one question doesn't affect the others.
 */
export default function InterviewQuestionCard({ question, difficulty, suggestedAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="card" style={{ padding: "var(--space-md) var(--space-lg)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "var(--space-sm)" }}>
        <h4 style={{ margin: 0 }}>{question}</h4>
        <DifficultyBadge difficulty={difficulty} />
      </div>

      <button
        type="button"
        className="btn btn-ghost"
        style={{ marginTop: "var(--space-sm)", paddingInline: 0 }}
        onClick={() => setShowAnswer((v) => !v)}
        aria-expanded={showAnswer}
      >
        {showAnswer ? "Hide answer" : "Show answer"}
      </button>

      {showAnswer && (
        <p style={{ marginTop: "var(--space-2xs)", paddingTop: "var(--space-2xs)", borderTop: "1px solid var(--color-border)" }}>
          {suggestedAnswer}
        </p>
      )}
    </div>
  );
}
