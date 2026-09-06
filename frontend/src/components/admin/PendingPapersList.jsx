import { Clock } from "lucide-react";

import PendingPaperCard from "./PendingPaperCard";

const PendingPapersList = ({
  papers,
  onReview,
  onDeleted,
}) => {
  if (papers.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-50 text-green-600">
          <Clock size={26} />
        </div>

        <h2 className="mt-4 text-lg font-bold text-slate-900">
          No pending papers
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          All submitted question papers have been reviewed.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-5">
        <h2 className="text-lg font-bold text-slate-900">
          Pending Reviews
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {papers.length} paper
          {papers.length !== 1 ? "s" : ""} waiting for review.
        </p>
      </div>

      {/* Papers */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {papers.map((paper) => (
          <PendingPaperCard
            key={paper._id}
            paper={paper}
            onReview={onReview}
            onDeleted={onDeleted}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingPapersList;