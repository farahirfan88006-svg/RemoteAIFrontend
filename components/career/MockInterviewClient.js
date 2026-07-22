"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import TrackSelector from "@/components/career/TrackSelector";
import InterviewQuestionCard from "@/components/career/InterviewQuestionCard";
import { listTracks, getQuestionsForTrack, trackLabel } from "@/lib/career/mockInterviewQuestions";

export default function MockInterviewClient() {
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const tracks = listTracks();
  const questions = selectedTrackId ? getQuestionsForTrack(selectedTrackId) : [];

  return (
    <section className="section">
      <div className="container">
        <PremiumPageHeader
          eyebrow="AI Mock Interview"
          title="Practice with role-specific interview questions"
          description="Pick a track and get a set of realistic interview questions, each with a suggested answer you can reveal on demand."
          feature="mockInterviews"
        />

        <PremiumRoute feature="mockInterviews">
          <h3 style={{ marginBottom: "var(--space-sm)" }}>Choose a track</h3>
          <TrackSelector tracks={tracks} selectedTrackId={selectedTrackId} onSelect={setSelectedTrackId} />

          {selectedTrackId && (
            <div style={{ marginTop: "var(--space-xl)" }}>
              <h3 style={{ marginBottom: "var(--space-sm)" }}>{trackLabel(selectedTrackId)} questions</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
                {questions.map((q, i) => (
                  <InterviewQuestionCard key={i} question={q.question} difficulty={q.difficulty} suggestedAnswer={q.suggestedAnswer} />
                ))}
              </div>
            </div>
          )}
        </PremiumRoute>
      </div>
    </section>
  );
}
