import { authFetch } from "@/lib/api/authClient";

const BASE = "/cover-letters";

export function generateCoverLetter({ resumeId, jobSlug }) {
  return authFetch(`${BASE}/generate`, { method: "POST", body: { resumeId, jobSlug } });
}

export function listCoverLetters() {
  return authFetch(BASE);
}

export function getCoverLetter(id) {
  return authFetch(`${BASE}/${id}`);
}

export function updateCoverLetter(id, patch) {
  return authFetch(`${BASE}/${id}`, { method: "PUT", body: patch });
}

export function deleteCoverLetter(id) {
  return authFetch(`${BASE}/${id}`, { method: "DELETE" });
}
