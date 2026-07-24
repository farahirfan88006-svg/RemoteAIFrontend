"use client";

import { useState, useId } from "react";
import DifficultyBadge from "./DifficultyBadge";

/**
 * One mock interview question: the question text, a difficulty badge,
 * and a "Show Answer" toggle that reveals the suggested answer without
 * navigating away — each card owns its own open/closed state so
 * expanding one question doesn't affect the others.
 */
export default function InterviewQuestionCard({ question, difficulty, suggestedAnswer }) {
  const [showAnswer, setShowAnswer] = useState(false);
  const answerId = useId();

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
        aria-controls={answerId}
      >
        {showAnswer ? "Hide answer" : "Show answer"}
      </button>

      {showAnswer && (
        <p id={answerId} className="ai-answer-panel">
          {suggestedAnswer}
        </p>
      )}
    </div>
  );
}
