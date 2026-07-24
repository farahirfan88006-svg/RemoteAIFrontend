import { authFetch } from "./authClient";

export const listResumes = () => authFetch("/resumes");
export const getResume = (id) => authFetch(`/resumes/${id}`);
export const createResume = (payload = {}) => authFetch("/resumes", { method: "POST", body: payload });
export const generateResume = (payload) => authFetch("/resumes/generate", { method: "POST", body: payload });
export const updateResume = (id, payload) => authFetch(`/resumes/${id}`, { method: "PUT", body: payload });
export const deleteResume = (id) => authFetch(`/resumes/${id}`, { method: "DELETE" });
export const duplicateResume = (id) => authFetch(`/resumes/${id}/duplicate`, { method: "POST" });
export const setDefaultResume = (id) => authFetch(`/resumes/${id}/set-default`, { method: "PUT" });
