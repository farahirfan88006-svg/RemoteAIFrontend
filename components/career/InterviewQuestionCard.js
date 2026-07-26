"use client";

import { useState } from "react";
import DifficultyBadge from "./DifficultyBadge";
import styles from "./AITools.module.css";

/**
 * One mock interview question: the question text, a difficulty badge,
 * and a "Show Answer" toggle that reveals the suggested answer without
 * navigating away — each card owns its own open/closed state so
 * expanding one question doesn't affect the others.
 */
export default function InterviewQuestionCard({ question, difficulty, suggestedAnswer, index }) {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className={styles.questionCard}>
      <div className={styles.questionHeader}>
        <div>
          {typeof index === "number" && <div className={styles.questionIndex}>Question {index + 1}</div>}
          <h4 style={{ margin: 0, marginTop: "0.15rem" }}>{question}</h4>
        </div>
        <DifficultyBadge difficulty={difficulty} />
      </div>

      <button
        type="button"
        className="btn btn-ghost"
        style={{ marginTop: "var(--space-sm)", paddingInline: 0 }}
        onClick={() => setShowAnswer((v) => !v)}
        aria-expanded={showAnswer}
      >
        {showAnswer ? "Hide model answer" : "Show model answer"}
      </button>

      {showAnswer && (
        <p className={styles.answerReveal}>
          {suggestedAnswer}
        </p>
      )}
    </div>
  );
}
