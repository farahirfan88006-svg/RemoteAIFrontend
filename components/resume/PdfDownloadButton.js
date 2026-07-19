"use client";

import { useState } from "react";

/**
 * "Download PDF" — generates the PDF entirely in the browser via
 * @react-pdf/renderer's `pdf(...).toBlob()`, then triggers a normal file
 * download. No round trip to the backend and no headless-browser/PDF
 * microservice: @react-pdf/renderer builds a real PDF document tree
 * (see ResumePdfDocument.js) directly from React elements, so this is
 * both simpler to run and produces genuinely ATS-parseable text — see
 * ResumePdfDocument.js's top comment for why that matters over an
 * html-screenshot-to-PDF approach.
 *
 * The `@react-pdf/renderer` import is deliberately inside the click
 * handler, not at module top-level: it's a sizeable library only ever
 * needed at the moment of export, not on every page load of the editor.
 */
export default function PdfDownloadButton({ resume }) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");

  async function handleDownload() {
    setIsGenerating(true);
    setError("");
    try {
      const [{ pdf }, { default: ResumePdfDocument }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./ResumePdfDocument"),
      ]);

      const blob = await pdf(<ResumePdfDocument resume={resume} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${(resume.title || "resume").replace(/[^a-z0-9-_]+/gi, "-")}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError("Couldn't generate the PDF — please try again.");
      // eslint-disable-next-line no-console
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={handleDownload} disabled={isGenerating}>
        {isGenerating ? "Generating PDF…" : "Download PDF"}
      </button>
      {error && <p style={{ color: "crimson", fontSize: "0.85em", marginTop: "0.25rem" }}>{error}</p>}
    </div>
  );
}
