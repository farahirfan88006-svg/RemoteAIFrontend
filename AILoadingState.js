import { SkeletonLine } from "@/components/ui/Skeleton";

/**
 * Shared "generating…" placeholder shown while an AI Workspace tool
 * (Career Coach, Job Match Score, Mock Interview) waits on a response.
 * One skeleton treatment reused here instead of three near-identical
 * inline blocks, built on the existing `.skeleton` shimmer.
 */
export default function AILoadingState({ label = "Generating your results…" }) {
  return (
    <div className="card ai-loading-card" role="status" aria-live="polite" aria-busy="true">
      <span className="sr-only">{label}</span>
      <SkeletonLine width="60%" height="1.25rem" />
      <SkeletonLine width="90%" />
      <SkeletonLine width="80%" />
    </div>
  );
}
