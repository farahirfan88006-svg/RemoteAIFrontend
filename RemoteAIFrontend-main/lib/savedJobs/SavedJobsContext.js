"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "@/lib/auth/AuthContext";
import { listSavedJobIds, saveJob as saveJobRequest, unsaveJob as unsaveJobRequest } from "@/lib/api/savedJobs";

/**
 * Tracks which job ids the current user has saved, so any job card
 * anywhere in the app (grid, search results, job detail) can render
 * its saved/unsaved state without each card fetching its own copy.
 *
 * Mirrors AuthContext.js's shape (a provider + a `useX` hook that
 * throws outside it) and, like it, treats "not logged in" / "request
 * failed" as just an empty set rather than an error — saved state is
 * a nice-to-have overlay on job cards, not something that should ever
 * block them from rendering.
 */

const SavedJobsContext = createContext(null);

export function SavedJobsProvider({ children }) {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [savedJobIds, setSavedJobIds] = useState(() => new Set());
  const [isLoading, setIsLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!user) {
      setSavedJobIds(new Set());
      setIsLoading(false);
      return;
    }
    try {
      const ids = await listSavedJobIds();
      setSavedJobIds(new Set(ids));
    } catch {
      // Best-effort — leave whatever state we already had rather than
      // wiping saved-state on a transient network error.
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (isAuthLoading) return;
    refresh();
  }, [isAuthLoading, refresh]);

  const isSaved = useCallback((jobId) => savedJobIds.has(jobId), [savedJobIds]);

  const toggleSave = useCallback(
    async (jobId) => {
      if (!jobId) return;
      const currentlySaved = savedJobIds.has(jobId);

      // Optimistic update — reverted below if the request fails.
      setSavedJobIds((prev) => {
        const next = new Set(prev);
        if (currentlySaved) next.delete(jobId);
        else next.add(jobId);
        return next;
      });

      try {
        if (currentlySaved) await unsaveJobRequest(jobId);
        else await saveJobRequest(jobId);
      } catch (error) {
        setSavedJobIds((prev) => {
          const next = new Set(prev);
          if (currentlySaved) next.add(jobId);
          else next.delete(jobId);
          return next;
        });
        throw error;
      }
    },
    [savedJobIds],
  );

  const value = useMemo(
    () => ({ savedJobIds, isSaved, toggleSave, refresh, isLoading, count: savedJobIds.size }),
    [savedJobIds, isSaved, toggleSave, refresh, isLoading],
  );

  return <SavedJobsContext.Provider value={value}>{children}</SavedJobsContext.Provider>;
}

export function useSavedJobs() {
  const context = useContext(SavedJobsContext);
  if (!context) throw new Error("useSavedJobs must be used within <SavedJobsProvider>.");
  return context;
}
