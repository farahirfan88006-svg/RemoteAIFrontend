"use client";

/**
 * Generic editor for any "repeatable entry" resume section — Experience,
 * Education, Projects, Certifications, Skills, Languages, Awards,
 * Volunteer Experience, and References all share the same shape (a list
 * of small objects with a few fields, addable/removable/reorderable),
 * so one configurable component covers all of them instead of eight
 * near-duplicate ones.
 *
 * `fields`: [{ key, label, type: "text"|"textarea"|"date"|"checkbox", span2?: boolean }]
 * `dateRange`: true adds startDate/endDate/current controls automatically
 * (used by Experience/Education/Volunteer Experience).
 */
export default function ListSectionEditor({ title, items, fields, dateRange, onChange, addLabel = "+ Add" }) {
  function updateItem(index, key, value) {
    const next = items.map((item, i) => (i === index ? { ...item, [key]: value } : item));
    onChange(next);
  }

  function addItem() {
    const blank = Object.fromEntries(fields.map((f) => [f.key, f.type === "checkbox" ? false : ""]));
    if (dateRange) Object.assign(blank, { startDate: "", endDate: "", current: false });
    onChange([...items, blank]);
  }

  function removeItem(index) {
    onChange(items.filter((_, i) => i !== index));
  }

  function moveItem(index, direction) {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= items.length) return;
    const next = [...items];
    [next[index], next[targetIndex]] = [next[targetIndex], next[index]];
    onChange(next);
  }

  return (
    <div style={{ marginTop: "var(--space-lg)" }}>
      <h3>{title}</h3>
      <div style={{ display: "grid", gap: "var(--space-sm)" }}>
        {items.map((item, index) => (
          <div key={index} className="card" style={{ padding: "var(--space-sm)" }}>
            <div style={{ display: "grid", gap: "0.5rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {fields.map((field) => (
                <label key={field.key} style={{ gridColumn: field.span2 ? "1 / -1" : undefined }}>
                  <span style={{ fontSize: "0.85em" }}>{field.label}</span>
                  {field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={item[field.key] || ""}
                      onChange={(e) => updateItem(index, field.key, e.target.value)}
                      style={{ width: "100%", padding: "0.5rem" }}
                    />
                  ) : field.type === "checkbox" ? (
                    <input
                      type="checkbox"
                      checked={Boolean(item[field.key])}
                      onChange={(e) => updateItem(index, field.key, e.target.checked)}
                      style={{ marginLeft: "0.5rem" }}
                    />
                  ) : (
                    <input
                      type="text"
                      value={item[field.key] || ""}
                      onChange={(e) => updateItem(index, field.key, e.target.value)}
                      style={{ width: "100%", padding: "0.5rem" }}
                    />
                  )}
                </label>
              ))}

              {dateRange && (
                <>
                  <label>
                    <span style={{ fontSize: "0.85em" }}>Start date</span>
                    <input
                      type="text"
                      placeholder="YYYY-MM"
                      value={item.startDate || ""}
                      onChange={(e) => updateItem(index, "startDate", e.target.value)}
                      style={{ width: "100%", padding: "0.5rem" }}
                    />
                  </label>
                  <label>
                    <span style={{ fontSize: "0.85em" }}>End date</span>
                    <input
                      type="text"
                      placeholder="YYYY-MM"
                      disabled={Boolean(item.current)}
                      value={item.endDate || ""}
                      onChange={(e) => updateItem(index, "endDate", e.target.value)}
                      style={{ width: "100%", padding: "0.5rem" }}
                    />
                  </label>
                  <label>
                    <span style={{ fontSize: "0.85em" }}>Currently here</span>
                    <input
                      type="checkbox"
                      checked={Boolean(item.current)}
                      onChange={(e) => updateItem(index, "current", e.target.checked)}
                      style={{ marginLeft: "0.5rem" }}
                    />
                  </label>
                </>
              )}
            </div>

            <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.4rem" }}>
              <button type="button" className="btn btn-ghost" onClick={() => moveItem(index, -1)} disabled={index === 0}>
                ↑
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => moveItem(index, 1)} disabled={index === items.length - 1}>
                ↓
              </button>
              <button type="button" className="btn btn-ghost" style={{ color: "crimson" }} onClick={() => removeItem(index)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="btn btn-secondary" style={{ marginTop: "0.5rem" }} onClick={addItem}>
        {addLabel}
      </button>
    </div>
  );
}
