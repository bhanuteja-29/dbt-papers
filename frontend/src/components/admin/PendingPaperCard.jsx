import { FileText, Calendar, User } from "lucide-react";
import { useState } from "react";

import api from "../../services/api";

const PendingPaperCard = ({ paper, onReview, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${paper.title}"?`,
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await api.delete(`/question-papers/${paper._id}`);

      // Tell the parent component that this paper was deleted
      onDeleted(paper._id);
    } catch (error) {
      console.error("DELETE PAPER ERROR:", error);

      alert(
        error.response?.data?.message ||
          "Failed to delete question paper.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="line-clamp-2 text-base font-bold text-slate-900">
            {paper.title}
          </h2>

          <p className="mt-1 truncate text-sm text-slate-500">
            {paper.course}
          </p>
        </div>

        <span className="shrink-0 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
          Pending
        </span>
      </div>

      {/* Metadata */}
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {paper.courseCode}
        </span>

        <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
          {paper.academicYear}
        </span>

        <span className="rounded-lg bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
          {paper.examType}
        </span>
      </div>

      {/* Information */}
      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <User size={15} />

          <span>
            Uploaded by:{" "}
            <span className="font-medium text-slate-700">
              {paper.uploadedBy?.name || "Unknown"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <FileText size={15} />

          <span>
            {paper.files?.length || 0} file
            {paper.files?.length !== 1 ? "s" : ""}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Calendar size={15} />

          <span>
            {new Date(paper.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* Review */}
      <div className="mt-5">
        <button
          type="button"
          onClick={() => onReview(paper)}
          className="w-full rounded-xl border border-blue-200 bg-blue-50 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          Review Paper
        </button>
      </div>

      {/* Delete */}
      <div className="mt-3">
        <button
          type="button"
          onClick={handleDelete}
          disabled={loading}
          className="w-full rounded-xl border border-red-200 bg-red-50 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default PendingPaperCard;