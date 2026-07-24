"use client";

/**
 * The action-row "Interview Questions" button needs an onClick (to
 * trigger the panel's own load-on-demand button and scroll to it) —
 * event handlers can't be attached to plain elements inside a Server
 * Component (see app/jobs/[slug]/page.js, which is one), so this small
 * link is its own Client Component rather than making the whole page
 * client-rendered just for this one interaction.
 */
export default function InterviewQuestionsTriggerLink() {
  function handleClick(e) {
    const trigger = document.getElementById("interview-questions-trigger");
    if (trigger) {
      e.preventDefault();
      trigger.click();
      trigger.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  return (
    <a href="#interview-questions" className="btn btn-secondary" onClick={handleClick}>
      🎯 Interview Questions
    </a>
  );
}
