import { authFetch } from "./authClient";

export function analyzeResumeFile(file) {
  const formData = new FormData();
  formData.append("file", file);
  return authFetch("/resume-analyzer/analyze", { method: "POST", body: formData, isFormData: true });
}

export const listAnalysisHistory = () => authFetch("/resume-analyzer/history");
export const getAnalysisReport = (id) => authFetch(`/resume-analyzer/history/${id}`);
