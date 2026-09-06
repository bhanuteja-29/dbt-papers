import {
  CheckCircle,
  XCircle,
  Trash2,
  Eye,
  User,
  Calendar,
} from "lucide-react";

const ManagedPaperCard = ({
  paper,
  onApprove,
  onDelete,
  onView,
}) => {
  const isRejected = paper.status === "rejected";

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to permanently delete "${paper.title}"?`
    );

    if (!confirmed) return;

    onDelete(paper._id);
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold text-gray-900">
            {paper.title}
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            {paper.courseCode} · {paper.course}
          </p>
        </div>

        <span
          className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            isRejected
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {isRejected ? (
            <>
              <XCircle size={14} />
              Rejected
            </>
          ) : (
            <>
              <CheckCircle size={14} />
              Approved
            </>
          )}
        </span>
      </div>

      {/* Information */}
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <User size={16} />

          <span>
            {paper.uploadedBy?.name ||
              paper.uploadedBy?.email ||
              "Unknown user"}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Calendar size={16} />

          <span>
            {new Date(paper.createdAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="mt-3 text-sm text-gray-600">
        <span className="font-medium">Academic Year:</span>{" "}
        {paper.academicYear}
      </div>

      <div className="mt-1 text-sm text-gray-600">
        <span className="font-medium">Exam Type:</span>{" "}
        {paper.examType}
      </div>

      {/* Rejection reason */}
      {isRejected && paper.rejectionReason && (
        <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-red-600">
            Rejection Reason
          </p>

          <p className="mt-1 text-sm text-red-800">
            {paper.rejectionReason}
          </p>

          {paper.rejectedAt && (
            <p className="mt-2 text-xs text-red-600">
              Rejected on{" "}
              {new Date(
                paper.rejectedAt
              ).toLocaleDateString()}
            </p>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="mt-6 flex flex-wrap gap-3 border-t border-gray-100 pt-4">
        <button
          type="button"
          onClick={() => onView(paper._id)}
          className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Eye size={16} />
          View
        </button>

        {isRejected && (
          <button
            type="button"
            onClick={() => onApprove(paper._id)}
            className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700"
          >
            <CheckCircle size={16} />
            Approve Again
          </button>
        )}

        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          <Trash2 size={16} />
          Delete Permanently
        </button>
      </div>
    </div>
  );
};

export default ManagedPaperCard;