import { authFetch } from "@/lib/api/authClient";

const BASE = "/applied-jobs";

export const APPLICATION_STATUSES = ["applied", "interview", "assessment", "offer", "rejected"];

export const listAppliedJobs = () => authFetch(BASE);
export const applyToJob = (jobId, status) => authFetch(BASE, { method: "POST", body: { jobId, status } });
export const updateApplicationStatus = (id, patch) =>
  authFetch(`${BASE}/${id}`, { method: "PUT", body: patch });
export const deleteApplication = (id) => authFetch(`${BASE}/${id}`, { method: "DELETE" });
