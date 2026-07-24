import { authFetch } from "@/lib/api/authClient";

const BASE = "/saved-jobs";

export const listSavedJobs = () => authFetch(BASE);
export const listSavedJobIds = () => authFetch(`${BASE}/ids`);
export const saveJob = (jobId) => authFetch(BASE, { method: "POST", body: { jobId } });
export const unsaveJob = (jobId) => authFetch(`${BASE}/${jobId}`, { method: "DELETE" });
