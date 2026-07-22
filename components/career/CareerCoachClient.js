"use client";

import { useState } from "react";
import PremiumRoute from "@/components/premium/PremiumRoute";
import PremiumPageHeader from "@/components/premium/PremiumPageHeader";
import StringListEditor from "@/components/resume/StringListEditor";
import RoadmapTimeline from "@/components/career/RoadmapTimeline";
import { buildRoadmap } from "@/lib/career/mockCareerCoach";

const inputStyle = { width: "100%", padding: "0.5rem" };
const fieldStyle = { display: "grid", gap: "0.25rem" };

export default function CareerCoachClient() {
  const [currentRole, setCurrentRole] = useState("");
  const [yearsExperience, setYearsExperience] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [skills, setSkills] = useState([]);
  const [country, setCountry] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!currentRole.trim() || !targetRole.trim()) {
      setError("Enter both your current role and your target role.");
      return;
    }
    setRoadmap(buildRoadmap({ currentRole, yearsExperience, targetRole, skills, country }));
  }

  return (
    <section className="section">
      <div className="container">
        <PremiumPageHeader
          eyebrow="AI Career Coach"
          title="Get a personalized career roadmap"
          description="Tell us where you are and where you want to go — we'll map out the skills, timeline, and milestones for the jump."
          feature="careerCoach"
        />

        <PremiumRoute feature="careerCoach">
          <form onSubmit={handleSubmit} className="card" style={{ padding: "var(--space-lg)" }}>
            <div style={{ display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
              <label style={fieldStyle}>
                <span style={{ fontSize: "0.85em" }}>Current role</span>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="e.g. Backend Engineer"
                  value={currentRole}
                  onChange={(e) => setCurrentRole(e.target.value)}
                />
              </label>
              <label style={fieldStyle}>
                <span style={{ fontSize: "0.85em" }}>Years of experience</span>
                <input
                  style={inputStyle}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="e.g. 4"
                  value={yearsExperience}
                  onChange={(e) => setYearsExperience(e.target.value)}
                />
              </label>
              <label style={fieldStyle}>
                <span style={{ fontSize: "0.85em" }}>Target role</span>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="e.g. Engineering Manager"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </label>
              <label style={fieldStyle}>
                <span style={{ fontSize: "0.85em" }}>Country</span>
                <input
                  style={inputStyle}
                  type="text"
                  placeholder="e.g. Canada"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                />
              </label>
            </div>

            <StringListEditor title="Skills" items={skills} onChange={setSkills} placeholder="Add a skill — press Enter" />

            {error && <p style={{ color: "crimson", marginTop: "var(--space-sm)" }}>{error}</p>}

            <button type="submit" className="btn btn-primary btn-lg" style={{ marginTop: "var(--space-lg)" }}>
              Generate my roadmap
            </button>
          </form>

          {roadmap && <RoadmapTimeline roadmap={roadmap} />}
        </PremiumRoute>
      </div>
    </section>
  );
}
