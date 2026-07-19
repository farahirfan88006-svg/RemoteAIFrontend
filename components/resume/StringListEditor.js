"use client";

import { useState } from "react";

/** Simple add/remove editor for a plain string[] section (Interests). */
export default function StringListEditor({ title, items, onChange, placeholder = "Add and press Enter" }) {
  const [draft, setDraft] = useState("");

  function addItem() {
    const value = draft.trim();
    if (!value) return;
    onChange([...items, value]);
    setDraft("");
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  return (
    <div style={{ marginTop: "var(--space-lg)" }}>
      <h3>{title}</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "0.5rem" }}>
        {items.map((item, index) => (
          <span key={`${item}-${index}`} className="tag">
            {item}{" "}
            <button
              type="button"
              onClick={() => removeItem(index)}
              aria-label={`Remove ${item}`}
              style={{ border: "none", background: "none", cursor: "pointer", marginLeft: "0.25rem" }}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          value={draft}
          placeholder={placeholder}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addItem();
            }
          }}
          style={{ flex: 1, padding: "0.5rem" }}
        />
        <button type="button" className="btn btn-secondary" onClick={addItem}>
          Add
        </button>
      </div>
    </div>
  );
}
